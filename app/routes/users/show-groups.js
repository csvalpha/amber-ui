import { computed } from '@ember/object';
import UserShowRouteUnauthenticated from 'alpha-amber/routes/users/show';

export default UserShowRouteUnauthenticated.extend({
  pageActions: computed('controller.model', () => {})
});
