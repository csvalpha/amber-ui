import Controller from '@ember/controller';
import { computed } from '@ember/object';
import GroupMembershipsMixin from 'alpha-amber/mixins/group-memberships-mixin';
import { run } from '@ember/runloop';

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
  success: 0,
  questions: [],
  textInput: '',
  started: false,
  finished: false,
  answered: false,
  groupSelected: computed('group', 'model', function() {
    this.generateQuestions(this.get('model'));
    return this.get('group') != null;
  }),
  humanizedDifficulty: computed('difficultyOptions', 'difficulty', function() {
    return this.get('difficultyOptions').find(option => option.value === this.get('difficulty')).label;
  }),
  currentQuestion: computed('current', 'questions', function() {
    return this.get('questions').objectAt(this.get('current') - 1).question;
  }),
  currentOptions: computed('current', 'questions', function() {
    return this.get('questions').objectAt(this.get('current') - 1).options;
  }),
  currentQuestionItem: computed('current', 'questions', function() {
    return this.get('questions').objectAt(this.get('current') - 1);
  }),
  progress: computed('current', 'questions.length', function() {
    return (100 / this.get('questions.length')) * this.get('current');
  }),
  inputClass: computed('currentQuestionItem', 'answered', function() {
    if (this.get('answered')) {
      if (this.get('currentQuestionItem').success) {
        return 'form-control is-valid';
      } else {
        return 'form-control is-invalid';
      }
    }

    return 'form-control';
  }),
  grade: computed('questions.length', 'success', function() {
    return 1 + Math.round((90 / this.get('questions.length')) * this.get('success')) / 10;
  }),
  actions: {
    startTrainer() {
      if (this.get('group') == null) {
        this.set('group', this.get('selectedGroup.id'));
      }

      this.set('started', true);
      this.set('finished', false);
      this.set('current', 1);
      this.set('success', 0);
    },
    restartTrainer() {
      this.generateQuestions(this.get('model'));
      this.set('started', true);
      this.set('finished', false);
      this.set('current', 1);
      this.set('success', 0);
    },
    stopTrainer() {
      this.set('group', null);
      this.set('started', false);
    },
    chooseOption(option) {
      if (!this.get('answered')) {
        let currentQuestionItem = this.get('currentQuestionItem');
        currentQuestionItem.answer = option;
        currentQuestionItem.success = (option === currentQuestionItem.question);
        if (currentQuestionItem.success) {
          this.incrementProperty('success');
        }

        this.goToNextQuestion();
      }
    },
    checkAnswer() {
      let currentQuestionItem = this.get('currentQuestionItem');
      currentQuestionItem.answer = this.get('textInput');
      currentQuestionItem.success = (currentQuestionItem.answer === currentQuestionItem.question.get('fullName'));
      if (currentQuestionItem.success) {
        this.incrementProperty('success');
      }

      this.goToNextQuestion();
    }
  },
  generateQuestions(people) {
    let shuffledPeople = this.shuffleArray(people);
    let questions = shuffledPeople.map((person) => ({
      question: person,
      options: this.generateOptions(people, person),
      answer: null,
      success: null
    }));
    this.set('questions', questions);
  },
  generateOptions(items, item) {
    let shuffledItems = this.shuffleArray(items);
    shuffledItems.splice(shuffledItems.indexOf(item), 1);
    let options = shuffledItems.slice(0, 4);
    options[Math.floor(Math.random() * options.length)] = item;
    return options;
  },
  shuffleArray(array) {
    return array.map((a) => ({ sort: Math.random(), value: a.get('user') }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  },
  goToNextQuestion() {
    this.set('answered', true);
    let _this = this;
    run.later((function() {
      if (_this.get('current') < _this.get('questions.length')) {
        _this.set('answered', false);
        _this.incrementProperty('current');
        _this.set('textInput', '');
      } else {
        _this.set('answered', false);
        _this.set('finished', true);
        _this.set('started', false);
      }
    }), 2000);
  }
});
