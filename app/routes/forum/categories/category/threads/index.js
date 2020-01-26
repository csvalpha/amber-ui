import { computed } from '@ember/object';
import IndexRoute from 'alpha-amber/routes/application/index';

export default IndexRoute.extend({
  canAccess() {
    return this.can.can('show forum/threads');
  },
  modelName: 'forum/thread',
  model() {
    return this.modelFor('forum.categories.category');
  },
  title: computed('controller.model.name', function() {
    return this.get('controller.model.name');
  }),
  parents: ['forum.index'],
  pageActions: computed('controller.model', function() {
    return [
      {
        link: 'forum.categories.category.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: this.get('controller.model'),
        canAccess: this.can.can('edit forum/categories')
      },
      {
        link: 'forum.categories.category.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.get('controller.model'),
        canAccess: this.can.can('destroy forum/categories')
      },
      {
        link: 'forum.categories.category.threads.new',
        title: 'Nieuw topic',
        icon: 'plus',
        // Only pass id when force reload is required, see http://emberigniter.com/force-store-reload-data-api-backend/
        // pass id to force Ember to call model() on forum.categories.threads.new
        // and not use the supplied category model as model for that route (as per Ember's default)
        linkArgument: this.get('controller.model.id'),
        canAccess: this.can.can('create forum/threads')
      }
    ];
  })
});
