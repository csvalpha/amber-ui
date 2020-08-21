import Model, { attr } from '@ember-data/model';

export default class DailyVerse extends Model {
  @attr reference;
  @attr content;
  @attr copyright;
}
