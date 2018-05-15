import React from 'react'
import { mount } from 'enzyme'
import withHighlighting from '../src/withHighlighting'

let HighlightableMockComponent
let wrapper

beforeEach(() => {
    HighlightableMockComponent = ({text, highlight}) => <div>{text}</div>
    const HighLighterComponent = withHighlighting(HighlightableMockComponent)
    wrapper = mount(<HighLighterComponent text="I would like to highlight" highlight="like" />)
})

it('should contain a highlight', () => {
    expect(wrapper.text()).toContain("span")
})

it('should place the highlight inside the wrapped component', () => {
    expect(wrapper.find('div')).toHaveLength(1)
})

it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
})

it('should not highlight anything in case of unmatched words', () => {
    const HighLighterComponent = withHighlighting(HighlightableMockComponent)
    wrapper = mount(<HighLighterComponent text="apple" highlight="text" />)
    expect(wrapper.text()).not.toContain('span')
})
