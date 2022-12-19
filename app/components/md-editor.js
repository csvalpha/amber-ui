import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MdEditorComponent extends Component {
  editMode = true;

  @action
  applyStyle(option, modalInput = null) {
    const textarea = document.getElementById(`${this.args.textareaId}`);

    const { selectionStart, selectionEnd } = textarea;
    const selection = textarea.value.substring(selectionStart, selectionEnd);

    let styledSelection = option.format.replace('$1', selection);
    if (option.modal) {
      styledSelection = styledSelection.replace('$2', modalInput);
    }

    const styledContent =
      this.args.content.substring(0, selectionStart) +
      styledSelection +
      this.args.content.substring(selectionStart + selection.length);

    this.args.setContent(styledContent);

    textarea.setSelectionRange(
      selectionStart,
      selectionEnd + styledSelection.length - selection.length
    );
    textarea.focus();
  }
}
