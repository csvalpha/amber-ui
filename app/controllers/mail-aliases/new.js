import EditMailAliasController from './edit';

export default class NewMailAliasController extends EditMailAliasController {
  successMessage = 'Mail-alias aangemaakt!';
  cancelMessage = 'Mail-alias aanmaken geannuleerd.';
  cancelTransitionTarget = 'mail-aliases.index';
  cancelTransitionModel = null;
}
