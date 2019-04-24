import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import PagedModelControllerMixin from 'alpha-amber/mixins/paged-model-controller-mixin';

export default Controller.extend(PagedModelControllerMixin, {
  session: service('session'),
  sort: '-created_at'
});
