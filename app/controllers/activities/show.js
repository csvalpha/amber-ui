import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isNone } from '@ember/utils';

export default class ShowActivityController extends Controller {
  @service flashNotice;
  get canSubmitResponse() {
    const { form } = this.model;
    return !isNone(form) && form.get('currentUserCanRespond');
  }
}
