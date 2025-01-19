import { Ability } from 'ember-can';

export default class StudyRoomPresence extends Ability {
  get canShow() {
    return this.session.hasPermission('study-room-presence.read');
  }

  get canCreate() {
    return this.session.hasPermission('study-room-presence.create');
  }

  get canDestroy() {
    return this.session.hasPermission('study-room-presence.destroy');
  }
}
