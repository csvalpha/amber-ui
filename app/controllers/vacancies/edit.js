import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EditVacancyController extends EditController {
  successMessage = 'Vacature opgeslagen!';
  successTransitionTarget = 'vacancies.show';

  @service session;
  @service abilities;

  get groups() {
    console.log("Getting groups")
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
