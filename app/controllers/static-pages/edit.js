import EditController from 'amber-ui/controllers/application/edit';
import { StaticPageCategories } from 'amber-ui/constants';
import { capitalize } from '@ember/string';
import { action } from '@ember/object';

export default class EditStaticPageController extends EditController {
  successMessage = 'Infopagina aangepast!';
  successTransitionTarget = 'static-pages.show';

  get staticPageCategoryOptions() {
    return StaticPageCategories.map((pageCategory) => {
      return {
        value: pageCategory,
        label: capitalize(pageCategory),
      };
    });
  }

  @action
  setContent(content) {
    this.model.content = content;
  }
}
