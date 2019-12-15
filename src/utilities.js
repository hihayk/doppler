export const getFontSizes = (amount, base, increment) => {
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