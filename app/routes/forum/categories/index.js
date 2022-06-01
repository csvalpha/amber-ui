import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ForumIndexRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Forum' };

  get pageActions() {
    return [
      {
        link: 'forum.categories.new',
        title: 'Nieuwe categorie',
        icon: 'plus',
        canAccess: this.abilities.can('create forum/categories'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show forum/categories');
  }

  model() {
    return {
      categories: this.store.query('forum/category', { sort: '-updated_at' }),
      recentThreads: this.store.query('forum/thread', {
        sort: '-updated_at',
        page: { number: '1', size: 7 },
      }),
    };
  }
}
