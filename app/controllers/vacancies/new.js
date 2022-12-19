import EditVacancyController from './edit';

export default class NewVacancyController extends EditVacancyController {
  successMessage = 'Vacature aangemaakt!';
  cancelMessage = 'Vacature aanmaken geannuleerd.';
  cancelTransitionTarget = 'vacancies.index';
  get cancelTransitionModel() {
    return null;
  }
}
