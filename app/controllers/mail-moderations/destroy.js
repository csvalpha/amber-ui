import DestroyController from 'amber-ui/controllers/application/destroy';

export default class MailModerationDestroyController extends DestroyController {
  successTransitionTarget = 'mail-moderations.index';
  successMessage = 'Mail is genegeerd';
}
