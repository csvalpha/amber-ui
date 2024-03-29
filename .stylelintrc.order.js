'use strict';

module.exports = {
  plugins: ['stylelint-order'],
  rules: {
    'order/order': [
      ['at-rules', 'dollar-variables', 'declarations', 'rules'],
      {
        unspecified: 'bottom',
      },
    ],
    'order/properties-alphabetical-order': null,
    // Based on the concentric order, which can be found here:
    // https://github.com/brigade/scss-lint/blob/master/data/property-sort-orders/concentric.txt
    'order/properties-order': [
      'display',
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'flex',
      'flex-basis',
      'flex-direction',
      'flex-flow',
      'flex-grow',
      'flex-shrink',
      'flex-wrap',
      'align-content',
      'align-items',
      'align-self',
      'justify-content',
      'order',
      'columns',
      'column-gap',
      'column-fill',
      'column-rule',
      'column-span',
      'column-count',
      'column-width',
      'float',
      'clear',
      'transform',
      'transform-origin',
      'transition',
      'animation',
      'animation-name',
      'animation-duration',
      'animation-timing-function',
      'animation-delay',
      'animation-iteration-count',
      'animation-direction',
      'animation-fill-mode',
      'animation-play-state',
      'visibility',
      'opacity',
      'z-index',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'outline',
      'outline-offset',
      'outline-width',
      'outline-style',
      'outline-color',
      'border',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
      'border-radius',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-left-radius',
      'border-bottom-right-radius',
      'border-color',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'box-shadow',
      'background',
      'background-attachment',
      'background-clip',
      'background-color',
      'background-image',
      'background-repeat',
      'background-position',
      'background-size',
      'cursor',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'overflow',
      'list-style',
      'caption-side',
      'table-layout',
      'border-collapse',
      'border-spacing',
      'empty-cells',
      'vertical-align',
      'text-align',
      'text-indent',
      'text-transform',
      'text-decoration',
      'text-rendering',
      'text-shadow',
      'text-overflow',
      'line-height',
      'word-break',
      'word-wrap',
      'word-spacing',
      'letter-spacing',
      'white-space',
      'color',
      'font',
      'font-family',
      'font-size',
      'font-weight',
      'font-smoothing',
      'font-style',
      'content',
      'quotes',
    ],
  },
};
