import Model, { belongsTo, hasMany, attr } from '@ember-data/model';

export default class Thread extends Model {
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
  @hasMany('forum/post') posts;

  get firstPost() {
    return this.posts.length > 0 ? this.posts[0] : null;
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

  rollbackAttributesAndPosts() {
    this.rollbackAttributes();
    this.posts.forEach((post) => {
      post.rollbackAttributes();
    })
  }
}
