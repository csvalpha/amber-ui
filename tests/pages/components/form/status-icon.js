import {
  hasClass
} from 'ember-cli-page-object';

export default {
  hasPrimaryClass: hasClass('text-primary', 'span'),
  hasDarkClass: hasClass('text-dark', 'span'),
  hasWhiteClass: hasClass('text-white', 'span'),
  hasSuccessClass: hasClass('text-success', 'span'),
  hasDangerClass: hasClass('text-danger', 'span'),

  hasClockIconClass: hasClass('fa-clock-o', 'i'),
  hasLockIconClass: hasClass('fa-lock', 'i'),
  hasCircleIconClass: hasClass('fa-circle', 'i')
};
