import EditController from 'amber-ui/controllers/application/edit';

export default class EditThreadController extends EditController {
  successMessage = 'Topic aangepast!';
  successTransitionTarget = 'forum.categories.category.threads.thread.show';
}
