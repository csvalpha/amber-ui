import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  session: service(),
  fetch: service(),
  webDavEnabled: computed('session.currentUser.webdavSecretKey', function() {
    return this.session.currentUser.webdavSecretKey !== null;
  }),
  webDavURL: computed('session.currentUser.webdavSecretKey', 'session.currentUser.id', function() {
    return `${window.location.origin}/webdav/${this.session.currentUser.id}/${this.session.currentUser.webdavSecretKey}/contacts`;
  }),

  actions: {
    generateWebdavSecret() {
      let user = this.session.currentUser;

      return this.fetch.fetch(`/users/${user.id}/activate_webdav`, { method: 'POST' }).then(function() {
        user.reload();
      });
    }
  }
});
