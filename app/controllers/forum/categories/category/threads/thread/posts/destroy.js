import DestroyController from 'amber-ui/controllers/application/destroy';

export default class ForumPostDestroyController extends DestroyController {
  successMessage = 'Forumbericht verwijderd!';
  successTransitionTarget = 'forum.categories.category.threads.thread';
}
