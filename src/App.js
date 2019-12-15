import React, { useState } from 'react';
import './App.css';
import Input from './input';
import styled from 'styled-components';

const lineBreak = `
`

const SettingTitle = styled.div`
  opacity: 0.5;
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
`

const Logo = styled.h1`
  font-weight: normal;
  opacity: 0.5;
  font-size: 2rem;
  margin: 0 0 1.5rem 0;
`

const GlobalContainer = styled.div`
  display: flex;
`

const SettingsSection = styled.div`
  width: 20vw;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  min-height: 100vh;
  padding: var(--pagePaddingY) var(--pagePaddingX);

  @media (max-width: 800px) {
    background-color: hsla(0,0%,0%,0.2);
    position: fixed;
    width: 80vw;
    z-index: 0;

    &:active {
      z-index: 2;
    }
    &:hover {
      z-index: 2;
      background-color: white;
      box-shadow: 80vw 0 hsla(0,0%,0%,0.2);
    }
  }
`

const MainSection = styled.div`
  padding: 5vw var(--pagePaddingX);

  @media (max-width: 800px) {
    background-color: white;
    position: absolute;
    right: 0;
    width: 80vw;
    z-index: 1;
  }
`

const text = {
  m: `Inflite CF SLX 9.0 Team - Ride in the colours of cyclocross superstar Mathieu van der Poel and the Corendon Circus Team – equipped with the latest Shimano Ultegra Di2 RX groupset`,
  l: `Inflite CF SLX 9.0 Team - Ride in the colours of cyclocross superstar Mathieu van der Poel and the Corendon Circus Team – equipped with the latest Shimano Ultegra Di2 RX groupset, this is a brilliant bike to tackle the cross season with.`
};

const getFontSizes = (amount, base, increment) => {
  let fontSizes = [];

  const getName = inc => {
    return `fontSize-${inc}`;
  };

  for (var i = 1; i < amount; i++) {
    fontSizes[i] = {
      name: `--${getName(i)}`,
      value: `calc(var(--${getName(i - 1)}) * var(--sizesIncrement))`,
      number: i
    };
  }

  fontSizes[0] = {
    name: `--${getName(0)}`,
    value: `${base}rem`,
    number: 0
  };

  document.documentElement.style.setProperty('--sizesIncrement', increment);
  
  return fontSizes;
};

function App() {
  const [sizesAmount, setSizesAmount] = useState(4);
  const [sizesIncrement, setSizesIncrement] = useState(1.3);
  const [baseFontSize, setBaseFontSize] = useState(0.9);
  const [lineHeightBase, setLineHeightBase] = useState(0.85);
  const [lineHeightRelativity, setLineHeightRelativity] = useState(0.6);

  document.documentElement.style.setProperty(`--fontSize-0`, `baseFontSizerem`);

  getFontSizes(sizesAmount, baseFontSize, sizesIncrement).map(size => {
    document.documentElement.style.setProperty(size.name, size.value);
  });

  getFontSizes(sizesAmount, baseFontSize, sizesIncrement);

  return (
    <div>
      <GlobalContainer>
        <SettingsSection>
          <Logo>doppler</Logo>
          <SettingTitle>Line Height</SettingTitle>
          <Input
            type="number"
            onChange={e => setLineHeightBase(e.target.value)}
            value={lineHeightBase}
            label="Base"
            step=".01"
            sufix="rem"
          />
          <Input
            type="number"
            onChange={e => setLineHeightRelativity(e.target.value)}
            value={lineHeightRelativity}
            label="Relativity"
            step=".01"
            sufix="em"
          />
          <br />

          <SettingTitle>Font Size</SettingTitle>
          <Input
            type="number"
            onChange={e => setSizesAmount(e.target.value)}
            value={sizesAmount}
            label="Amount"
          />
          <Input
            type="number"
            onChange={e => setSizesIncrement(e.target.value)}
            value={sizesIncrement}
            label="Increment"
            step=".01"
          />
          <Input
            type="number"
            onChange={e => setBaseFontSize(e.target.value)}
            value={baseFontSize}
            label="Base"
            step=".1"
            sufix="rem"
          />
        </SettingsSection>

        <MainSection>
          <pre>
            <code>
              {`:root {
  --lineHeightBase: ${lineHeightBase}rem;
  --lineHeightRelativity: ${lineHeightRelativity}em;
  --sizesIncrement: ${sizesIncrement};

${getFontSizes(sizesAmount, baseFontSize, sizesIncrement)
    .reverse()
    .map((size, index) => {
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
          </pre>
          {getFontSizes(sizesAmount, baseFontSize, sizesIncrement)
            .reverse()
            .map(size => (
              <div
              style={{
                fontSize: `var(${size.name})`,
                lineHeight: `calc(${lineHeightBase}rem + ${lineHeightRelativity}em)`,
                maxWidth: "24em",
                marginBottom: "1.5rem"
              }}
              >
                {text.m}
              </div>
            ))}
          </MainSection>
        </GlobalContainer>
    </div>
  );
}

export default App;
