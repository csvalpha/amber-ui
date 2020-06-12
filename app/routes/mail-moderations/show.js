import { computed } from '@ember/object';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can.can('show mail-moderations');
  },
  modelName: 'stored-mail',
  title: computed.reads('controller.model.subject'),
  parents: ['mail-moderation.index'],
  pageActions: computed('can', 'controller.model', function() {
    return [
      {
        link: 'mail-moderations.accept',
        title: 'Goedkeuren',
        icon: 'check',
        linkArgument: this.get('controller.model'),
        canAccess: this.can.can('accept mail-moderations')
      },
      {
        link: 'mail-moderations.reject',
        title: 'Afkeuren',
        icon: 'minus-circle',
        linkArgument: this.get('controller.model'),
        canAccess: this.can.can('reject mail-moderations')
      },
      {
        link: 'mail-moderations.destroy',
        title: 'Negeren',
        icon: 'trash',
        linkArgument: this.get('controller.model'),
        canAccess: this.can.can('destroy mail-moderations')
      }
    ];
  })
});
