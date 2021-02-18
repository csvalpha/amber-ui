import { reads } from '@ember/object/computed';
import { computed } from '@ember/object';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can.can('show mail-aliases');
  },
  modelName: 'mail-alias',
  title: reads('controller.model.email'),
  parents: ['mail-aliases.index'],
  pageActions: computed('can', 'controller.model', function() {
    const mailAlias = this.controller.model;
    return [
      {
        link: 'mail-aliases.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: mailAlias,
        canAccess: this.can.can('edit mail-aliases')
      },
      {
        link: 'mail-aliases.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: mailAlias,
        canAccess: this.can.can('destroy mail-aliases')
      }
    ];
  })
});
