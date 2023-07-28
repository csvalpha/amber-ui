import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default class RoomAdvert extends Ability {
  get canCreate() {
    return this.session.hasPermission('room-advert.create');
  }

  get canShow() {
    return this.session.hasPermission('room-advert.read');
  }

  get canDestroy() {
    return (
      this.session.hasPermission('room-advert.destroy') ||
      this.isRoomAdvertOwner(this.model)
    );
  }

  get canEdit() {
    return (
      this.session.hasPermission('room-advert.update') ||
      this.isRoomAdvertOwner(this.model)
    );
  }

  isRoomAdvertOwner(room_advert) {
    const { currentUser } = this.session;
    return !isNone(currentUser) && room_advert.isOwner(currentUser);
  }
}
