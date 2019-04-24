import { computed } from '@ember/object';
import IndexRoute from 'alpha-amber/routes/application/index';

export default IndexRoute.extend({
  canAccess() {
    return this.can('show mail-aliases');
  },
  modelName: 'mail-alias',
  title: 'Mail-aliassen',
  pageActions: computed(function() {
    return [
      {
        link: 'mail-aliases.new',
        title: 'Nieuw mailalias',
        icon: 'plus',
        canAccess: this.can('create mail-aliases')
      }
    ];
  })
});
