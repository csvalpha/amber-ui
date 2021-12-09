import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isInvalidResponse } from 'ember-fetch/errors';
import { create } from '@github/webauthn-json';
import { assign } from '@ember/polyfills';

export default Component.extend({
  fetch: service(),
  flashNotice: service(),
  actions: {
    async activateWebauthn() {
      this.set('webauthnErrorMessage', null);

      if (this.keyNickname === '') {
        this.set('webauthnErrorMessage', 'Key should have a name');
        return;
      }

      // Fetch the challenge
      const authOptions = await this.fetch.post('/webauthn/challenges');

      // Promp for the security key
      const authResponse = await create({ publicKey: (await authOptions.json()) });

      // Send PubKey information to the erver
      let body = { nickname: this.keyNickname };
      assign(body, authResponse);
      const registrationResponse = await this.fetch.post('/webauthn/credentials', { body });
      let json = await registrationResponse.json();

      if (registrationResponse.ok) {
        this.model.webauthnCredentials.reload();
      } else if (isInvalidResponse(registrationResponse)) {
        this.set('webauthnErrorMessage', json.error);
      }
    }
  }
});
