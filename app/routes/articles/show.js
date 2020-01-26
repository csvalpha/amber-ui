import { computed } from '@ember/object';
import { ShowRouteUnauthenticated } from 'alpha-amber/routes/application/show';

export default ShowRouteUnauthenticated.extend({
  canAccess() {
    return this.can.can('show articles');
  },
  modelName: 'article',
  title: computed('controller.model.title', function() {
    return this.get('controller.model.title');
  }),
  parents: ['articles.index'],
  pageActions: computed('controller.model', function() {
    const article = this.get('controller.model');
    return [
      {
        link: 'articles.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: article,
        canAccess: this.can.can('edit article', article)
      },
      {
        link: 'articles.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.get('controller.model'),
        canAccess: this.can.can('destroy articles')
      }
    ];
  })
});
