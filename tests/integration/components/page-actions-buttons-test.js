import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('page-actions-buttons', 'Integration | Component | page actions buttons', {
  integration: true
});

test('it renders page actions', function(assert) {
  this.set('pageActions', [
    {
      link: 'users.new',
      title: 'Nieuw lid',
      canAccess: true
    }, {
      link: 'articles.new',
      title: 'Nieuw artikel',
      canAccess: true
    }, {
      link: 'groups.new',
      title: 'Nieuwe group',
      icon: 'plus',
      canAccess: true
    }
  ]);

  this.render(hbs`{{page-actions-buttons pageActions}}`);

  const pageActionChildren = this.$('.page-actions-buttons a button');
  assert.equal(pageActionChildren.length, 3);
  assert.equal(this.$(pageActionChildren[0]).text().trim(), 'Nieuw lid');
  assert.equal(this.$(pageActionChildren[1]).text().trim(), 'Nieuw artikel');
  assert.ok(this.$(pageActionChildren[2]).children('svg').hasClass('fa-plus'));
});

test('it does not render page actions for which the user is not authorized', function(assert) {
  this.set('pageActions', [
    {
      link: 'groups.index',
      title: 'Groepen'
    }, {
      link: 'forum.new',
      title: 'Nieuw topic'
    }
  ]);

  this.render(hbs`{{page-actions-buttons pageActions}}`);

  const pageActionChildren = this.$('.page-actions-buttons a');
  assert.equal(pageActionChildren.length, 0);
});

test('it allows for custom page actions', function(assert) {
  this.set('pageActions', []);

  this.render(hbs`{{#page-actions-buttons pageActions}}<a href="#">Test action</a>{{/page-actions-buttons}}`);

  const pageActionChildren = this.$('.page-actions-buttons a');
  assert.equal(pageActionChildren.length, 1);
  assert.equal(this.$(pageActionChildren[0]).text().trim(), 'Test action');
});
