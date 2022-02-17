import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';

export default Controller.extend({
  queryParams: ['groupId', 'difficulty'],
  groupId: null,
  difficulty: 1,
  difficultyOptions: [
    {
      value: 1,
      label: 'Makkelijk',
    },
    {
      value: 2,
      label: 'Gemiddeld',
    },
    {
      value: 3,
      label: 'Moeilijk',
    },
  ],
  currentQuestionIndex: 1,
  success: 0,
  questions: [],
  textInput: '',
  started: false,
  finished: false,
  answered: false,
  users: computed('group.name', 'store', function () {
    return this.store.query('user', {
      filter: { group: this.group.get('name') },
    });
  }),
  group: computed('groupId', 'store', function () {
    if (!this.groupId) {
      return;
    }

    return this.store.find('group', this.groupId);
  }),
  humanizedDifficulty: computed('difficulty', 'difficultyOptions', function () {
    return this.difficultyOptions.find(
      (option) => option.value === this.difficulty
    ).label;
  }),
  progressBarStyle: computed('progress', function () {
    return `width: ${this.progress}%`;
  }),
  currentQuestion: computed('currentQuestionIndex', 'questions', function () {
    return this.questions.objectAt(this.currentQuestionIndex - 1);
  }),
  progress: computed('currentQuestionIndex', 'questions.length', function () {
    return (this.currentQuestionIndex / this.questions.length) * 100;
  }),
  inputClass: computed('answered', 'currentQuestion.success', function () {
    if (this.answered) {
      if (this.currentQuestion.success) {
        return 'form-control is-valid';
      } else {
        return 'form-control is-invalid';
      }
    }

    return 'form-control';
  }),
  grade: computed('questions.length', 'success', function () {
    return 1 + Math.round((90 / this.questions.length) * this.success) / 10;
  }),
  actions: {
    setGroupId(model) {
      this.set('groupId', model.id);
    },
    startTrainer() {
      this.users.then((users) => {
        this.generateQuestions(users.filter((user) => user.avatarThumbUrl));
        this.set('started', true);
        this.set('finished', false);
        this.set('currentQuestionIndex', 1);
        this.set('success', 0);
      });
    },
    stopTrainer() {
      this.set('started', false);
      this.set('finished', false);
    },
    chooseOption(option) {
      if (!this.answered) {
        let { currentQuestion } = this;
        currentQuestion.answer = option;
        currentQuestion.success = option === currentQuestion.question;
        if (currentQuestion.success) {
          this.incrementProperty('success');
        }

        this.goToNextQuestion();
      }
    },
    checkAnswer() {
      let { currentQuestion } = this;
      currentQuestion.answer = this.textInput;
      currentQuestion.success =
        currentQuestion.answer === currentQuestion.question.get('fullName');
      if (currentQuestion.success) {
        this.incrementProperty('success');
      }

      this.goToNextQuestion();
    },
  },
  generateQuestions(people) {
    let shuffledPeople = this.shuffleArray(people);
    let questions = shuffledPeople.map((person) => ({
      question: person,
      options: this.generateOptions(people, person),
      answer: null,
      success: null,
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
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  },
  goToNextQuestion() {
    this.set('answered', true);
    let _this = this;
    run.later(function () {
      if (_this.get('currentQuestionIndex') < _this.get('questions.length')) {
        _this.set('answered', false);
        _this.incrementProperty('currentQuestionIndex');
        _this.set('textInput', '');
      } else {
        _this.set('answered', false);
        _this.set('finished', true);
        _this.set('started', false);
      }
    }, 2000);
  },
});
