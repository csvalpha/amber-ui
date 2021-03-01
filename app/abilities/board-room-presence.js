import { Ability } from 'ember-can';

export default class BoardRoomPresence extends Ability {
  get canShow() {
    return this.session.hasPermission('board-room-presence.read');
  }

  get canCreate() {
    return this.session.hasPermission('board-room-presence.create');
  }

  get canDestroy() {
    return this.session.hasPermission('board-room-presence.destroy');
  }
}
