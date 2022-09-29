import EditController from 'amber-ui/controllers/application/edit';

export default class EditPostController extends EditController {
  successMessage = 'Forumbericht aangepast!';
  successTransitionTarget = 'forum.categories.category.threads.thread';

  successTransitionModel = null;

}
