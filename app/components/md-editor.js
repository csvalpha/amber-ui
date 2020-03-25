import Component from '@ember/component';
import { set, action } from '@ember/object';

export default class MdEditorComponent extends Component {
  classNames = ['md-editor-and-toolbar'];
  content = '';
  editMode = true;

  @action
  applyStyle(option, modalInput = null) {

    // TODO make this work on selected text
    // It is hard to track what the selected text is without jquery
    // For now we just append the style
    let style = option.format.replace('$1', '');
    if (option.modal) {
      style = style.replace('$2', modalInput);
    }

    set(this, 'content', this.content + style);
  }

}
