import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DeclarationIndexController extends Controller {
  @service fetch;
  @service fileSaver;
  @service flashNotice;

  @tracked errorMessage = null;
  @tracked missingMandate = false;

  get sortedTransactions() {
    return this.model.transactions.sortBy('createdAt');
  }

  @action
  async approve() {
    this.errorMessage = null;
    this.missingMandate = false;
    const response = await this.fetch.post(
      `/declarations/${this.model.id}/approve`
    );

    if (response.ok) {
      this.flashNotice.sendSuccess('Declaratie goedgekeurd!');
      await this.model.reload();
      return;
    }

    const errors = await this.errorsFromResponse(response);
    // Approving requires an active direct debit mandate, see Declaration#approve! in amber-api
    this.missingMandate = errors.some((error) =>
      error.includes('incassomandaat')
    );
    const name = this.model.user.get('fullName');
    this.errorMessage = this.missingMandate
      ? `Goedkeuren kan niet: ${name} heeft geen actief incassomandaat. Voeg eerst een mandaat toe.`
      : `Goedkeuren mislukt: ${errors.join(', ') || 'er ging iets mis.'}`;
  }

  @action
  async markManuallyPaid() {
    const confirmed = window.confirm(
      'Weet je het zeker? Het openstaande bedrag wordt als handmatig uitbetaald gemarkeerd en niet meer met een incasso verrekend.'
    );
    if (!confirmed) {
      return;
    }

    this.errorMessage = null;
    const response = await this.fetch.post(
      `/declarations/${this.model.id}/mark_manually_paid`
    );
    if (response.ok) {
      this.flashNotice.sendSuccess(
        'Declaratie gemarkeerd als handmatig uitbetaald!'
      );
      await this.model.reload();
      return;
    }

    const errors = await this.errorsFromResponse(response);
    this.errorMessage = `Markeren mislukt: ${
      errors.join(', ') || 'er ging iets mis.'
    }`;
  }

  @action
  async toggleIncludeInNextCollection(event) {
    this.errorMessage = null;
    this.model.includeInNextCollection = event.target.checked;
    try {
      await this.model.save();
    } catch (error) {
      this.model.rollbackAttributes();
      this.errorMessage = `Opslaan mislukt: ${error}`;
    }
  }

  @action
  async downloadPdf() {
    await this.download(
      `/declarations/${this.model.id}/pdf`,
      () => this.model.pdfFilename || `declaratie-${this.model.id}.pdf`
    );
  }

  // e.g. bon_2026-11-18_jan_de-vries_12_declaratie.jpg
  @action
  async downloadReceipt() {
    await this.download(`/declarations/${this.model.id}/receipt`, (blob) => {
      const extension = blob.type === 'application/pdf' ? 'pdf' : 'jpg';
      const base = this.model.pdfFilename?.replace(/\.pdf$/, '');
      return base
        ? `bon_${base}.${extension}`
        : `bon-declaratie-${this.model.id}.${extension}`;
    });
  }

  async download(url, filenameFor) {
    this.errorMessage = null;
    const response = await this.fetch.fetch(url);
    if (response.ok) {
      const blob = await response.blob();
      this.fileSaver.saveAs(blob, filenameFor(blob));
    } else {
      this.errorMessage = 'Downloaden mislukt.';
    }
  }

  async errorsFromResponse(response) {
    try {
      const json = await response.json();
      return (json.errors || []).map((error) => error.detail || error.title);
    } catch {
      return [];
    }
  }
}
