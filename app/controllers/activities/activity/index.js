import Controller from '@ember/controller';
import { isNone } from '@ember/utils';
import { inject as service } from '@ember/service';

export default class ActivityIndexController extends Controller {
  @service flashNotice;

  get canSubmitResponse() {
    const { form } = this.model;
    return !isNone(form) && form.get('currentUserCanRespond');
  }
}
