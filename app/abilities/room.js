import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default class Room extends Ability {
  get canCreate() {
    return this.session.hasPermission('room.create');
  }

  get canShow() {
    return this.session.hasPermission('room.read');
  }

  get canDestroy() {
    return this.session.hasPermission('room.destroy');
  }

  get canEdit() {
    return (
      this.session.hasPermission('room.update') ||
      this.isRoomOwner(this.model)
    );
  }

  isRoomOwner(room) {
    const { currentUser } = this.session;
    return !isNone(currentUser) && room.isOwner(currentUser);
  }
}
