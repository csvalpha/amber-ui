import Component from '@ember/component';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';

export const FormStatusIconComponent = Component.extend({
  form: null,
  // Activities:
  // status - color - icon
  // open: yellow circle
  // opensLater: gray clock
  // signed in and open: green circle
  // signed in and closed: green lock
  // signed out and open: red circle
  // signed out and closed: red lock
  // not filled in and closed : graylock
  //
  // polls
  // open: yellow circle
  // opensLater: gray clock
  // filled in and open: green circle
  // filled in and closed: green lock
  // (not filled in and) closed: gray lock

  // closed always means lock except when it opens later
  // open always means dot

  color: computed(
    'form',
    'form.canRespond',
    'form.respondFrom',
    'form.currentUserResponseCompleted',
    function () {
      if (isNone(this.form)) {
        return 'success';
      }

      if (this.form.get('currentUserResponseCompleted')) {
        return 'success';
      } else if (this.form.get('canRespond')) {
        return 'primary';
      }

      return 'dark';
    }
  ),
  icon: computed(
    'form',
    'form.currentUserResponseCompleted',
    'form.canRespond',
    'form.respondFrom',
    function () {
      if (isNone(this.form)) {
        return 'circle';
      }

      if (this.form.get('canRespond')) {
        return 'circle';
      } else if (this.form.get('opensLater')) {
        return 'clock';
      }

      return 'lock';
    }
  ),
});

FormStatusIconComponent.reopenClass({
  positionalParams: ['form'],
});

export default FormStatusIconComponent;
