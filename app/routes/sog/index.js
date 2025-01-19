import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class SogIndexRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'SOG' };

  canAccess() {
    return this.abilities.can('show sog');
  }

  async model() {
    /* eslint-disable camelcase */
    let photoAlbumsWithoutTags = await this.store.query('photo-album', {
      sort: '-date',
      filter: { without_photo_tags: true },
      page: { number: '1', size: 4 },
    });
    /* eslint-enable camelcase */
    return {
      photoAlbumsWithoutTags,
    };
  }
}
