import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DeclarationRejectController extends Controller {
  @service fetch;
  @service flashNotice;

  @tracked rejectionReason = '';
  @tracked errorMessage = null;

  @action
  async submit() {
    this.errorMessage = null;
    const response = await this.fetch.post(
      `/declarations/${this.model.id}/reject`,
      {
        // eslint-disable-next-line camelcase -- API parameter
        body: { rejection_reason: this.rejectionReason },
      }
    );

    if (response.ok) {
      this.flashNotice.sendSuccess(
        'Declaratie afgekeurd, het lid krijgt hierover een mail.'
      );
      this.rejectionReason = '';
      await this.model.reload();
      this.transitionToRoute('declarations.declaration', this.model.id);
    } else {
      this.errorMessage = 'Afkeuren mislukt, heb je een reden opgegeven?';
    }
  }
}
