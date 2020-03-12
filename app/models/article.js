import Model, { hasMany, belongsTo, attr } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import CoverPhotoModelMixin from 'alpha-amber/mixins/coverphoto-model-mixin';
import checkIfUserIsOwnerMixin from 'alpha-amber/mixins/check-if-user-is-owner-mixin';

export default Model.extend(CoverPhotoModelMixin, checkIfUserIsOwnerMixin, {
  modelName: alias('_internalModel.modelName'),

  // Attributes
  title: attr('string'),
  content: attr('string'),
  contentCamofied: attr('string'),
  createdAt: attr('date'),
  updatedAt: attr('date'),
  publiclyVisible: attr('boolean', { defaultValue: false }),

  // Computed
  excerpt: computed('content', function() {
    const maxExcerptLength = 218;
    if (this.content && this.content.length > maxExcerptLength) {
      return `${this.content.substr(0, this.content.lastIndexOf(' ', maxExcerptLength))}...`;
    }

    return this.content;
  }),

  // Relations
  author: belongsTo('user'),
  group: belongsTo('group'),
  comments: hasMany('articleComment'),
  amountOfComments: attr('number')
});
