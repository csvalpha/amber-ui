import DestroyController from 'amber-ui/controllers/application/destroy';

export default class MailModerationDestroyController extends DestroyController {
  successMessage = 'Mail is genegeerd.';
  cancelMessage = 'Wijzigingen geannuleerd.';
  successTransitionTarget = 'mail-moderations.index';
  cancelTransitionTarget = 'mail-moderations.show';
}
