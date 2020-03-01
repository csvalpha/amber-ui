// import LinkComponent from '@ember/routing/link-component';
// import { typeOf } from '@ember/utils';
//
// export default LinkComponent.extend({
//   attributeBindings: ['data-test-link', 'itemprop'],
//   classNames: ['link'],
//   didReceiveAttrs() {
//     this._super(...arguments);
//     // Instead of the models, we set the id's of the models. This has 2 reasons:
//     // 1. The model is always reloaded when transitioning to a route, so we always have the last version
//     // 2. When the model is passed, the routeParams as passed to Route.beforeModel is empty. However, we need these
//     // for out authorization.
//     // TODO: Check this implementation
//     // const modelIds = this.models.map(model => typeOf(model) === 'instance' ? model.get('id') : model);
//     // this.set('models', modelIds);
//   }
// });
