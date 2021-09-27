export function insertCssRule(rule: string) {
  const { styleSheets } = document;
  console.log('styleSheets: ', styleSheets);

  let _styleSheet, cssRules;
  for (const styleSheet of styleSheets) {
    if (
      styleSheet.cssRules &&
      Array.from(styleSheet.cssRules).some((item) => {
        const selectorText = item.selectorText;
        return selectorText && selectorText.indexOf('.noteco') > -1;
      })
    ) {
      cssRules = styleSheet.cssRules;
      _styleSheet = styleSheet;
      break;
    }
  }
  if (!_styleSheet || !cssRules) return;
  if (
    Array.from(cssRules).some(({ cssText }) => {
      return cssText && cssText.indexOf(rule) > -1;
    })
  ) {
    return;
  }
  _styleSheet.insertRule(rule, cssRules.length);
}
