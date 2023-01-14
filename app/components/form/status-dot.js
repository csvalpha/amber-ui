import Component from '@glimmer/component';
import { isNone } from '@ember/utils';

export default class FormStatusTag extends Component {
  get colorIndicatorClass() {
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
}
