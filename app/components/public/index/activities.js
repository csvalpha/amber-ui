import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { tracked } from '@glimmer/tracking';
import Component from '@ember/component';

export default class Activities extends Component {
  @tracked activities;
  @tracked doubleActivityColumns;

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
    this.modalImage = activity.get('coverPhotoUrl');
    this.modalIsOpen = true;
  }

  @action
  closeModal() {
    this.modalIsOpen = false;
  }

  get modalImageStyle() {
    if (this.modalImage) {
      return htmlSafe(
        `background-image: url(${this.modalImage}); background-size: cover; background-position: center;"`
      );
    }
    return htmlSafe(
      'background: no-repeat center/40% url(/images/alphalogowhite-large.svg), #ffd218;"'
    );
  }

  get activitiesMatrix() {
    if (this.activities) {
      const matrix = [];
      for (
        let index = 0;
        index < this.activities.length;
        index += this.doubleActivityColumns ? 2 : 1
      ) {
        const pair = [this.activities.objectAt(index)];
        if (this.doubleActivityColumns && index + 1 < this.activities.length) {
          pair.push(this.activities.objectAt(index + 1));
        }
        matrix.push(pair);
      }
      return matrix;
    }
    return [];
  }
}
