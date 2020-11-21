import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import EditController from 'alpha-amber/controllers/application/edit';

export default EditController.extend({
  successMessage: 'Transactie aangepast!',
  successTransitionTarget: 'debit.collections.show',
  successTransitionModel: alias('model.collection.id'),
  users: computed('store', function() {
    return this.store.findAll('user');
  }),

  actions: {
    setUser(user) {
      this.model.set('user', user);
    }
  }
});
