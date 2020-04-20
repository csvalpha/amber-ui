import Component from '@ember/component';
import { set, action, computed } from '@ember/object';

export default class MdEditorComponent extends Component {
  classNames = ['md-editor-and-toolbar'];
  content = '';
  editMode = true;

  @computed('elementId')
  get textareaId() {
    return `${this.elementId}-textarea`;
  }

  @action
  applyStyle(option, modalInput = null) {
    const textarea = document.getElementById(`${this.textareaId}`);

    const { selectionStart, selectionEnd } = textarea;
    const selection = textarea.value.substring(selectionStart, selectionEnd);

    let styledSelection = option.format.replace('$1', selection);
    if (option.modal) {
      styledSelection = styledSelection.replace('$2', modalInput);
    }

    const styledContent
      = this.content.substring(0, selectionStart)
      + styledSelection
      + this.content.substring(selectionStart + selection.length);

    set(this, 'content', styledContent);
  }

}
