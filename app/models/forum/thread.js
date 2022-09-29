import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import {inject as service} from '@ember/service';
import { isNone } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import { assign } from '@ember/polyfills';


export default class Thread extends Model {
  @service store;
  // Properties
  @attr title;
  @attr read;
  @attr('date') closedAt;
  @attr('date') createdAt;
  @attr('date') updatedAt;
  @attr amountOfPosts;

  // Relations
  @belongsTo('user') author;
  @belongsTo('forum/category') category;
  @hasMany('forum/post', {sort: 'created_at'}) posts;

  @tracked
  postsPaged;


  get firstPost() {
    return this.posts.get('firstObject');
  }

  async queryPostsPaged(params) {
    assign(params,{filter: {thread: this.id}, sort: 'created_at'})
    this.postsPaged = await this.store.queryPaged('forum/post', params);
  }

  get isOpen() {
    return this.closedAt === null;
  }

  set isOpen(value) {
    if (value) {
      this.set('closedAt', null);
    } else {
      this.set('closedAt', new Date());
    }
  }

  async saveWithFirstPost() {
    const post = await this.firstPost;
    if (isNone(post.message)) {
      throw new Error('Je moet eerst een bericht invullen.');
    } else {
      const response = await this.save();
      const firstPost = await response.firstPost;
      await firstPost.save();
      return response;
    }
  }

  rollbackAttributesAndPosts() {
    this.rollbackAttributes();
    this.posts.forEach((post) => {
      post.rollbackAttributes();
    });
  }
}
