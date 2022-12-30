import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class VacancyEditController extends EditController {
  @service abilities;
  @service session;

  successMessage = 'Vacature opgeslagen!';
  successTransitionTarget = 'vacancies.vacancy';

  get groups() {
    if (this.abilities.can('select all groups for vacancies')) {
      return this.store.findAll('group');
    }
    return this.session.currentUser.get('groups');
  }

  @action
  coverPhotoLoaded(file) {
    const vacancy = this.model;
    vacancy.set('coverPhoto', file.data);
  }
}
