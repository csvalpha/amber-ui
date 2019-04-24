import Component from '@ember/component';

export default Component.extend({
  openModalAction: () => {},
  applyStyleOptionAction: () => {},
  editMode: false,
  modalOpen: false,

  styleOptions: {
    groups: [
      {
        name: 'Stijl',
        dropdown: true,
        faIconName: 'magic',
        options: [
          {
            name: 'Titel 1',
            format: '# $1',
            faIconName: 'header',
            size: 3
          },
          {
            name: 'Titel 2',
            format: '## $1',
            faIconName: 'header',
            size: 2
          },
          {
            name: 'Titel 3',
            format: '### $1',
            faIconName: 'header',
            size: 'lg'
          }
        ]
      },
      {
        name: 'Nadruk',
        dropdown: false,
        options: [
          {
            name: 'Vet',
            format: '__$1__',
            faIconName: 'bold'
          },
          {
            name: 'Schuingedrukt',
            format: '*$1*',
            faIconName: 'italic'
          },
          {
            name: 'Doorgestreept',
            format: '~~$1~~',
            faIconName: 'strikethrough'
          }
        ]
      },
      {
        name: 'Lijsten',
        dropdown: false,
        options: [
          {
            name: 'Ongesorteerde lijst',
            format: '+ $1',
            faIconName: 'list-ul'
          },
          {
            name: 'Gesorteerde lijst',
            format: '1. $1',
            faIconName: 'list-ol'
          }
        ]
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
              question: 'Naar welke URL moet deze link gaan?'
            }
          },
          {
            name: 'Afbeelding invoegen',
            format: '![$1]($2)',
            faIconName: 'photo',
            modal: {
              question: 'Wat is de URL van de afbeelding? Momenteel worden alleen afbeeldingen van externe hosters ondersteund. Gebruik bijvoorbeeld Imgur, Giphy of een andere service.'
            }
          },
          {
            name: 'Youtube filmpje invoegen',
            format: '$($2)\n',
            faIconName: 'youtube',
            modal: {
              question: 'Wat is de Youtube url van het filmpje? Bijvoorbeeld https://www.youtube.com/watch?v=-GLMBp6OxRY'
            }
          }
        ]
      }
    ]
  },
  actions: {
    toggleEditMode() {
      this.toggleProperty('editMode');
    }
  }
});
