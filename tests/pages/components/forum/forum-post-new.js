import {
  fillable,
  value,
  isVisible
} from 'ember-cli-page-object';

export default {
  fillInValue: fillable('#newForumPost'),
  value: value('#newForumPost'),
  isVisible: isVisible('#newForumPost')
};
