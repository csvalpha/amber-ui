import Model, { hasMany, belongsTo, attr } from '@ember-data/model';
import { computed } from '@ember/object';

const exif = [
  'Make', 'Model', 'DateTimeOriginal', 'ExposureTime', 'ApertureValue',
  'IsoSpeedRatings', 'Copyright', 'LensModel', 'FocalLength'
];

export default Model.extend({
  // Properties
  imageUrl: attr('string'),
  imageThumbUrl: attr('string'),
  imageMediumUrl: attr('string'),
  amountOfComments: attr('number'),
  updatedAt: attr('date'),
  createdAt: attr('date'),

  exifMake: attr('string'),
  exifModel: attr('string'),
  exifDateTimeOriginal: attr('date'),
  exifExposureTime: attr('string'),
  exifApertureValue: attr('string'),
  exifIsoSpeedRatings: attr('string'),
  exifCopyright: attr('string'),
  exifLensModel: attr('string'),
  exifFocalLength: attr('string'),

  // Relations
  photoAlbum: belongsTo('photoAlbum'),
  comments: hasMany('photoComment'),
  uploader: belongsTo('user'),

  // Computed
  hasExif: computed('exifMake', 'exifModel', function() {
    return exif.filter((field) => this.get(`exif${field}`) !== null).length > 0;
  })
});
