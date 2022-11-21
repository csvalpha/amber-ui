import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserWebdavController extends Controller {
  @service fetch;
  @service session;

  get webDavEnabled() {
    return this.session.currentUser.webdavSecretKey !== null;
  }

  get webDavURL() {
    return `${window.location.origin}/webdav/${this.session.currentUser.id}/${this.session.currentUser.webdavSecretKey}/contacts`;
  }

  @action
  async generateWebdavSecret() {
    const user = this.session.currentUser;

    await this.fetch.fetch(`/users/${user.id}/activate_webdav`, {
      method: 'POST',
    });
    user.reload();
  }
}
