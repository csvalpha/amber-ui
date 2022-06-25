import EditController from 'amber-ui/controllers/application/edit';
import { StaticPageCategories } from 'amber-ui/constants';
import { capitalize } from '@ember/string';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from '@ember/object';

export default class EditStaticPageController extends EditController {
  successMessage = 'Infopagina aangepast!';
  successTransitionTarget = 'static-pages.show';

  @computed(function () {
    return StaticPageCategories.map((pageCategory) => {
      return {
        value: pageCategory,
        label: capitalize(pageCategory),
      };
    });
  })
  staticPageCategoryOptions;
}
