import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class WebdavController extends Controller {
  @service session;
  @service fetch;
  get webDavEnabled() {
    return this.session.currentUser.webdavSecretKey !== null;
  }

  get webDavURL() {
    return `${window.location.origin}/webdav/${this.session.currentUser.id}/${this.session.currentUser.webdavSecretKey}/contacts`;
  }

  @action
  async generateWebdavSecret() {
    let user = this.session.currentUser;

    await this.fetch.fetch(`/users/${user.id}/activate_webdav`, {
      method: 'POST',
    });
    user.reload();
  }
}
