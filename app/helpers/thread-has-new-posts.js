import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

export default class ThreadHasNewPosts extends Helper {
  @service localStorage;

  compute([thread]) {
    let currentStore = this.localStorage.getItem('forumLastRead') || '{}';
    currentStore = JSON.parse(currentStore);
    const lastRead = currentStore[thread.get('id')];
    return (
      lastRead === undefined || new Date(lastRead) < thread.get('updatedAt')
    );
  }
}
