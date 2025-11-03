import Model, { belongsTo, attr } from '@ember-data/model';

export default class StudyRoomPresence extends Model {
  // Properties
  @attr startTime;
  @attr endTime;
  @attr status;

  // Relations
  @belongsTo user;
}
