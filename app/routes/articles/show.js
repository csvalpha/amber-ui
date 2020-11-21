import { computed } from '@ember/object';
import { ShowRouteUnauthenticated } from 'alpha-amber/routes/application/show';

export default ShowRouteUnauthenticated.extend({
  canAccess() {
    return this.can.can('show articles');
  },
  modelName: 'article',
  title: computed.reads('controller.model.title'),
  parents: ['articles.index'],
  pageActions: computed('can', 'controller.model', function() {
    const article = this.controller.model;
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
        linkArgument: this.controller.model,
        canAccess: this.can.can('destroy articles')
      }
    ];
  })
});
