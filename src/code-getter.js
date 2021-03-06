import React, { useState } from 'react'
import styled from '@emotion/styled'
import { getFontSizes } from './utilities'

const lineBreak = `
`

const CodeContainer = styled.pre`
  background-color: var(--background);
  padding: var(--pagePaddingX);
  overflow: auto;
  max-height: 100%;
`

export const Button = styled.button`
  appearance: none;
  font: inherit;
  color: inherit;
  border: 1px solid hsla(var(--c-accentH), 40%, 40%, 0.5);
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  background-color: transparent;

  &:focus {
    border-color: hsla(var(--c-accentHSL), 1);
    color: hsla(var(--c-accentHSL), 1);
    outline: none;
  }
`

const CodeBackdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: var(--pagePaddingY) var(--pagePaddingX);
  background-color: var(--backdrop);

  @media (max-width: 800px) {
    padding: 0;
    padding-top: 40vw;
  }
`

const CodeGetter = ({lineHeightFixedAmount, lineHeightRelativeAmount, sizesIncrement, sizesAmount, baseFontSize, fontFamily}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <React.Fragment>
      <Button onClick={() => setIsOpen(!isOpen)}>Get the CSS</Button>
      
      
      <CodeBackdrop
        style={{ display: `${isOpen ? 'flex' : 'none'}` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CodeContainer onClick={(e) => e.stopPropagation()}>
          <code>
              {`:root {
  --lineHeightFixedAmount: ${lineHeightFixedAmount}rem;
  --lineHeightRelativeAmount: ${lineHeightRelativeAmount}em;
  --sizesIncrement: ${sizesIncrement};

${getFontSizes(sizesAmount, baseFontSize, sizesIncrement)
    .reverse()
    .map((size) => {
      return `  ${size.name}: ${size.value}; ${lineBreak}`
    }).join('')}
  --globalLineHeight: calc(var(--lineHeightFixedAmount) + var(--lineHeightRelativeAmount));
  --globalFontSize: var(--fontSize-0);
  --globalFontFamily: ${fontFamily};
}
* {
  line-height: var(--globalLineHeight);
}
html {
  font-size: 100%;
}
body {
  font-size: var(--globalFontSize);
  font-family: var(--globalFontFamily);
}
${getFontSizes(sizesAmount, baseFontSize, sizesIncrement)
  .reverse()
  .map((size) => {
    return `.textSize-${size.number} {
  font-size: var(${size.name});
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