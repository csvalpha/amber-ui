import EditController from 'amber-ui/controllers/application/edit';

export default class EditCategoryController extends EditController {
  successMessage = 'Categorie aangepast!';
  successTransitionTarget = 'forum.categories.category';
}
