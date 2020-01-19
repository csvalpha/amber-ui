import { computed } from '@ember/object';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can('show mail-aliases');
  },
  modelName: 'mail-alias',
  title: computed('controller.model.email', function() {
    return this.get('controller.model.email');
  }),
  parents: ['mail-aliases.index'],
  pageActions: computed('controller.model', function() {
    const mailAlias = this.get('controller.model');
    return [
      {
        link: 'mail-aliases.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: mailAlias,
        canAccess: this.can('edit mail-aliases')
      },
      {
        link: 'mail-aliases.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: mailAlias,
        canAccess: this.can('destroy mail-aliases')
      }
    ];
  })
});
