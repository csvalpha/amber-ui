import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';

export default Controller.extend({
  flashNotice: service('flash-notice'),
  showNotFound: computed('status', function() {
    return this.get('model.isAuthorizationMixinError')
      || (this.get('model.isAdapterError') && ['403', '404'].includes(this.status));
  }),
  showStatic: computed('status', function() {
    return ['502', '503'].includes(this.status);
  }),
  status: computed('model', function() {
    const status = this.get('model.errors.firstObject.status');
    return status ? String(status) : status;
  }),
  message: computed('status', function() {
    switch (this.status) {
      case '400': // Bad Request
        return 'Er is iets mis met de request. Geef de ICT-commissie even de tijd om dit op te lossen.';
      case '402': // Payment required
        return 'Hier moet je voor betalen.';
      case '405': // Method not allowed
      case '406': // Not acceptable
        return 'De server accepteert de request niet. Geef de ICT-commissie even de tijd om dit op te lossen.';
      case '409': // Conflict
        return 'O o, iemand anders was je waarschijnlijk voor, want er was een conflict. Probeer het nog eens.';
      case '413': // Payload Too Large
      case '431': // Request Header Fields Too Large
        return 'Het lijkt erop dat je probeert teveel data te versturen. Probeer eens iets minder.';
      case '418': // I'm a teapot
        return 'De server weigert koffie te zetten, omdat ze beweert een theepot te zijn.';
      case '500': // Internal Server Error
        return 'Oh nee, de server is stuk! Geef de ICT-commissie even de tijd om dit op te lossen.';
      case '501': // Not Implemented
        return 'Te snel: dit is nog niet geïmplementeerd!';
      case '503':
        return 'De website is momenteel niet beschikbaar. Probeer het later opnieuw.';
      default:
        return 'Er is iets mis gegaan. Probeer het later opnieuw.';
    }
  }),
  init() {
    this._super();
    run.scheduleOnce('afterRender', this, this.checkBackend);
  },
  checkBackend() {
    if (this.showStatic) {
      this.flashNotice.sendWarning('De backend is momenteel niet bereikbaar. U ziet een statische versie van de website.', true);
    }
  }
});
