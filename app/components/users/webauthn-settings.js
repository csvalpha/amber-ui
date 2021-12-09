import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isInvalidResponse } from 'ember-fetch/errors';
import { create } from '@github/webauthn-json';

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
      const registrationResponse = await this.fetch.post('/webauthn/credentials', { body: authResponse });
      let json = await registrationResponse.json();

      if (registrationResponse.ok) {
        // Todo do some magic and create a table with all keys
      } else if (isInvalidResponse(registrationResponse)) {
        this.set('webauthnErrorMessage', json.error);
      }
    }
  }
});
