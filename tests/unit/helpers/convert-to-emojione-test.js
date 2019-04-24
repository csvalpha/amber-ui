import { convertToEmojione } from 'alpha-amber/helpers/convert-to-emojione';
import { module, test } from 'qunit';
import Ember from 'ember';

const { Handlebars } = Ember;

module('Unit | Helper | convert to emojione');

const validString = 'A little quickpostmessage';
const emojiString = ':kiss_ww:';
const xssString = '<IMG SRC=/ onerror="alert(String.fromCharCode(88,83,83))"></img>';
const xssEmoji = `${xssString} ${emojiString}`;

test('no xss', (assert) => {
  assert.equal(convertToEmojione([validString]), validString);
  // Normal emoji
  assert.equal(convertToEmojione([emojiString]), emojione.toImage(emojiString));

  // Plain xss
  assert.notEqual(convertToEmojione([xssString]), xssString);
  assert.equal(convertToEmojione([xssString]), Handlebars.Utils.escapeExpression(xssString));

  // Xss and emoji combined
  assert.notEqual(convertToEmojione([xssEmoji]), xssEmoji);
  assert.equal(convertToEmojione([xssEmoji]), emojione.toImage(Handlebars.Utils.escapeExpression(xssEmoji)));
});
