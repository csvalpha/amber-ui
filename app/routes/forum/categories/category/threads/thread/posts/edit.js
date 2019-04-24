import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  skipBeforeModelAccessCheck: true,
  afterModel(post, transition) {
    return this.checkAccessWithPromise(this.can('edit forum/post', post), transition);
  },
  modelName: 'forum/post',
  modelRouteParam: 'post_id',
  title: 'Forumbericht bewerken'
});
