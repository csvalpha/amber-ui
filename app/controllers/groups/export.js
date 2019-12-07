import {inject as service} from '@ember/service';
import Controller from '@ember/controller';
import {computed} from '@ember/object';
import {notEmpty, and, not} from '@ember/object/computed';
import {A} from '@ember/array';

import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Controller.extend(FileSaverMixin, {
  ajax: service(),
  questions: [
    {question: 'Wat moet je doen dat je zonder deze data niet kan?', answer: ''},
    {question: 'Wie gaat er bij de data kunnen?', answer: ''},
    {question: 'Waar gaat de data worden opgeslagen?', answer: ''},
    {question: 'Wanneer gaat de data verwijderd worden?', answer: ''}
  ],
  error: '',
  userPropertyOptions: [
    {
      value: 'id',
      label: 'ID'
    },
    {
      value: 'username',
      label: 'Gebruikersnaam'
    },
    {
      value: 'first_name',
      label: 'Voornaam'
    }, {
      value: 'last_name_prefix',
      label: 'Tussenvoegsel'
    }, {
      value: 'last_name',
      label: 'Achternaam'
    }, {
      value: 'full_name',
      label: 'Volledige naam'
    }, {
      value: 'email',
      label: 'Email'
    }, {
      value: 'study',
      label: 'Studie'
    }, {
      value: 'startStudy',
      label: 'Start studie'
    }, {
      value: 'address',
      label: 'Adres'
    }, {
      value: 'postcode',
      label: 'Postcode'
    }, {
      value: 'city',
      label: 'Stad'
    }, {
      value: 'foodPreferences',
      label: 'Dieetwensen'
    }, {
      value: 'vegetarian',
      label: 'Vegetariër'
    }, {
      value: 'phone_number',
      label: 'Telefoonnummer'
    }, {
      value: 'birthday',
      label: 'Geboortedatum'
    }, {
      value: 'picture_publication_preference',
      label: 'Mediabeleid voorkeur'
    }, {
      value: 'info_in_almanak',
      label: 'Info in Almanak?'
    }, {
      value: 'almanak_subscription_preference',
      label: 'Almanak voorkeur'
    }, {
      value: 'digtus_subscription_preference',
      label: 'Digtus voorkeur'
    }, {
      value: 'ifes_data_sharing_preference',
      label: 'IFES voorkeur'
    }, {
      value: 'iban',
      label: 'IBAN'
    }, {
      value: 'iban_holder',
      label: 'IBAN tenaamgestelde'
    }, {
      value: 'emergency_contact',
      label: 'Noodcontact'
    }, {
      value: 'emergency_number',
      label: 'Noodnummer'
    }, {
      value: 'avatar_url',
      label: 'Profielfoto url'
    }
  ],
  questionAnswered: computed('questions.@each.answer', function () {
    return this.questions.filter(q => q.answer.length > 0).length > 0;
  }),
  checkedFieldsValid: computed('userPropertyOptions.@each.isChecked', function () {
    return this.userPropertyOptions.filter(p => p.isChecked).length > 0;
  }),
  valid: and('questionAnswered', 'checkedFieldsValid'),
  exportButtonDisabled: not('valid'),

  actions: {
    exportUsers() {
      const selectedProperties = new A();
      this.userPropertyOptions.forEach((property) => {
        if (property.isChecked) {
          selectedProperties.push(property.value);
        }
      });
      const description = this.questions.map((question) => {
        return `${question.question}\n ${question.answer}\n\n`
      }).join('\n');
      this.ajax.request(
        `/groups/${this.model.get('id')}/export?user_attrs=${selectedProperties.join(',')}&description=${encodeURI(description)}`,
        {dataType: 'text'}
      ).then(csvResponse => {
        this.saveFileAs(`${this.model.get('name')}-${new Date().toJSON()}.csv`, csvResponse, 'application/csv');
        return this.transitionToRoute('groups.show', this.model);
      }, null);
    }
  }
});
