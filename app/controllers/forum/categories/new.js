import NewController from 'amber-ui/controllers/application/new';

export default class NewCategoryController extends NewController {
  successMessage = 'Categorie toegevoegd!';
  successTransitionTarget = 'forum.categories';
  cancelTransitionTarget = 'forum.categories';
  get successTransitionModel() {
    return null;
  }
}
