import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  ajax: service(),
  i18n: service(),

  queryParams: ['email'],
  email: null,

  actions: {
    forgotPassword() {
      const resetPasswordRequest = this.ajax.post('/users/reset_password', { data: { email: this.email } });
      resetPasswordRequest.then(() => {
        const successMessage = this.i18n.t('Je ontvangt een e-mail met verdere instructies');
        this.set('successMessage', successMessage);
      }, reject => {
        let errorMessage;
        switch (reject.status) {
          case 404:
            errorMessage = this.i18n.t('E-mailadres niet gevonden');
            break;
          case 500:
            errorMessage = this.i18n.t('Er ging iets mis op de server, <a href="mailto:ict@csvalpha.nl">raadpleeg de ICT-commissie</a>').htmlSafe();
            break;
          default:
            errorMessage = this.i18n.t('Er ging iets mis, probeer het nog een keer');
            break;
        }
        this.set('errorMessage', errorMessage);
      });
    }
  }
});
