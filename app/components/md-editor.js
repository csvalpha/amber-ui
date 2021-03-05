import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MdEditorComponent extends Component {
  classNames = ['md-editor-and-toolbar'];
  editMode = true;

  @tracked content = '';
  @tracked textareaId;

  @action
  applyStyle(option, modalInput = null) {
    const textarea = document.getElementById(`${this.textareaId}`);
    debugger;

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

    this.content = styledContent;
  }

}
