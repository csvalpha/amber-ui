import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { IndexRouteUnauthenticated } from 'alpha-amber/routes/application/index';
import { capitalize } from '@ember/string';
import PagedModelRouteMixin from 'alpha-amber/mixins/paged-model-route-mixin';

export default IndexRouteUnauthenticated.extend(PagedModelRouteMixin, {
  intl: service(),
  canAccess() {
    return this.can.can('show photo-albums');
  },

  modelName: 'photo-album',

  title: computed(function() {
    return capitalize(this.intl.t('model.photoAlbum.name.other').toString());
  }),

  perPage: 10,

  pageActions: computed('can', function() {
    return [
      {
        link: 'photo-comments.index',
        title: 'Bekijk fotoreacties',
        icon: 'comments',
        canAccess: this.can.can('show photo-comments')
      },
      {
        link: 'photo-albums.new',
        title: 'Nieuw foto-album',
        icon: 'plus',
        canAccess: this.can.can('create photo-albums')
      }
    ];
  })
});
