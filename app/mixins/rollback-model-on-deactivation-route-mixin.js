import Mixin from '@ember/object/mixin';

/**
 * @public
 * Mixin for a route to make sure that changes to the model are rolled back when the route is deactivated
 * (when the user goes to another page).
 */
export default Mixin.create({
  deactivate() {
    this._super();
    // Calling `rollbackAttributes()` for a saved record reverts all the `changedAttributes` to their original value.
    // If the record `isNew` it will be removed from the store.
    // https://guides.emberjs.com/v2.6.0/models/creating-updating-and-deleting-records/#toc_persisting-records
    this.controller.model?.rollbackAttributes();
  }
});
