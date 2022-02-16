import Component from '@ember/component';
import { action, set } from '@ember/object';

export default class MdEditorToolbarComponent extends Component {
  modalOpen = false;
  modalOption = null;
  modalInput = null;

  @action
  toggleEditMode() {
    this.toggleProperty('editMode');
  }

  @action
  openModal(option) {
    set(this, 'modalOpen', true);
    set(this, 'modalOption', option);
  }

  @action
  submitModal() {
    this.applyStyleOption(this.modalOption, this.modalInput);
    set(this, 'modalOpen', false);
    set(this, 'modalInput', null);
  }

  styleOptions = {
    groups: [
      {
        name: 'Stijl',
        dropdown: true,
        faIconName: 'wand-magic-sparkles',
        options: [
          {
            name: 'Titel 1',
            format: '# $1',
            faIconName: 'heading',
            size: '2x',
          },
          {
            name: 'Titel 2',
            format: '## $1',
            faIconName: 'heading',
            size: 'lg',
          },
          {
            name: 'Titel 3',
            format: '### $1',
            faIconName: 'heading',
            size: 'sm',
          },
        ],
      },
      {
        name: 'Nadruk',
        dropdown: false,
        options: [
          {
            name: 'Vet',
            format: '__$1__',
            faIconName: 'bold',
          },
          {
            name: 'Schuingedrukt',
            format: '*$1*',
            faIconName: 'italic',
          },
          {
            name: 'Doorgestreept',
            format: '~~$1~~',
            faIconName: 'strikethrough',
          },
        ],
      },
      {
        name: 'Lijsten',
        dropdown: false,
        options: [
          {
            name: 'Ongesorteerde lijst',
            format: '+ $1',
            faIconName: 'list-ul',
          },
          {
            name: 'Gesorteerde lijst',
            format: '1. $1',
            faIconName: 'list-ol',
          },
        ],
      },
      {
        name: 'Invoegen',
        dropdown: false,
        options: [
          {
            name: 'Link invoegen',
            format: '[$1]($2)',
            faIconName: 'link',
            modal: {
              question: 'Naar welke URL moet deze link gaan?',
            },
          },
          {
            name: 'Afbeelding invoegen',
            format: '![$1]($2)',
            faIconName: 'image',
            modal: {
              question:
                'Wat is de URL van de afbeelding? Momenteel worden alleen afbeeldingen van externe hosters ondersteund. Gebruik bijvoorbeeld Imgur, Giphy of een andere service.',
            },
          },
          {
            name: 'Youtube filmpje invoegen',
            format: '$($2)\n',
            faIconName: 'youtube',
            faIconPrefix: 'fab',
            modal: {
              question:
                'Wat is de Youtube url van het filmpje? Bijvoorbeeld https://www.youtube.com/watch?v=-GLMBp6OxRY',
            },
          },
        ],
      },
    ],
  };
}
