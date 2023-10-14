import VacancyEditController from './vacancy/edit';

export default class VacanciesNewController extends VacancyEditController {
  successMessage = 'Vacature aangemaakt!';
  cancelMessage = 'Vacature aanmaken geannuleerd.';
  cancelTransitionTarget = 'vacancies';
  cancelTransitionModel = null;
}
