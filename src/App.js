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
  margin: auto 0 0.5rem 0;
`

const Logo = styled.h1`
  font-weight: normal;
  opacity: 0.5;
  font-size: var(--dpl-fs-2);
  margin: 1.5rem 0 0.5rem 0;

  &:hover {
    opacity: 1;
    color: hsl(var(--c-accentHSL));
  }
`

const LogoLink = styled.a`
  color: inherit;
  text-decoration: none;
`

const GlobalContainer = styled.div`
  display: flex;
  overflow: hidden;
  max-height: 100vh;
`

const SettingsSection = styled.div`
  width: calc(3vw + 15rem);
  min-width: 15rem;
  flex-shrink: 0;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  position: relative;
  height: 100vh;
  max-height: 100%;
  display: flex;
  align-items: flex-start;
  overflow: auto;

  @media (max-width: 800px) {
    position: fixed;
    width: 80vw;
    

    &:active {
      z-index: 2;
    }
    &:hover {
      z-index: 2;
      background-color: var(--background);
      box-shadow: 80vw 0 var(--backdrop);
    }
  }
`

const MainSettings = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
  padding: var(--pagePaddingY) var(--pagePaddingX);
`

const PreviewSettings = styled.div`
  width: 2rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  padding: var(--pagePaddingY) 0;
  
  @media (max-width: 800px) {
    width: 4rem;
  }
`

const MainSection = styled.div`
  flex-grow: 1;
  padding: 5vw var(--pagePaddingX);
  background-color: var(--background);
  position: relative;
  overflow: auto;

  @media (max-width: 800px) {
    width: 80vw;
    position: fixed;
    right: 0;
    box-shadow: -80vw 0 var(--backdrop);
    height: 100%;
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
  text-decoration-color: hsla(var(--c-accentHS), 20%, 0.3);
  text-underline-position: under;

  &:hover {
    color: hsl(var(--c-accentHSL));
    text-decoration-color: hsla(var(--c-accentHSL), 0.5);
  }
`

const DarkThemeButton = styled.button`
  appearance: none;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: var(--body);
  border: none;

  &:focus {
    outline: none;
    background-color: hsl(var(--c-accentHSL));
  }
`

const LightThemeButton = styled.button`
  appearance: none;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: transparent;
  border: 1px solid var(--body);

  &:focus {
    outline: none;
    border-color: hsl(var(--c-accentHSL));
  }
`

const ContentButtonWrapper = styled.button`
  appearance: none;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  
  &:focus {
    outline: none;

    &  > * {
      background-color: hsl(var(--c-accentHSL));
    }
  }

  & > * {
    background-color: var(--body);
  }
`

const ContentButtonLine = styled.span`
  width: 2rem;
`

const ContentButton = ({...props}) => (
  <ContentButtonWrapper {...props}>
    <ContentButtonLine style={{ height: 8, marginBottom: 4 }} />
    <ContentButtonLine style={{ height: 5, width: 24, marginBottom: 3 }} />
    <ContentButtonLine style={{ height: 2, width: 16 }} />
  </ContentButtonWrapper>
)

const SpecsButtonWrapper = styled.button`
  appearance: none;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  display: flex;
  align-items: flex-start;
  position: relative;
  background-color: transparent;
  color: var(--body);
  
  &:focus {
    outline: none;

    &  > * {
      color: hsl(var(--c-accentHSL));
    }
  }

  & > * {
    border-color: var(--body);
  }
`

const SpecsButtonLine = styled.span`
  width: 1rem;
  height: 2rem;
  border: 1px solid currentColor;
  border-width: 1px 0 1px 0;
  display: block;
  position: absolute;
  top: 0;
  left: 8px;
`

const SpecsButtonSquare = styled.span`
  width: 1rem;
  height: 1rem;
  border: 1px solid currentColor;
  display: block;
  position: absolute;
  top: 8px;
  left: 8px;
`

const SpecsButton = ({...props}) => (
  <SpecsButtonWrapper {...props}>
    <SpecsButtonSquare />
    <SpecsButtonLine />
    <SpecsButtonLine style={{ transform: 'rotate(90deg)', left: 8, top: 0 }} />
  </SpecsButtonWrapper>
)

const text = {
  l: `A pattern produced by the bug's shaking would be a series of concentric circles. These circles would reach the edges of the water puddle at the same frequency.`,
  s: `Aa Bb Cc 123`
};

function App() {
  const [sizesAmount, setSizesAmount] = useState(5);
  const [sizesIncrement, setSizesIncrement] = useState(1.3);
  const [baseFontSize, setBaseFontSize] = useState(0.9);
  const [lineHeightBase, setLineHeightBase] = useState(0.25);
  const [lineHeightRelativity, setLineHeightRelativity] = useState(1);
  const [fontFamily, setFontFamily] = useState('system-ui');
  
  const [theme, setTheme] = useState('light');
  const [showSpecs, setShowSpecs] = useState(true);
  const [longContent, setLongContent] = useState(true);

  document.documentElement.style.setProperty(`--fontSize-0`, `baseFontSizerem`);

  getFontSizes(sizesAmount, baseFontSize, sizesIncrement).map(size => {
    document.documentElement.style.setProperty(size.name, size.value);
  });

  getFontSizes(sizesAmount, baseFontSize, sizesIncrement);

  const bodyClassList = document.body.classList

  if(theme === 'light') {
    bodyClassList.add(`theme-light`);
    bodyClassList.remove(`theme-dark`);
  }
  if(theme === 'dark') {
    bodyClassList.add(`theme-dark`);
    bodyClassList.remove(`theme-light`);
  }

  return (
    <div>
      <GlobalContainer>
        <SettingsSection>
          <MainSettings>
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
              <Logo>
                <LogoLink href="/">doppler</LogoLink>
              </Logo>
              <Link href="https://hayk.design" target="_blank">by Hayk</Link> | <Link href="https://github.com/hihayk/doppler" target="_blank">Github</Link>
            </LogoSection>
          </MainSettings>
          <PreviewSettings>
            <DarkThemeButton onClick={() => setTheme('dark')}/>
            <div style={{ marginTop: '0.5rem' }} />
            <LightThemeButton onClick={() => setTheme('light')} />
            {/* <div style={{ marginTop: '2rem' }} />
            <ContentButton onClick={() => setLongContent(!longContent)} /> */}
            <div style={{ marginTop: '2rem' }} />
            <SpecsButton onClick={() => setShowSpecs(!showSpecs)} />
          </PreviewSettings>
        </SettingsSection>

        <MainSection>
          {getFontSizes(sizesAmount, baseFontSize, sizesIncrement)
            .reverse()
            .map((size, index) => {
              return (
                <div key={index}>
                  {showSpecs && (
                    <div>
                      <span>{size.computedFS}px / {Math.round(lineHeightBase * 16 + lineHeightRelativity * size.computedFS)}px</span>
                      <span className="dimmed"> | {size.value}</span>
                    </div>
                  )}

                  <DemoText
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
                    {longContent ? text.l : text.s}
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
