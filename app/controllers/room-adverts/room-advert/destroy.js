import DestroyController from 'amber-ui/controllers/application/destroy';

export default class VacancyDestroyController extends DestroyController {
  successTransitionTarget = 'room-adverts';
  cancelTransitionTarget = 'room-adverts.room-advert';
}
