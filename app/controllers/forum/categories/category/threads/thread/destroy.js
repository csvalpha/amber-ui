import DestroyController from 'amber-ui/controllers/application/destroy';

export default DestroyController.extend({
  successTransitionTarget: 'forum.categories.category',
  successMessage: 'Topic verwijderd!',
});
