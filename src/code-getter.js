import React, { useState } from 'react'
import styled from 'styled-components'
import { getFontSizes } from './utilities'

const lineBreak = `
`

const CodeContainer = styled.pre`
  background-color: hsla(0,0%,100%,1);
  padding: calc(var(--pagePaddingX) / 1.5);
  overflow: auto;
  max-height: 100%;
`

const CodeGetterButton = styled.button`
  
`

const CodeBackdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: var(--pagePaddingY) var(--pagePaddingX);
  background-color: hsla(0,0%,0%,0.3);
`

const CodeGetter = ({lineHeightBase, lineHeightRelativity, sizesIncrement, sizesAmount, baseFontSize}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <React.Fragment>
      <CodeGetterButton onClick={() => setIsOpen(!isOpen)}>Get CSS</CodeGetterButton>
      
      
      <CodeBackdrop
        style={{ display: `${isOpen ? 'flex' : 'none'}` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CodeContainer onClick={(e) => e.stopPropagation()}>
          <code>
              {`:root {
  --lineHeightBase: ${lineHeightBase}rem;
  --lineHeightRelativity: ${lineHeightRelativity}em;
  --sizesIncrement: ${sizesIncrement};

${getFontSizes(sizesAmount, baseFontSize, sizesIncrement)
    .reverse()
    .map((size) => {
      return `  ${size.name}: ${size.value}; ${lineBreak}`
    }).join('')}
  --globalLineHeight: calc(var(--lineHeightBase) + var(--lineHeightRelativity));
  --globalFontSize: var(--fontSize-0);
}
body {
  font-size: var(--globalFontSize);
  line-height: var(--globalLineHeight);
}
${getFontSizes(sizesAmount, baseFontSize, sizesIncrement)
  .reverse()
  .map((size) => {
    return `.textSize-${size.number} {
  font-size: var(${size.name});
  line-height: var(--globalLineHeight);
}
`
  }).join('')
}`}
        </code>
      </CodeContainer>
    </CodeBackdrop>
    
  </React.Fragment>
  )
}

export default CodeGetter