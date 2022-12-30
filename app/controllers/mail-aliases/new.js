import MailAliasEditController from './mail-alias/edit';

export default class MailAliasesNewController extends MailAliasEditController {
  successMessage = 'Mail alias aangemaakt!';
  cancelMessage = 'Mail alias aanmaken geannuleerd.';
  cancelTransitionTarget = 'mail-aliases';
  cancelTransitionModel = null;
}
