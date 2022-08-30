import DestroyController from 'amber-ui/controllers/application/destroy';

export default class DestroyPostController extends DestroyController {
  successMessage = 'Forumbericht verwijderd!';
  successTransitionTarget = 'forum.categories.category.threads.thread';
}
