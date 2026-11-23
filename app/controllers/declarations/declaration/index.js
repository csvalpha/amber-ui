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
    // The user can navigate to another declaration while the request is pending
    const declaration = this.model;
    const isActive = () => this.model === declaration;

    this.errorMessage = null;
    this.missingMandate = false;
    let response;
    try {
      response = await this.fetch.post(
        `/declarations/${declaration.id}/approve`
      );
    } catch {
      if (isActive()) {
        this.errorMessage = 'Goedkeuren mislukt, probeer het opnieuw.';
      }
      return;
    }

    if (response.ok) {
      this.flashNotice.sendSuccess('Declaratie goedgekeurd!');
      await this.reloadAfterSuccess(declaration);
      return;
    }

    const errors = await this.errorsFromResponse(response);
    if (!isActive()) {
      return;
    }
    // Approving requires an active direct debit mandate, see Declaration#approve! in amber-api
    this.missingMandate = errors.some((error) =>
      error.includes('incassomandaat')
    );
    const name = declaration.user.get('fullName');
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

    const declaration = this.model;
    const isActive = () => this.model === declaration;

    this.errorMessage = null;
    let response;
    try {
      response = await this.fetch.post(
        `/declarations/${declaration.id}/mark_manually_paid`
      );
    } catch {
      // Don't retry automatically, the server may have recorded the payment
      if (isActive()) {
        this.errorMessage = 'Markeren mislukt, probeer het opnieuw.';
      }
      return;
    }

    if (response.ok) {
      this.flashNotice.sendSuccess(
        'Declaratie gemarkeerd als handmatig uitbetaald!'
      );
      await this.reloadAfterSuccess(declaration);
      return;
    }

    const errors = await this.errorsFromResponse(response);
    if (isActive()) {
      this.errorMessage = `Markeren mislukt: ${
        errors.join(', ') || 'er ging iets mis.'
      }`;
    }
  }

  // The action itself succeeded, so a failed refresh is not reported as a failed action
  async reloadAfterSuccess(declaration) {
    try {
      await declaration.reload();
    } catch {
      this.flashNotice.sendWarning(
        'De declaratie kon niet ververst worden, herlaad de pagina.'
      );
    }
  }

  @action
  async toggleIncludeInNextCollection(event) {
    const declaration = this.model;
    this.errorMessage = null;
    declaration.includeInNextCollection = event.target.checked;
    try {
      await declaration.save();
    } catch (error) {
      declaration.rollbackAttributes();
      this.errorMessage = `Opslaan mislukt: ${error}`;
    }
  }

  @action
  async downloadPdf() {
    // Capture before the download, the model can change while it is pending
    const { id, pdfFilename } = this.model;
    await this.download(
      `/declarations/${id}/pdf`,
      () => pdfFilename || `declaratie-${id}.pdf`
    );
  }

  // e.g. bon_2026-11-18_jan_de-vries_12_declaratie.jpg
  @action
  async downloadReceipt() {
    const { id, pdfFilename } = this.model;
    await this.download(`/declarations/${id}/receipt`, (blob) => {
      const extension = blob.type === 'application/pdf' ? 'pdf' : 'jpg';
      const base = pdfFilename?.replace(/\.pdf$/, '');
      return base
        ? `bon_${base}.${extension}`
        : `bon-declaratie-${id}.${extension}`;
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
      return (json.errors || [])
        .map((error) => error.detail || error.title)
        .filter(Boolean);
    } catch {
      return [];
    }
  }
}
