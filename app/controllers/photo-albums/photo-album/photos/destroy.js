import DestroyController from 'amber-ui/controllers/application/destroy';

export default class PhotoAlbumPhotoDestroyController extends DestroyController {
  successTransitionTarget = 'photo-albums.photo-album.photos.index';
  cancelTransitionTarget = 'photo-albums.photo-album.photos.show';
}
