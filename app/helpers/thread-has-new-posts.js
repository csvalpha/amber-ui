import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

export default Helper.extend({
  storage: service('local-storage'),
  compute([thread]) {
    let currentStore = this.storage.getItem('forumLastRead') || '{}';
    currentStore = JSON.parse(currentStore);
    const lastRead = currentStore[thread.get('id')];
    return lastRead === undefined || new Date(lastRead) < thread.get('updatedAt');
  }
});
