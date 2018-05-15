import * as React from 'react'
import { remove as removeDiacritics } from 'diacritics'

export interface HighlighterProps {
    text: string,
    highlight: string,
}

export interface HighlighterState {
    highlightedText?: string
}

const withHighlighting = <T extends HighlighterProps> (WrappedComponent: React.ComponentType<T>) => {

    return class Highlightable extends React.Component<T, HighlighterState> {
        
        constructor(props: any) {
            super(props)
            this.componentDidMount = this.componentDidMount.bind(this)
            this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
            this.state = {
                highlightedText: ''
            }
        }

        componentDidMount() {
            const { text, highlight } = this.props
            this.updateHighlightTextAsState({text, highlight})
        }

        componentWillReceiveProps(nextProps: any) {
            this.updateHighlightTextAsState(nextProps)
        }

        updateHighlightTextAsState = ({ text, highlight }) => {
            const highlightedText = this.createHighlightedText(text, highlight)
            this.setState({ highlightedText })
        }

        createRegexp = (searchParts: string[]) => {
            return new RegExp(searchParts.join('|'), 'gui')
        }

        createHtml = (regexp, htmlText) => {
            let unified = removeDiacritics(htmlText)
            let replaceData = []
            unified.replace(regexp, (val, offset) => {
                replaceData.unshift([val, offset])
                return replaceData.join()
            })

            for (let [val, offset] of replaceData) {
                htmlText = `${htmlText.substr(0, offset)}` +
                    `<span style="font-weight:bold">${htmlText.substr(offset, val.length)}</span>` +
                    `${htmlText.substr(offset + val.length)}`
            }
            return htmlText
        }

        createHighlightedText = (text, highlight) => {
            const highlightList = highlight.split(/\s+/g)
            if (highlightList.length > 0) {
                text = this.createHtml(this.createRegexp(highlightList.map(removeDiacritics)), text)
            }
            return text
        }

        render() {
            const value = this.state.highlightedText
            return <WrappedComponent {...this.props} text={value} />
        }
    }
}
export default withHighlighting
