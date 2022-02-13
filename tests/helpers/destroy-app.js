import { getContext } from '@ember/test-helpers';
import { run } from '@ember/runloop';

export default function destroyApp(application) {
  run(application, 'destroy');

  // Shutdown mirage if it is started
  const context = getContext();
  if (context.server) {
    context.server.shutdown();
  }
}
