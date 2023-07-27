import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class RoomIndexRoute extends AuthenticatedRoute {
  get pageActions() {
    const room = this.controller.model;
    return [
      {
        link: 'rooms.room.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: room,
        canAccess: this.abilities.can('edit room', room),
      },
      {
        link: 'rooms.room.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: room,
        canAccess: this.abilities.can('destroy rooms'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show rooms');
  }
}
