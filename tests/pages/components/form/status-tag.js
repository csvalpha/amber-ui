import {
  hasClass,
  text
} from 'ember-cli-page-object';

export default {
  content: text('span'),
  hasDefaultClass: hasClass('badge-default', 'span'),
  hasInfoClass: hasClass('badge-info', 'span'),
  hasSuccessClass: hasClass('badge-success', 'span'),
  hasDangerClass: hasClass('badge-danger', 'span')
};
