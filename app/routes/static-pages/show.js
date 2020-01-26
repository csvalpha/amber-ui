import { computed } from '@ember/object';
import { ShowRouteUnauthenticated } from 'alpha-amber/routes/application/show';

export default ShowRouteUnauthenticated.extend({
  canAccess() {
    return this.can.can('show static-pages');
  },
  modelName: 'static-page',
  title: computed('controller.model.title', function() {
    return this.get('controller.model.title');
  }),
  parents: ['static-pages.index'],
  pageActions: computed('controller.model', function() {
    return [
      {
        link: 'static-pages.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: this.get('controller.model'),
        canAccess: this.can.can('edit static-pages')
      },
      {
        link: 'static-pages.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.get('controller.model'),
        canAccess: this.can.can('destroy static-pages')
      }
    ];
  })
});
