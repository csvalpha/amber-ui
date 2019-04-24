import {
  hasClass
} from 'ember-cli-page-object';

export default {
  hasSuccess: hasClass('badge-success', 'span'),
  hasDanger: hasClass('badge-danger', 'span')
};
