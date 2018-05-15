# React TypeScript Text Highlighter Component 

This component is not actively maintained and not meant to be used in production. Please take a look around npm, there are several solutions similar to this.

Check the tests for example usage.

```javascript
let HighlightableMockComponent
let wrapper

beforeEach(() => {
    HighlightableMockComponent = ({text, highlight}) => <div>{text}</div>
    const HighLighterComponent = withHighlighting(HighlightableMockComponent)
    wrapper = mount(<HighLighterComponent text="I would like to highlight" highlight="like" />)
})
```

