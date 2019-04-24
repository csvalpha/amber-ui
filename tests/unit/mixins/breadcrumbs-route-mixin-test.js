import EmberObject, { computed } from '@ember/object';
import BreadcrumbsRouteMixinMixin from 'alpha-amber/mixins/breadcrumbs-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | breadcrumbs route mixin');

test('it has a breadCrumb with title when the title is constant', (assert) => {
  const BreadcrumbsRouteMixinObject = EmberObject.extend(BreadcrumbsRouteMixinMixin);
  const subject = BreadcrumbsRouteMixinObject.create({
    title: 'Test title'
  });
  const breadCrumb = subject.get('breadCrumb');

  assert.deepEqual(breadCrumb, {
    title: 'Test title'
  });
});

test('it has a breadCrumb with title when the title is a computed property', (assert) => {
  const BreadcrumbsRouteMixinObject = EmberObject.extend(BreadcrumbsRouteMixinMixin, {
    title: computed('foo', 'foo2', function() {
      return `${this.get('foo')} ${this.get('foo2')}`;
    })
  });
  const subject = BreadcrumbsRouteMixinObject.create({
    foo: 'bar',
    foo2: 'bar2'
  });
  const breadCrumb = subject.get('breadCrumb');

  assert.deepEqual(breadCrumb, {
    title: 'bar bar2'
  });
});
