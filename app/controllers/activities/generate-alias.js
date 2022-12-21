import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isInvalidResponse } from 'ember-fetch/errors';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class GenerateAliasController extends Controller {
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
      this.errorMessage = json.errors ? json.errors[0].detail : response;
    }
  }
}
