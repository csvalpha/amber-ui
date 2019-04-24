import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import DS from 'ember-data';
import CoverPhotoModelMixin from 'alpha-amber/mixins/coverphoto-model-mixin';
import checkIfUserIsOwnerMixin from 'alpha-amber/mixins/check-if-user-is-owner-mixin';

const { Model, attr, belongsTo, hasMany } = DS;

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
    const content = this.get('content');
    const maxExcerptLength = 218;
    if (content && content.length > maxExcerptLength) {
      return `${content.substr(0, content.lastIndexOf(' ', maxExcerptLength))}...`;
    }
    return content;
  }),

  // Relations
  author: belongsTo('user'),
  group: belongsTo('group'),
  comments: hasMany('articleComment'),
  amountOfComments: attr('number')
});
