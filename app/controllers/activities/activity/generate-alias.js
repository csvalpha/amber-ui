import Controller from '@ember/controller';
import { action } from '@ember/object';
import { isInvalidResponse } from 'ember-fetch/errors';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ActivityGenerateAliasController extends Controller {
  @service fetch;

  @tracked errorMessage = null;
  @tracked alias;
  @tracked expiresAt;

  @action
  async generateAlias() {
    this.errorMessage = null;
    const response = await this.fetch.post(
      `/activities/${this.model.id}/generate_alias`
    );
    if (response.ok) {
      const json = await response.json();
      this.alias = json.data.alias;
      this.expiresAt = json.data.expires_at;
    } else if (isInvalidResponse(response)) {
      const json = await response.json();
      this.errorMessage = json.errors?.[0].detail ?? response;
    }
  }
}
