import DestroyController from 'alpha-amber/controllers/application/destroy';

export default DestroyController.extend({
  successTransitionTarget: 'mail-moderations.index',
  successMessage: 'Mail is genegeerd'
});
