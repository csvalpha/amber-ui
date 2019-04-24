import DestroyController from 'alpha-amber/controllers/application/destroy';

export default DestroyController.extend({
  successTransitionTarget: 'forum.categories.category',
  successMessage: 'Topic verwijderd!'
});
