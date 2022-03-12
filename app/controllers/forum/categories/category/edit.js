import EditController from 'alpha-amber/controllers/application/edit';

export default class EditCategoryController extends EditController {
  successMessage = 'Categorie aangepast!';
  successTransitionTarget = 'forum.categories.category';
}
