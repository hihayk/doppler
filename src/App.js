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
  margin: 1.5rem 0 0.5rem 0;
`

const GlobalContainer = styled.div`
  display: flex;
`

const SettingsSection = styled.div`
  width: 20vw;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  height: 100vh;
  padding: var(--pagePaddingY) var(--pagePaddingX);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;

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
  height: calc(1.2 * 1em);
  background-color: transparent;

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

const Link = styled.a`
  color: inherit;
  text-decoration-color: hsla(0,0%,0%,0.3);
  text-underline-position: under;

  &:hover {
    color: hsl(var(--c-accentHSL));
    text-decoration-color: hsla(var(--c-accentHSL), 0.5);
  }
`

const text = {
  m: `A pattern produced by the bug's shaking would be a series of concentric circles. These circles would reach the edges of the water puddle at the same frequency.`,
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
            onBlur={e => setLineHeightBase(e.target.value > 0 ? e.target.value : 1)}
            value={lineHeightBase}
            label="Base"
            step=".01"
            sufix="rem"
          />
          <Input
            type="number"
            onChange={e => setLineHeightRelativity(e.target.value)}
            onBlur={e => setLineHeightRelativity(e.target.value > 0 ? e.target.value : 1)}
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
            onBlur={e => setSizesAmount(e.target.value > 0 ? e.target.value : 1)}
            value={sizesAmount}
            label="Amount"
          />
          <Input
            type="number"
            onChange={e => setSizesIncrement(e.target.value)}
            onBlur={e => setSizesIncrement(e.target.value > 0 ? e.target.value : 1)}
            value={sizesIncrement}
            label="Increment"
            step=".01"
          />
          <Input
            type="number"
            onChange={e => setBaseFontSize(e.target.value)}
            onBlur={e => setBaseFontSize(e.target.value > 0 ? e.target.value : 1)}
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
            onBlur={e => setFontFamily(e.target.value === '' ? 'system-ui' : e.target.value )}
            value={fontFamily}
            spellCheck="false"
            style={{
              fontSize: `
                ${fontFamily.length > 13 ? '1.5rem' : 'var(--dpl-fs-2)'}
              `
            }}
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
            fontFamily={fontFamily}
          />

          <LogoSection>
            <Logo>doppler</Logo>
            <Link href="https://hayk.design" target="_blank">by Hayk</Link> | <Link href="https://github.com/hihayk/doppler" target="_blank">Github</Link>
          </LogoSection>
        </SettingsSection>

        <MainSection id="banana">
          {getFontSizes(sizesAmount, baseFontSize, sizesIncrement)
            .reverse()
            .map((size, index) => {
              return (
                <div>
                  {size.computedFS}px / {lineHeightBase * 16 + lineHeightRelativity * size.computedFS}px <span className="dimmed"> | {size.value}</span>
                  <DemoText
                    key={index}
                    contentEditable
                    spellcheck="false"
                    data-gramm_editor="false"
                    suppressContentEditableWarning
                    style={{
                      fontSize: `var(${size.name})`,
                      lineHeight: `calc(${lineHeightBase}rem + ${lineHeightRelativity}em)`,
                      maxWidth: "24em",
                      marginTop: "0.5rem",
                      marginBottom: "1.25rem",
                      fontFamily: fontFamily,
                    }}
                  >
                    {text.m}
                  </DemoText>
                </div>
              )
            })}
          </MainSection>
        </GlobalContainer>
    </div>
  );
}

export default App;
