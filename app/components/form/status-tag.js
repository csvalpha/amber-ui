import Component from '@ember/component';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';

export const FormStatusTagComponent = Component.extend({
  form: null,
  tagName: 'span',
  isTag: true,
  isNoneValue: 'Vrij toegankelijk',
  responseCompletedValue: 'Ingeschreven',
  classNameBindings: [
    'isTag:badge',
    'colorIndicatorClass'
  ],
  content: computed('form', 'form.currentUserResponseCompleted', 'form.canRespond', 'form.respondFrom', function() {
    const form = this.get('form');
    if (isNone(form)) {
      return this.get('isNoneValue');
    }

    if (form.get('currentUserResponseCompleted')) {
      return this.get('responseCompletedValue');
    }
    if (form.get('canRespond')) {
      return 'Open';
    }
    if (form.get('respondFrom') > new Date()) {
      return 'Opent later';
    }
    return 'Gesloten';
  }),
  colorIndicatorClass: computed('form', 'form.canRespond', 'form.respondFrom', 'form.currentUserResponseCompleted', function() {
    const form = this.get('form');

    if (isNone(form)) {
      return 'badge-success';
    }

    const formIsOpen = form.get('canRespond');
    const userHasResponded = form.get('currentUserResponseCompleted');

    if (userHasResponded) {
      return 'badge-success';
    }

    return formIsOpen ? 'badge-info' : 'badge-default';
  })
});

FormStatusTagComponent.reopenClass({
  positionalParams: ['form']
});

export default FormStatusTagComponent;
