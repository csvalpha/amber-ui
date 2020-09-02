import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';

export default Controller.extend({
  flashNotice: service('flash-notice'),
  canSubmitResponse: computed('model.form', 'model.form.currentUserCanRespond', function() {
    const { form } = this.model;
    return !isNone(form) && form.get('currentUserCanRespond');
  })
});
