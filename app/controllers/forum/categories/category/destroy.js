import DestroyController from 'amber-ui/controllers/application/destroy';

export default class ForumCategoryDestroyController extends DestroyController {
  successMessage = 'Categorie verwijderd!';
  successTransitionTarget = 'forum.index';
  cancelTransitionTarget = 'forum.categories.category';
}
