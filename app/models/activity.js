import Model, { belongsTo, attr } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import CoverPhotoModelMixin from 'alpha-amber/mixins/coverphoto-model-mixin';
import checkIfUserIsOwnerMixin from 'alpha-amber/mixins/check-if-user-is-owner-mixin';

export default Model.extend(CoverPhotoModelMixin, checkIfUserIsOwnerMixin, {
  modelName: alias('_internalModel.modelName'),

  // Attributes
  title: attr('string'),
  description: attr('string'),
  descriptionCamofied: attr('string'),
  price: attr('number'),
  location: attr('string'),
  startTime: attr('date'),
  endTime: attr('date'),
  category: attr('string'),
  createdAt: attr('date'),
  updatedAt: attr('date'),
  author: belongsTo('user'),
  group: belongsTo('group'),
  publiclyVisible: attr('boolean', { defaultValue: false }),

  // Computed properties
  formattedPrice: computed('price', function() {
    return parseFloat(this.price).toFixed(2);
  }),
  formattedCategory: computed('category', function() {
    return this.category.capitalize();
  }),
  endsOnSameDate: computed('startTime', 'endTime', function() {
    return moment(this.startTime).isSame(this.endTime, 'day');
  }),
  formattedStartDate: computed('startTime', 'endTime', function() {
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
  }),

  // Relations
  form: belongsTo('form/form'),

  saveWithForm() {
    // Every day fun with triple nested promises
    return this.form.then(form => {
      if (!isNone(form)) {
        return form.saveWithQuestions().then(() => {
          return this.save();
        });
      }

      return this.save();
    });
  },
  rollbackAttributesAndForm() {
    this.rollbackAttributes();
    this.form.then(form => {
      if (!isNone(form)) {
        form.rollbackAttributesAndQuestions();
      }
    });
  }
});
