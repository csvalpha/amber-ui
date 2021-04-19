import ApplicationAdapter from './application';

export default class PhotoAlbum extends ApplicationAdapter {
  dropzoneEndpoint(model) {
    const id = model.get('id');
    return `${this.buildURL('photo-album', id)}/dropzone`;
  }
}
