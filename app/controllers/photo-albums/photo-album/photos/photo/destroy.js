import DestroyController from 'amber-ui/controllers/application/destroy';

export default class PhotoDestroyController extends DestroyController {
  successTransitionTarget = 'photo-albums.photo-album.photos';
  cancelTransitionTarget = 'photo-albums.photo-album.photos.photo';
}
