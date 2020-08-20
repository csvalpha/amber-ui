import Mixin from '@ember/object/mixin';

export default Mixin.create({
  isOwner(user) {
    if (user.id === this.get('author.id')) {
      return true;
    }

    return user.get('memberships').then(() => {
      return user.get('currentMemberships').some(membership => membership.get('group.id') === this.group.id);
    });
  }
});
