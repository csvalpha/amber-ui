import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

const exif = [
  'Make',
  'Model',
  'DateTimeOriginal',
  'ExposureTime',
  'ApertureValue',
  'IsoSpeedRatings',
  'Copyright',
  'LensModel',
  'FocalLength',
];

export default class Photo extends Model {
  // Properties
  @attr imageUrl;
  @attr imageThumbUrl;
  @attr imageMediumUrl;
  @attr amountOfComments;
  @attr amountOfTags;
  @attr('date') updatedAt;
  @attr('date') createdAt;

  @attr exifMake;
  @attr exifModel;
  @attr('date') exifDateTimeOriginal;
  @attr exifExposureTime;
  @attr exifApertureValue;
  @attr exifIsoSpeedRatings;
  @attr exifCopyright;
  @attr exifLensModel;
  @attr exifFocalLength;

  // Relations
  @belongsTo photoAlbum;
  @belongsTo('user') uploader;
  @hasMany('photoComment') comments;
  @hasMany('photoTag') tags;

  // Getters
  get hasExif() {
    return exif.filter((field) => this.get(`exif${field}`) !== null).length > 0;
  }
}
