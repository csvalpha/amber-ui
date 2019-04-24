import { moduleFor, test } from 'ember-qunit';

moduleFor('route:activities/print_enrolled', 'Unit | Route | activities/print_enrolled', {
  needs: ['service:can', 'service:layout-manager', 'service:session', 'service:router-scroll', 'service:scheduler']
});

test('it exists', function(assert) {
  const route = this.subject();
  assert.ok(route);
});

