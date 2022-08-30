import DestroyController from 'amber-ui/controllers/application/destroy';

export default class ForumThreadDestroyController extends DestroyController {
  successTransitionTarget = 'forum.categories.category';
  successMessage = 'Topic verwijderd!';
}
