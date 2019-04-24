import { computed } from '@ember/object';
import IndexRoute from 'alpha-amber/routes/application/index';

export default IndexRoute.extend({
  canAccess() {
    return this.can('show members');
  },
  modelName: 'user',
  title: 'Leden',
  pageActions: computed(function() {
    return [
      {
        link: 'users.new',
        title: 'Nieuw lid',
        icon: 'plus',
        canAccess: this.can('create users')
      },
      {
        link: 'users.webdav',
        title: 'Contactsynchronisatie',
        icon: 'address-book',
        canAccess: this.can('show webdav users')
      }
    ];
  }),
  model(params) {
    params.filter = { group: 'Leden' };
    return this.store.query(this.get('modelName'), params);
  }
});
