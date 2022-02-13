import { run } from '@ember/runloop';

export default function destroyApp(application) {
  run(application, 'destroy');

  // Shutdown mirage if it is started
  if (this.server) {
    this.server.shutdown();
  }
}
