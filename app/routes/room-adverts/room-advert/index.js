import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class RoomAdvertIndexRoute extends AuthenticatedRoute {
  get pageActions() {
    const roomAdvert = this.controller.model;
    return [
      {
        link: 'room-adverts.room-advert.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: roomAdvert,
        canAccess: this.abilities.can('edit room-advert', roomAdvert),
      },
      {
        link: 'room-adverts.room-advert.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: roomAdvert,
        canAccess: this.abilities.can('destroy room-adverts', roomAdvert),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show room-adverts');
  }
}
