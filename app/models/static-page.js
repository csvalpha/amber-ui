import Model, { attr } from '@ember-data/model';

export default class StaticPage extends Model {
  // Properties
  @attr title;
  @attr content;
  @attr contentCamofied;
  @attr slug;
  @attr('date') createdAt;
  @attr({ defaultValue: false })  publiclyVisible;
  @attr category;
}
