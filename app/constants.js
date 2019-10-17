const GroupKinds = [
  'bestuur',
  'commissie',
  'dispuut',
  'genootschap',
  'groep',
  'huis',
  'jaargroep',
  'lichting',
  'kring',
  'werkgroep'
];

const StaticPageCategories = [
  'vereniging',
  'documenten',
  'ict'
];

const ActivityCategories = [
  'Algemeen',
  'Sociëteit',
  'Vorming',
  'Dinsdagkring',
  'Woensdagkring',
  'ChOOSE',
  'IFES',
  'OZON',
  'Disputen',
  'Jaargroepen',
  'Huizen',
  'Extern',
  'Eerstejaars'
];

const OpenQuestionTypes = [
  'text',
  'textarea',
  'number'
];

const ClosedQuestionTypes = [
  'radio',
  'checkbox'
];

const MailAliasModerationTypes = [
  'open',
  'semi_moderated',
  'moderated'
];

/* eslint camelcase: "off" */
const PicturePublicationPreferenceTypes = {
  always_publish: 'Publiceren altijd toegestaan',
  always_ask: 'Altijd toestemming vragen voor publiceren',
  never_publish: 'Publiceren nooit toegestaan'
};

const UserDetailsPreferenceTypes = {
  hidden: 'Verbergen voor iedereen',
  members_only: 'Alleen delen met leden',
  all_users: 'Delen met leden en oudleden'
};

const DigtusSubscriptionPreferenceTypes = {
  no_subscription: 'Geen Digtus',
  digital: 'Digitale uitgave van de Digtus',
  physical: 'Papieren uitgave van de Digtus'
};

const AlmanakSubscriptionPreferenceTypes = {
  no_subscription: 'Geen Almanak',
  digital: 'Digitale uitgave van de Almanak',
  physical: 'Papieren uitgave van de Almanak'
};

const SuggestedEmojis = [
  '😀', '😁', '😂', '😊', '😋', '😎', '😘', '😍', '🤔', '🙄', '😏', '🤓', '😲', '😭', '😡', '😇', '👍', '👎',
  '🙈', '☕', '🍻', '⛪', '⛵', '☀', '🎈', '🎉', '🏆', '⚽', '🎮', '✅', '❌', '🐨', '🍭', '🍌', '💩'
];

export {
  GroupKinds,
  StaticPageCategories,
  ActivityCategories,
  OpenQuestionTypes,
  ClosedQuestionTypes,
  MailAliasModerationTypes,
  PicturePublicationPreferenceTypes,
  UserDetailsPreferenceTypes,
  DigtusSubscriptionPreferenceTypes,
  AlmanakSubscriptionPreferenceTypes,
  SuggestedEmojis
};
