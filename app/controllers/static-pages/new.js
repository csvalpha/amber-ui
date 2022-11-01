import EditStaticPageController from './static-page/edit';

export default class NewStaticPageController extends EditStaticPageController {
  successMessage = 'Infopagina aangemaakt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'static-pages.index';
  get cancelTransitionModel() {
    return null;
  }
}
