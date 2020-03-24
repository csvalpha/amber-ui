import { A } from '@ember/array';

export default function(server) {
  // Permissions and user
  const resourceNames = new A([
    'user',
    'activity',
    'article',
    'article_comment',
    'board_room_presence',
    'group',
    'membership',
    'photo_album',
    'photo',
    'photo_comment',
    'quickpost_message',
    'forum/category',
    'forum/thread',
    'forum/post',
    'form/form',
    'form/response',
    'form/closed_question',
    'form/closed_question_option',
    'form/open_question',
    'form/closed_question_answer',
    'form/open_question_answer',
    'permissions_users',
    'groups_permissions',
    'static_page'
  ]);
  const actions = new A(['create', 'read', 'update', 'destroy']);

  const permissions = [];
  resourceNames.forEach(resource => {
    actions.forEach(action => {
      permissions.push(server.create('permission', { name: `${resource}.${action}` }));
    });
  });

  server.create('user', { permissions });

  // Content
  server.createList('activity', 5);
  server.createList('activity', 5, 'withForm');
  server.createList('article', 5);
  server.createList('group', 5, 'withMembers');
  server.createList('forum-category', 5, 'withThreads');
  server.createList('quickpost-message', 10);
}
