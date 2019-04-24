import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import component from 'alpha-amber/tests/pages/components/tools/upcoming-birthdays';
import { create } from 'ember-cli-page-object';
import EmberObject from '@ember/object';

let upcomingBirthdaysComponent;

moduleForComponent('tools/upcoming_birthdays', 'Integration | Component | tools/upcoming birthdays', {
  integration: true,
  beforeEach() {
    upcomingBirthdaysComponent = create(component);
    upcomingBirthdaysComponent.setContext(this);
  },
  afterEach() {
    upcomingBirthdaysComponent.removeContext();
  }
});

test('it shows current and upcoming birthdays when needed', function(assert) {
  assert.expect(8);

  const user1 = EmberObject.create({
    fullName: 'Henk de Vries',
    age: 22
  });

  const user2 = EmberObject.create({
    fullName: 'Jaap Janssen',
    age: 30
  });

  const user3 = EmberObject.create({
    fullName: 'Hans ter Ham',
    age: 18
  });

  this.set('usersWithBirthdayToday', [user1]);
  this.set('usersWithUpcomingBirthday', [user2]);
  upcomingBirthdaysComponent.render(hbs`{{tools/upcoming-birthdays usersWithUpcomingBirthday=usersWithUpcomingBirthday usersWithBirthdayToday=usersWithBirthdayToday}}`);
  assert.equal(this.$('.current-birthday-holder').length, 1);
  assert.equal(this.$('.upcoming-birthday-holder').length, 1);

  this.set('usersWithBirthdayToday', [user1, user2]);
  this.set('usersWithUpcomingBirthday', [user3]);
  upcomingBirthdaysComponent.render(hbs`{{tools/upcoming-birthdays usersWithUpcomingBirthday=usersWithUpcomingBirthday usersWithBirthdayToday=usersWithBirthdayToday}}`);
  assert.equal(this.$('.current-birthday-holder').length, 2);
  assert.equal(this.$('.upcoming-birthday-holder').length, 1);

  this.set('usersWithBirthdayToday', [user1, user2]);
  this.set('usersWithUpcomingBirthday', []);
  upcomingBirthdaysComponent.render(hbs`{{tools/upcoming-birthdays usersWithUpcomingBirthday=usersWithUpcomingBirthday usersWithBirthdayToday=usersWithBirthdayToday}}`);
  assert.equal(this.$('.current-birthday-holder').length, 2);
  assert.equal(this.$('.upcoming-birthday-holder').length, 0);

  this.set('usersWithBirthdayToday', []);
  this.set('usersWithUpcomingBirthday', [user1, user2]);
  upcomingBirthdaysComponent.render(hbs`{{tools/upcoming-birthdays usersWithUpcomingBirthday=usersWithUpcomingBirthday usersWithBirthdayToday=usersWithBirthdayToday}}`);
  assert.equal(this.$('.current-birthday-holder').length, 0);
  assert.equal(this.$('.upcoming-birthday-holder').length, 2);
});
