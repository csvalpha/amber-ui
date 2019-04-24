import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import UpcomingActivitiesToolComponent from 'alpha-amber/components/tools/upcoming-activities';

export default UpcomingActivitiesToolComponent.extend({
  modalTitle: '',
  modalText: '',
  modalLocation: '',
  modalImage: '',
  modalIsOpen: false,

  actions: {
    openModal(activity) {
      this.set('modalTitle', activity.get('title'));
      this.set('modalText', activity.get('description'));
      this.set('modalLocation', activity.get('location'));
      this.set('modalImage', activity.get('coverPhotoUrlOrDefault'));
      this.set('modalIsOpen', true);
    },
    closeModal() {
      this.set('modalIsOpen', false);
    }
  },

  modalImageStyle: computed('modalImage', function() {
    return htmlSafe(`background: url('${this.get('modalImage')}'); background-size: cover; background-position: center;"`);
  })
});
