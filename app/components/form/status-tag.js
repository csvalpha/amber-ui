import Component from '@ember/component';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';

export const FormStatusTagComponent = Component.extend({
  form: null,
  tagName: 'span',
  isTag: true,
  isNoneValue: 'Vrij toegankelijk',
  responseCompletedValue: 'Ingeschreven',
  classNameBindings: ['isTag:badge', 'colorIndicatorClass'],
  content: computed(
    'form.{canRespond,currentUserResponseCompleted,respondFrom}',
    'isNoneValue',
    'responseCompletedValue',
    function () {
      if (isNone(this.form)) {
        return this.isNoneValue;
      }

      if (this.form.get('currentUserResponseCompleted')) {
        return this.responseCompletedValue;
      }

      if (this.form.get('canRespond')) {
        return 'Open';
      }

      if (this.form.get('respondFrom') > new Date()) {
        return 'Opent later';
      }

      return 'Gesloten';
    }
  ),
  colorIndicatorClass: computed(
    'form',
    'form.canRespond',
    'form.respondFrom',
    'form.currentUserResponseCompleted',
    function () {
      if (isNone(this.form)) {
        return 'badge-success';
      }

      const formIsOpen = this.form.get('canRespond');
      const userHasResponded = this.form.get('currentUserResponseCompleted');

      if (userHasResponded) {
        return 'badge-success';
      }

      return formIsOpen ? 'badge-info' : 'badge-default';
    }
  ),
});

FormStatusTagComponent.reopenClass({
  positionalParams: ['form'],
});

export default FormStatusTagComponent;
