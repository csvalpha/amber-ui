import NewController from 'alpha-amber/controllers/application/new';

export default class NewCategoryController extends NewController {
  successMessage = 'Categorie toegevoegd!';
  successTransitionTarget = 'forum.categories';
}
