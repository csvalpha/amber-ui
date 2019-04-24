import Controller from '@ember/controller';
import GroupMembershipsMixin from 'alpha-amber/mixins/group-memberships-mixin';

export default Controller.extend(GroupMembershipsMixin, {
  filterableAttributes: [
    'user.username',
    'user.fullName',
    'function'
  ],
  sortableAttributes: [
    {
      value: 'user.firstName',
      label: 'Voornaam'
    },
    {
      value: 'user.lastName',
      label: 'Achternaam'
    },
    {
      value: 'startDate',
      label: 'Lid sinds'
    }
  ],
  sortedAttribute: 'user.firstName'
});
