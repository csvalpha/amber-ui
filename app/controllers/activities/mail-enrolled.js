import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  ajax: service('ajax'),
  errorMessage: null,
  actions: {
    submit() {
      const id = this.get('model.id');
      this.set('errorMessage', null);
      const message = this.get('message');
      if (message && message.trim().length > 0) {
        this.get('ajax').post(`/activities/${id}/mail_enrolled`, {
          data: {
            data: {
              attributes: {
                message
              }
            }
          }
        }).then(() => {
          this.set('message', null);
          this.transitionToRoute('activities.show', this.get('model.id'));
        }).catch((error) => {
          this.set('errorMessage', error.message);
        });
      }
    }
  }
});
