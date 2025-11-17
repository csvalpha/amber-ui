const CoverPhotoFallback = '/images/fallback/coverphoto_default.jpg';
const AvatarFallback = '/images/fallback/avatar_default.png';
const AvatarThumbFallback = '/images/fallback/avatar_thumb_default.png';

const GroupKinds = [
  'bestuur',
  'commissie',
  'dispuut',
  'genootschap',
  'groep',
  'huis',
  'kiemgroep',
  'lichting',
  'kring',
  'werkgroep',
  'curiositas',
  'zal',
];

const StaticPageCategories = ['vereniging', 'documenten', 'ict'];

const ActivityCategories = [
  'Algemeen',
  'Sociëteit',
  'Vorming',
  'Kring',
  'ChOOSE',
  'IFES',
  'OZON',
  'Disputen',
  'Genootschapen',
  'Huizen',
  'Extern',
  'Eerstejaars',
];

const OpenQuestionTypes = ['text', 'textarea', 'number'];

const ClosedQuestionTypes = ['radio', 'checkbox'];

const MailAliasModerationTypes = ['open', 'semi_moderated', 'moderated'];

/* eslint camelcase: "off" */
const PicturePublicationPreferenceTypes = {
  always_publish: 'Publiceren altijd toegestaan',
  always_ask: 'Altijd toestemming vragen voor publiceren',
  never_publish: 'Publiceren nooit toegestaan',
};

const UserDetailsPreferenceTypes = {
  hidden: 'Verbergen voor iedereen',
  members_only: 'Alleen delen met leden',
  all_users: 'Delen met leden en oudleden',
};

const DigtusSubscriptionPreferenceTypes = {
  no_subscription: 'Geen Digtus',
  digital: 'Digitale uitgave van de Digtus',
  physical: 'Papieren uitgave van de Digtus',
};

const AlmanakSubscriptionPreferenceTypes = {
  no_subscription: 'Geen Almanak',
  digital: 'Digitale uitgave van de Almanak',
  physical: 'Papieren uitgave van de Almanak',
};

export {
  CoverPhotoFallback,
  AvatarFallback,
  AvatarThumbFallback,
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
};
