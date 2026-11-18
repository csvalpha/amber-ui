import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DeclarationIndexController extends Controller {
  @service fetch;
  @service fileSaver;
  @service flashNotice;

  @tracked errorMessage = null;

  get sortedTransactions() {
    return this.model.transactions.sortBy('createdAt');
  }

  @action
  async approve() {
    this.errorMessage = null;
    const response = await this.fetch.post(
      `/declarations/${this.model.id}/approve`
    );

    if (response.ok) {
      this.flashNotice.sendSuccess('Declaratie goedgekeurd!');
      await this.model.reload();
    } else {
      this.errorMessage = await this.errorFromResponse(response);
    }
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
      `declaratie-${this.model.id}.pdf`
    );
  }

  @action
  async downloadReceipt() {
    await this.download(
      `/declarations/${this.model.id}/receipt`,
      `bon-declaratie-${this.model.id}`
    );
  }

  async download(url, filename) {
    this.errorMessage = null;
    const response = await this.fetch.fetch(url);
    if (response.ok) {
      const blob = await response.blob();
      this.fileSaver.saveAs(blob, filename);
    } else {
      this.errorMessage = 'Downloaden mislukt.';
    }
  }

  async errorFromResponse(response) {
    try {
      const json = await response.json();
      return json.errors
        ?.map((error) => error.detail || error.title)
        .join(', ');
    } catch {
      return 'Er ging iets mis.';
    }
  }
}
