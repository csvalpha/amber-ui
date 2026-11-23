import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DeclarationRejectController extends Controller {
  @service flashNotice;
  @service fetch;

  @tracked rejectionReason = '';
  @tracked errorMessage = null;

  // Called by the route when the reject page is opened for another declaration
  resetDraft() {
    this.rejectionReason = '';
    this.errorMessage = null;
  }

  @action
  async submit() {
    // The user can navigate to another declaration while the request is pending
    const declaration = this.model;
    const isActive = () => this.model === declaration;

    this.errorMessage = null;
    try {
      const response = await this.fetch.post(
        `/declarations/${declaration.id}/reject`,
        {
          // eslint-disable-next-line camelcase -- API parameter
          body: { rejection_reason: this.rejectionReason },
        }
      );
      if (!response.ok) {
        if (isActive()) {
          this.errorMessage = 'Afkeuren mislukt, heb je een reden opgegeven?';
        }
        return;
      }
    } catch {
      // Keep the reason so the treasurer can retry
      if (isActive()) {
        this.errorMessage = 'Afkeuren mislukt, probeer het opnieuw.';
      }
      return;
    }

    this.flashNotice.sendSuccess(
      'Declaratie afgekeurd, het lid krijgt hierover een mail.'
    );
    if (!isActive()) {
      return;
    }

    this.resetDraft();
    try {
      await declaration.reload();
    } catch {
      // The rejection succeeded, only refreshing the declaration failed
      this.flashNotice.sendWarning(
        'De declaratie kon niet ververst worden, herlaad de pagina.'
      );
    }
    if (isActive()) {
      this.transitionToRoute('declarations.declaration', declaration.id);
    }
  }
}
