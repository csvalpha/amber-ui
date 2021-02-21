import EditController from 'alpha-amber/controllers/application/edit';
import { computed } from '@ember/object';
import { StaticPageCategories } from 'alpha-amber/constants';
import { capitalize } from '@ember/string';

export default EditController.extend({
  successMessage: 'Infopagina aangepast!',
  successTransitionTarget: 'static-pages.show',

  staticPageCategoryOptions: computed(function() {
    return StaticPageCategories.map(pageCategory => {
      return {
        value: pageCategory,
        label: capitalize(pageCategory)
      };
    });
  })

});
