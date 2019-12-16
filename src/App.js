import React, { useState } from 'react';
import './App.css';
import Input from './input';
import styled from 'styled-components';
import CodeGetter from './code-getter';
import { getFontSizes } from './utilities';

const SettingTitle = styled.div`
  opacity: 0.5;
  font-size: var(--dpl-fs-1);
  margin: 0 0 0.5rem 0;
`

const LogoSection = styled.div`
  margin: auto 0 1.5rem 0;
`

const Logo = styled.h1`
  font-weight: normal;
  opacity: 0.5;
  font-size: var(--dpl-fs-2);
  margin: 0 0 0.5rem 0;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;

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

const DemoText = styled.div`
  &:focus {
    outline: none;
  }
`

const FontFamilyInput = styled.input`
  font: inherit;
  padding: 0;
  background-color: white;
  border: none;
  color: inherit;
  max-width: 100%;
  font-size: var(--dpl-fs-2);
  height: calc(1.2 * 1em);

  &:hover {
    color: hsla(var(--c-accentHSL), 1);
  }
  &:focus {
    outline: none;
    color: hsla(var(--c-accentHSL), 1);
  }
  &::-moz-selection {
    background-color: hsla(var(--c-accentHSL), 1);
    color: hsla(var(--c-accentHS), 93%, 1);
  }
  &::selection {
    background-color: hsla(var(--c-accentHSL), 1);
    color: hsla(var(--c-accentHS), 93%, 1);
  }
`

const text = {
  m: `The pattern produced by the bug's shaking would be a series of concentric circles. These circles would reach the edges of the water puddle at the same frequency.`,
  l: `Inflite CF SLX 9.0 Team - Ride in the colours of cyclocross superstar Mathieu van der Poel and the Corendon Circus Team – equipped with the latest Shimano Ultegra Di2 RX groupset, this is a brilliant bike to tackle the cross season with.`
};

function App() {
  const [sizesAmount, setSizesAmount] = useState(5);
  const [sizesIncrement, setSizesIncrement] = useState(1.3);
  const [baseFontSize, setBaseFontSize] = useState(0.9);
  const [lineHeightBase, setLineHeightBase] = useState(0.25);
  const [lineHeightRelativity, setLineHeightRelativity] = useState(1);
  const [fontFamily, setFontFamily] = useState('system-ui');

  document.documentElement.style.setProperty(`--fontSize-0`, `baseFontSizerem`);

  getFontSizes(sizesAmount, baseFontSize, sizesIncrement).map(size => {
    document.documentElement.style.setProperty(size.name, size.value);
  });

  getFontSizes(sizesAmount, baseFontSize, sizesIncrement);

  return (
    <div>
      <GlobalContainer>
        <SettingsSection>
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
          
          <SettingTitle
            style={{
              marginTop: '0.5rem'
            }}
          >
            Font
          </SettingTitle>
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
            step=".01"
            sufix="rem"
          />
          <label>Font Family</label>
          <FontFamilyInput
            label="Base"
            type="text"
            onChange={e => setFontFamily(e.target.value)}
            value={fontFamily}
            placeholder="system-ui"
            spellcheck="false"
          />

          <div
            style={{
              marginTop: '2rem'
            }}
          />

          <CodeGetter
            lineHeightBase={lineHeightBase}
            lineHeightRelativity={lineHeightRelativity}
            sizesIncrement={sizesIncrement}
            sizesAmount={sizesAmount}
            baseFontSize={baseFontSize}
          />

          <LogoSection>
            <Logo>doppler</Logo>
            Github
            <br />
            by Hayk
          </LogoSection>
        </SettingsSection>

        <MainSection>
          {getFontSizes(sizesAmount, baseFontSize, sizesIncrement)
            .reverse()
            .map((size, index) => (
              <DemoText
                key={index}
                contentEditable
                spellcheck="false"
                data-gramm_editor="false"
                style={{
                  fontSize: `var(${size.name})`,
                  lineHeight: `calc(${lineHeightBase}rem + ${lineHeightRelativity}em)`,
                  maxWidth: "24em",
                  marginBottom: "1.5rem",
                  fontFamily: fontFamily,
                }}
              >
                {text.m}
              </DemoText>
            ))}
          </MainSection>
        </GlobalContainer>
    </div>
  );
}

export default App;
