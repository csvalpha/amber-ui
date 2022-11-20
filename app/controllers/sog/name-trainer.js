import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NameTrainerController extends Controller {
  @service store;
  queryParams = ['groupId', 'difficulty'];
  @tracked groupId = null;
  @tracked difficulty = 1;
  difficultyOptions = [
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
  ];

  @tracked currentQuestionIndex = 1;
  @tracked success = 0;
  @tracked questions = [];
  @tracked textInput = '';
  @tracked started = false;
  @tracked finished = false;
  @tracked answered = false;
  @tracked errorMessage;

  get users() {
    return this.getUsers();
  }

  async getUsers() {
    const group = await this.group;
    if (!group) {
      return [];
    }
    const memberships = await group.get('memberships');
    return await Promise.all(memberships.mapBy('user'));
  }

  get group() {
    if (!this.groupId) {
      return null;
    }
    return this.store.find('group', this.groupId);
  }

  get humanizedDifficulty() {
    return this.difficultyOptions.find(
      (option) => option.value === this.difficulty
    ).label;
  }

  get progressBarStyle() {
    return `width: ${this.progress}%`;
  }

  get currentQuestion() {
    return this.questions.objectAt(this.currentQuestionIndex - 1);
  }

  get progress() {
    return (this.currentQuestionIndex / this.questions.length) * 100;
  }

  get inputClass() {
    if (this.answered) {
      if (this.currentQuestion.success) {
        return 'form-control is-valid';
      } else {
        return 'form-control is-invalid';
      }
    }
    return 'form-control';
  }

  get grade() {
    return 1 + Math.round((90 / this.questions.length) * this.success) / 10;
  }

  @action
  setGroupId(model) {
    this.groupId = model.id;
  }

  @action
  async startTrainer() {
    const users = await this.users;
    const usersWithAvatar = users.filter((user) => user.avatarThumbUrl);
    if (!usersWithAvatar.length) {
      this.errorMessage =
        'Namen trainen wordt een beetje onmogelijk, want niemand in deze groep heeft een profielfoto.';
      return;
    }
    this.generateQuestions(usersWithAvatar);
    this.started = true;
    this.finished = false;
    this.currentQuestionIndex = 1;
    this.success = 0;
  }

  @action
  stopTrainer() {
    this.started = false;
    this.finished = false;
  }

  @action
  chooseOption(option) {
    if (!this.answered) {
      let { currentQuestion } = this;
      currentQuestion.answer = option;
      currentQuestion.success = option === currentQuestion.question;
      if (currentQuestion.success) {
        this.success++;
      }
      this.goToNextQuestion();
    }
  }

  @action
  checkAnswer() {
    let { currentQuestion } = this;
    currentQuestion.answer = this.textInput;
    currentQuestion.success =
      currentQuestion.answer === currentQuestion.question.get('fullName');
    if (currentQuestion.success) {
      this.success++;
    }
    this.goToNextQuestion();
  }

  generateQuestions(people) {
    let shuffledPeople = this.shuffleArray(people);
    let questions = shuffledPeople.map((person) => ({
      question: person,
      options: this.generateOptions(people, person),
      answer: null,
      success: null,
    }));
    this.questions = questions;
  }

  generateOptions(items, item) {
    let shuffledItems = this.shuffleArray(items);
    shuffledItems.splice(shuffledItems.indexOf(item), 1);
    let options = shuffledItems.slice(0, 4);
    options[Math.floor(Math.random() * options.length)] = item;
    return options;
  }

  shuffleArray(array) {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  goToNextQuestion() {
    this.answered = true;
    let _this = this;
    run.later(function () {
      if (_this.currentQuestionIndex < _this.questions.length) {
        _this.answered = false;
        _this.currentQuestionIndex++;
        _this.textInput = '';
      } else {
        _this.answered = false;
        _this.finished = true;
        _this.started = false;
      }
    }, 2000);
  }
}
