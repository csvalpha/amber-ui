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

  color: computed('form', 'form.canRespond', 'form.respondFrom', 'form.currentUserResponseCompleted', function() {
    const form = this.get('form');
    if (isNone(form)) {
      return 'success';
    }

    if (form.get('currentUserResponseCompleted')) {
      return 'success';
    } else if (form.get('canRespond')) {
      return 'primary';
    }
    return 'dark';
  }),
  icon: computed('form', 'form.currentUserResponseCompleted', 'form.canRespond', 'form.respondFrom', function() {
    const form = this.get('form');
    if (isNone(form)) {
      return 'circle';
    }

    if (form.get('canRespond')) {
      return 'circle';
    } else if (form.get('opensLater')) {
      return 'clock-o';
    }
    return 'lock';
  })
});

FormStatusIconComponent.reopenClass({
  positionalParams: ['form']
});

export default FormStatusIconComponent;
