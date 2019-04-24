import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import Ember from 'ember';

const { Handlebars } = Ember;

export function convertToEmojione(params) {
  return htmlSafe(emojione.toImage(Handlebars.Utils.escapeExpression(params[0])));
}

export default helper(convertToEmojione);
