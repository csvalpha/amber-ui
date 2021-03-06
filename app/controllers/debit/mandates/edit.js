import { computed } from '@ember/object';
import EditController from 'alpha-amber/controllers/application/edit';

export default EditController.extend({
  successTransitionTarget: 'debit.mandates.show',

  users: computed('store', function() {
    return this.store.findAll('user');
  })
});
