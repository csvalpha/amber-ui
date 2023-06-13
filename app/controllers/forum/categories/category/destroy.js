import DestroyController from 'amber-ui/controllers/application/destroy';

export default class CategoryDestroyController extends DestroyController {
  successMessage = 'Categorie verwijderd!';
  successTransitionTarget = 'forum';
  cancelTransitionTarget = 'forum.categories.category';
}
