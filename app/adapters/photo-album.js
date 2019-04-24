import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  dropzoneEndpoint(model) {
    const id = model.get('id');
    return `${this.buildURL('photo-album', id)}/dropzone`;
  }
});
