import EditController from 'amber-ui/controllers/application/edit';

export default class CategoryEditController extends EditController {
  successMessage = 'Categorie aangepast!';
  successTransitionTarget = 'forum.categories.category';
}
