import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { IndexRouteUnauthenticated } from 'alpha-amber/routes/application/index';
import PagedModelRouteMixin from 'alpha-amber/mixins/paged-model-route-mixin';

export default IndexRouteUnauthenticated.extend(PagedModelRouteMixin, {
  i18n: service(),
  canAccess() {
    return this.can('show photo-albums');
  },

  modelName: 'photo-album',

  title: computed(function() {
    return this.get('i18n').t('model.photoAlbum.name.other').toString().capitalize();
  }),

  perPage: 10,

  pageActions: computed(function() {
    return [
      {
        link: 'photo-comments.index',
        title: 'Bekijk fotoreacties',
        icon: 'comments',
        canAccess: this.can('show photo-comments')
      },
      {
        link: 'photo-albums.new',
        title: 'Nieuw foto-album',
        icon: 'plus',
        canAccess: this.can('create photo-albums')
      }
    ];
  })
});
