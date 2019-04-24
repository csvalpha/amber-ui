import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  name: null,
  classNames: ['md-editor-and-toolbar'],
  editMode: true,
  modalOpen: false,
  modalInput: null,
  modalOption: null,

  modalIdentifier: computed(function() {
    return `${this.elementId}-modal`;
  }),

  textareaIdentifier: alias('textareaId'),
  textareaClass: computed('name', function() {
    return `form-control md-editor ${this.get('name')}`;
  }),
  selectionStart: null,
  selectionEnd: null,

  textareaId: computed('elementId', function() {
    return `${this.get('elementId')}-textarea`;
  }),

  actions: {
    toggleEditMode() {
      this.toggleProperty('editMode');
    },

    openModal(option) {
      this.set('modalOption', option);
      this.set('modalOpen', true);

      const textarea = $(`#${this.get('textareaIdentifier')}`);
      const selectionStart = textarea.prop('selectionStart');
      const selectionEnd = textarea.prop('selectionEnd');

      this.set('selectionStart', selectionStart);
      this.set('selectionEnd', selectionEnd);
    },

    applyStyle(option) {
      const content = this.get('content');

      const textarea = $(`#${this.get('textareaIdentifier')}`);
      const selectionStart = this.get('selectionStart') || textarea.prop('selectionStart');
      const selectionEnd = this.get('selectionEnd') || textarea.prop('selectionEnd');

      const selection = textarea.val().substring(selectionStart, selectionEnd);
      let styledSelection;

      if (option.modal) {
        const modalInput = this.get('modalInput');
        styledSelection = option.format.replace('$1', selection);
        styledSelection = styledSelection.replace('$2', modalInput);
        this.set('modalInput', null);
        this.set('modalOption', null);
        this.set('modalOpen', false);
        this.set('selectionStart', null);
        this.set('selectionEnd', null);
      } else {
        styledSelection = option.format.replace('$1', selection);
      }

      const styledContent
        = content.substring(0, selectionStart)
        + styledSelection
        + content.substring(selectionStart + selection.length);

      this.set('content', styledContent);
    }
  }
});
