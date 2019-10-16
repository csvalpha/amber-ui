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
    return `form-control md-editor ${this.name}`;
  }),
  selectionStart: null,
  selectionEnd: null,

  textareaId: computed('elementId', function() {
    return `${this.elementId}-textarea`;
  }),

  actions: {
    toggleEditMode() {
      this.toggleProperty('editMode');
    },

    openModal(option) {
      this.set('modalOption', option);
      this.set('modalOpen', true);

      const textarea = $(`#${this.textareaIdentifier}`);
      const selectionStart = textarea.prop('selectionStart');
      const selectionEnd = textarea.prop('selectionEnd');

      this.set('selectionStart', selectionStart);
      this.set('selectionEnd', selectionEnd);
    },

    applyStyle(option) {
      const textarea = $(`#${this.textareaIdentifier}`);
      const selectionStart = this.selectionStart || textarea.prop('selectionStart');
      const selectionEnd = this.selectionEnd || textarea.prop('selectionEnd');

      const selection = textarea.val().substring(selectionStart, selectionEnd);
      let styledSelection;

      if (option.modal) {
        styledSelection = option.format.replace('$1', selection);
        styledSelection = styledSelection.replace('$2', this.modalInput);
        this.set('modalInput', null);
        this.set('modalOption', null);
        this.set('modalOpen', false);
        this.set('selectionStart', null);
        this.set('selectionEnd', null);
      } else {
        styledSelection = option.format.replace('$1', selection);
      }

      const styledContent
        = this.content.substring(0, selectionStart)
        + styledSelection
        + this.content.substring(selectionStart + selection.length);

      this.set('content', styledContent);
    }
  }
});
