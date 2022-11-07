// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action, computed } from '@ember/object';
import { A } from '@ember/array';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class GroupExportController extends Controller {
  @service fetch;
  @service fileSaver;

  questions = [
    {
      question: 'Wat moet je doen dat je zonder deze data niet kan?',
      answer: '',
    },
    { question: 'Wie gaat er bij de data kunnen?', answer: '' },
    { question: 'Waar gaat de data worden opgeslagen?', answer: '' },
    { question: 'Wanneer gaat de data verwijderd worden?', answer: '' },
  ];

  userPropertyOptions = [
    {
      value: 'id',
      label: 'ID',
    },
    {
      value: 'username',
      label: 'Gebruikersnaam',
    },
    {
      value: 'first_name',
      label: 'Voornaam',
    },
    {
      value: 'last_name_prefix',
      label: 'Tussenvoegsel',
    },
    {
      value: 'last_name',
      label: 'Achternaam',
    },
    {
      value: 'full_name',
      label: 'Volledige naam',
    },
    {
      value: 'email',
      label: 'Email',
    },
    {
      value: 'study',
      label: 'Studie',
    },
    {
      value: 'startStudy',
      label: 'Start studie',
    },
    {
      value: 'address',
      label: 'Adres',
    },
    {
      value: 'postcode',
      label: 'Postcode',
    },
    {
      value: 'city',
      label: 'Stad',
    },
    {
      value: 'foodPreferences',
      label: 'Dieetwensen',
    },
    {
      value: 'vegetarian',
      label: 'Vegetariër',
    },
    {
      value: 'phone_number',
      label: 'Telefoonnummer',
    },
    {
      value: 'birthday',
      label: 'Geboortedatum',
    },
    {
      value: 'picture_publication_preference',
      label: 'Mediabeleid voorkeur',
    },
    {
      value: 'info_in_almanak',
      label: 'Info in Almanak?',
    },
    {
      value: 'almanak_subscription_preference',
      label: 'Almanak voorkeur',
    },
    {
      value: 'digtus_subscription_preference',
      label: 'Digtus voorkeur',
    },
    {
      value: 'ifes_data_sharing_preference',
      label: 'IFES voorkeur',
    },
    {
      value: 'iban',
      label: 'IBAN',
    },
    {
      value: 'iban_holder',
      label: 'IBAN tenaamgestelde',
    },
    {
      value: 'emergency_contact',
      label: 'Noodcontact',
    },
    {
      value: 'emergency_number',
      label: 'Noodnummer',
    },
    {
      value: 'avatar_url',
      label: 'Profielfoto url',
    },
  ];

  @computed('questions.@each.answer')
  get questionAnswered() {
    return (
      this.questions.filter((q) => q.answer.length > 0).length ===
      this.questions.length
    );
  }

  @computed('userPropertyOptions.@each.isChecked')
  get checkedFieldsValid() {
    return this.userPropertyOptions.filter((p) => p.isChecked).length > 0;
  }

  get valid() {
    return this.questionAnswered && this.checkedFieldsValid;
  }

  get exportButtonDisabled() {
    return !this.valid;
  }

  @action
  async exportUsers() {
    const selectedProperties = A();
    this.userPropertyOptions.forEach((property) => {
      if (property.isChecked) {
        selectedProperties.push(property.value);
      }
    });
    const description = this.questions
      .map((question) => `${question.question}\n ${question.answer}\n\n`)
      .join('\n');

    const response = await this.fetch.fetch(
      `/groups/${this.model.get(
        'id'
      )}/export?user_attrs=${selectedProperties.join(
        ','
      )}&description=${encodeURI(description)}`,
      { dataType: 'text' }
    );
    const blob = await response.blob();
    this.fileSaver.saveFileAs(
      `${this.model.get('name')}-${new Date().toJSON()}.csv`,
      blob,
      'application/csv'
    );
    this.transitionToRoute('groups.group', this.model);
  }
}
