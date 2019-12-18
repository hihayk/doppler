export const getFontSizes = (amount, base, increment) => {
  let fontSizes = [];

  const getName = inc => {
    return `fontSize-${inc}`;
  };

  for (var i = 1; i < amount; i++) {
    fontSizes[i] = {
      name: `--${getName(i)}`,
      value: `calc(var(--${getName(i - 1)}) * var(--sizesIncrement))`,
      number: i,
      computedFS: Math.round(base * Math.pow(increment, i) * 16)
    };
  }


  fontSizes[0] = {
    name: `--${getName(0)}`,
    value: `${base}rem`,
    number: 0,
    computedFS: Math.round(base * 16)
  };

  document.documentElement.style.setProperty('--sizesIncrement', increment);
  
  return fontSizes;
};