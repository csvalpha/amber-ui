import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class RoomAdvertIndexRoute extends AuthenticatedRoute {
  get pageActions() {
    const room_advert = this.controller.model;
    return [
      {
        link: 'room-adverts.room-advert.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: room_advert,
        canAccess: this.abilities.can('edit room-advert', room_advert),
      },
      {
        link: 'room-adverts.room-advert.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: room_advert,
        canAccess: this.abilities.can('destroy room-adverts', room_advert),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show room-adverts');
  }
}
