#!/usr/bin/env node
'use strict';

/**
 * Converts stylelint output to problem matcher compatible output.
 * Usage: node convert-stylelint-output.js "$(yarn stylelint)"
 */

const input = process.argv.slice(2)[0];

// https://github.com/stylelint/stylelint/blob/76f6fe07650c0adde5a058600f08d9f4cec71599/lib/formatters/stringFormatter.js#L25
const output = input
  .replace(/\u2139/g, 'info')
  .replace(/\u26A0/g, 'warning')
  .replace(/\u2716/g, 'error')
  .replace(/\u2714/g, 'success');

console.log(output);
