import { run } from '@ember/runloop';

export default function destroyApp(application) {
  run(application, 'destroy');

  // Shutdown mirage if it is started
  if (server) {
    server.shutdown();
  }
}
