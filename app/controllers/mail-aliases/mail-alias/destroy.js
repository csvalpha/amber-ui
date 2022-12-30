import DestroyController from 'amber-ui/controllers/application/destroy';

export default class MailAliasDestroyController extends DestroyController {
  successTransitionTarget = 'mail-aliases';
  cancelTransitionTarget = 'mail-aliases.mail-alias';
}
