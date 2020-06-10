import Model, { belongsTo, attr } from '@ember-data/model';
import { isNone } from '@ember/utils';
import { CoverPhotoFallback } from 'alpha-amber/constants';

export default class Activity extends Model {
  // Attributes
  @attr('string') title;
  @attr('string') description;
  @attr('string') descriptionCamofied;
  @attr('number') price;
  @attr('string') location;
  @attr('date') startTime;
  @attr('date') endTime;
  @attr('capitalized-string') category;
  @attr('date') createdAt;
  @attr('date') updatedAt;
  @attr('boolean', { defaultValue: false }) publiclyVisible;
  @attr coverPhoto;
  @attr coverPhotoUrl;

  // Relations
  @belongsTo('user') author;
  @belongsTo('group') group;
  @belongsTo('form/form') form;

  // Computed properties
  get endsOnSameDate() {
    return moment(this.startTime).isSame(this.endTime, 'day');
  }

  get formattedStartDate() {
    const startTime = moment(this.startTime);
    const endTime = moment(this.endTime);
    const prettyStartDateTime = startTime.format('ddd DD MMMM HH:mm');
    const prettyStartTime = startTime.format('HH:mm');

    if (moment().isBetween(startTime, endTime)) {
      const format = startTime.isBefore(moment(), 'day') ? prettyStartDateTime : prettyStartTime;
      return `Nu bezig (vanaf ${format})`;
    } else if (moment().isSame(startTime, 'day')) {
      return `Vandaag, ${prettyStartTime}`;
    }

    return prettyStartDateTime;
  }

  get coverPhotoUrlOrDefault() {
    return this.coverPhotoUrl || CoverPhotoFallback;
  }

  // Methods
  saveWithForm() {
    return this.form.then(form => {
      if (!isNone(form)) {
        return form.saveWithQuestions().then(() => {
          return this.save();
        });
      }

      return this.save();
    });
  }

  isOwner(user) {
    if (user.id === this.get('author.id')) {
      return true;
    }

    return user.get('memberships').then(() => {
      return user.get('currentMemberships').some(membership => membership.get('group.id') === this.get('group.id'));
    });
  }

  rollbackAttributesAndForm() {
    this.rollbackAttributes();
    this.form.then(form => {
      if (!isNone(form)) {
        form.rollbackAttributesAndQuestions();
      }
    });
  }
}
