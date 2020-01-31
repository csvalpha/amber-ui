import Controller from '@ember/controller';
import { computed } from '@ember/object';
import GroupMembershipsMixin from 'alpha-amber/mixins/group-memberships-mixin';

export default Controller.extend(GroupMembershipsMixin, {
  queryParams: ['group', 'difficulty'],
  group: null,
  difficulty: 1,
  selectedGroup: null,
  difficultyOptions: [
    {
      value: 1,
      label: 'Makkelijk'
    }, {
      value: 2,
      label: 'Gemiddeld'
    }, {
      value: 3,
      label: 'Moeilijk'
    }
  ],
  current: 1,
  max: 20,
  success: 0,
  options: [],
  question: null,
  started: false,
  groupSelected: computed('group', function() {
    return this.get('group') != null;
  }),
  actions: {
    startTrainer() {
      if (this.get('group') == null) this.set('group', this.get('selectedGroup.id'));
      this.set('started', true);
      this.generateOptions();
    },
    stopTrainer() {
      this.set('group', null);
      this.set('started', false);
    }
  },
  generateOptions: function() {
    let shuffled = this.get('model')
      .map((a) => ({sort: Math.random(), value: a.get('user')}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    let options = shuffled.slice(0,4);
    this.set('options', options);
    this.set('question', options[Math.floor(Math.random() * (options.length + 1))]);
  }
});
