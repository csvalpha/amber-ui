import Model, { belongsTo, attr } from '@ember-data/model';
import { isNone } from '@ember/utils';
import { CoverPhotoFallback } from 'alpha-amber/constants';

export default class Activity extends Model {
  // Attributes
  @attr title;
  @attr description;
  @attr descriptionCamofied;
  @attr('number') price;
  @attr location;
  @attr startTime;
  @attr endTime;
  @attr('capitalized-string') category;
  @attr createdAt;
  @attr updatedAt;
  @attr({ defaultValue: false }) publiclyVisible;
  @attr coverPhoto;
  @attr coverPhotoUrl;

  // Relations
  @belongsTo('user') author;
  @belongsTo('group') group;
  @belongsTo('form/form') form;

  // Getters
  get formattedPrice() {
    return parseFloat(this.price).toFixed(2);
  }

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

  get isFullDayButNotMidnight() {
    const startTime = moment(this.startTime);
    const endTime = moment(this.endTime);
    const days = endTime.diff(startTime, 'days');
    const midnight = startTime.hour() === 0 && startTime.minute() === 0 && endTime.hour() === 0 && endTime.minute() === 0;
    return days >= 1 && !midnight;
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
    if (user.id === this.author.get('id')) {
      return true;
    }

    return user.get('memberships').then(() => {
      return user.get('currentMemberships').some(membership => membership.group.id === this.group.id);
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
