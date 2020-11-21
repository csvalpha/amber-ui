import { computed } from '@ember/object';
import { ShowRouteUnauthenticated } from 'alpha-amber/routes/application/show';

export default ShowRouteUnauthenticated.extend({
  canAccess() {
    return this.can.can('show static-pages');
  },
  modelName: 'static-page',
  title: computed.reads('controller.model.title'),
  parents: ['static-pages.index'],
  pageActions: computed('can', 'controller.model', function() {
    return [
      {
        link: 'static-pages.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: this.controller.model,
        canAccess: this.can.can('edit static-pages')
      },
      {
        link: 'static-pages.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.controller.model,
        canAccess: this.can.can('destroy static-pages')
      }
    ];
  })
});
