import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can('show debit/mandates');
  },
  modelName: 'debit/mandate',
  title: alias('controller.model.uid'),
  parents: ['debit.mandate.index'],
  pageActions: computed('controller.model', function() {
    return [
      {
        link: 'debit.mandates.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: this.get('controller.model'),
        canAccess: this.can('edit debit/mandates')
      }
    ];
  })
});
