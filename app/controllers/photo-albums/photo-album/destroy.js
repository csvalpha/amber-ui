import DestroyController from 'amber-ui/controllers/application/destroy';

export default class PhotoAlbumDestroyController extends DestroyController {
  successTransitionTarget = 'photo-albums.index';
}
