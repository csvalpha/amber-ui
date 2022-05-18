import DestroyController from 'amber-ui/controllers/application/destroy';

export default DestroyController.extend({
  successMessage: 'Forumbericht verwijderd!',
  successTransitionTarget: 'forum.categories.category.threads.thread',
});
