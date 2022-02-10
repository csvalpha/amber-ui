import { action } from '@ember/object';
import { htmlSafe } from '@ember/string';
import UpcomingActivitiesToolComponent from 'alpha-amber/components/tools/upcoming-activities';

export default class Activities extends UpcomingActivitiesToolComponent {
  modalTitle = '';
  modalText = '';
  modalLocation = '';
  modalImage = '';
  modalIsOpen = false;

  @action
  openModal(activity) {
    this.set('modalTitle', activity.get('title'));
    this.set('modalText', activity.get('description'));
    this.set('modalLocation', activity.get('location'));
    this.set('modalImage', activity.get('coverPhotoUrlOrDefault'));
    this.set('modalIsOpen', true);
  }

  @action
  closeModal() {
    this.set('modalIsOpen', false);
  }

  get modalImageStyle() {
    return htmlSafe(
      `background: url('${this.modalImage}'); background-size: cover; background-position: center;"`
    );
  }
}
