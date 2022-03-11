import DestroyController from 'alpha-amber/controllers/application/destroy';

export default DestroyController.extend({
  successMessage: 'Artikelreactie verwijderd!',
  actions: {
    destroy() {
      this.set('article', this.model.article);
      this._super(...arguments);
    },
    onSuccess() {
      this._super(...arguments);
      this.transitionToRoute('articles.show', this.article);
    },
  },
});
