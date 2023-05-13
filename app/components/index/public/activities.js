import { action, computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { tracked } from '@glimmer/tracking';
import UpcomingActivitiesToolComponent from 'amber-ui/components/tools/upcoming-activities';

export default class Activities extends UpcomingActivitiesToolComponent {
  //TODO make this work
  amountOfActivities = 3;

  @tracked modalTitle = '';
  @tracked modalText = '';
  @tracked modalLocation = '';
  @tracked modalImage = '';
  @tracked modalIsOpen = false;

  @action
  openModal(activity) {
    this.modalTitle = activity.get('title');
    this.modalText = activity.get('description');
    this.modalLocation = activity.get('location');
    this.modalImage = activity.get('coverPhotoUrlOrDefault');
    this.modalIsOpen = true;
  }

  @action
  closeModal() {
    this.modalIsOpen = false;
  }

  get modalImageStyle() {
    return htmlSafe(
      `background: url('${this.modalImage}'); background-size: cover; background-position: center;"`
    );
  }
}
