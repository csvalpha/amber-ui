import EditController from 'amber-ui/controllers/application/edit';
import { StaticPageCategories } from 'amber-ui/constants';
import { capitalize } from '@ember/string';

export default class StaticPageEditController extends EditController {
  successMessage = 'Infopagina aangepast!';
  successTransitionTarget = 'static-pages.static-page';

  get staticPageCategoryOptions() {
    return StaticPageCategories.map((pageCategory) => {
      return {
        value: pageCategory,
        label: capitalize(pageCategory),
      };
    });
  }
}