// eslint-disable-next-line max-statements
export default function() {
  this.namespace = '/api/v1';

  this.post('/oauth/token', (schema, request) => {
    const body = {};
    request.requestBody.split('&').forEach(keyValue => {
      const parts = keyValue.split('=');
      body[parts[0]] = parts[1];
    });

    /* eslint-disable camelcase */
    return {
      access_token: 'e9eea4d996f1b22d7a770f4ee9651e3a2d3d84b232c22a9f6705ab24633b478c',
      created_at: 123456789,
      expires_in: 7200,
      token_type: 'bearer'
    };
    /* eslint-enable camelcase */
  }, 200);

  this.resource('articles');
  this.resource('article_comments');
  this.resource('activities');
  this.resource('daily_verse');
  this.resource('groups');
  this.resource('quickpost_messages');
  this.resource('board_room_presences');
  this.resource('photo_albums');
  this.resource('photo_comments');
  this.resource('photos');
  this.resource('static_pages');
  this.resource('users');
  this.resource('permissions');
  this.resource('memberships');

  this.get('/users', (schema, request) => {
    if (request.queryParams['filter[me]']) {
      // Return an array containing only user with id 1
      return schema.users.find([1]);
    }
    return schema.users.all();
  });

  this.get('/form/forms', 'form-form');
  this.get('/form/forms/:id', 'form-form');
  this.post('/form/forms', 'form-form');
  this.patch('/form/forms/:id', 'form-form');

  this.get('/form/closed_questions', 'form-closed-question');
  this.get('/form/closed_questions/:id', 'form-closed-question');
  this.post('/form/closed_questions', 'form-closed-question');
  this.patch('/form/closed_questions/:id', 'form-closed-question');

  this.get('/form/open_questions', 'form-open-question');
  this.get('/form/open_questions/:id', 'form-open-question');
  this.post('/form/open_questions', 'form-open-question');
  this.patch('/form/open_questions/:id', 'form-open-question');

  this.get('/form/closed_question_options', 'form-closed-question-option');
  this.get('/form/closed_questions_options/:id', 'form-closed-question-option');
  this.post('/form/closed_questions_options', 'form-closed-question-option');
  this.patch('/form/closed_questions_options/:id', 'form-closed-question-option');

  this.get('/form/responses', 'form-response');
  this.get('/form/responses/:id', 'form-response');
  this.post('/form/responses', 'form-response');
  this.put('/form/responses/:id', 'form-response');

  this.get('/form/open_question_answers', 'form-open-question-answer');
  this.get('/form/open_question_answers/:id', 'form-open-question-answer');
  this.post('/form/open_question_answers', 'form-open-question-answer');
  this.put('/form/open_question_answers/:id', 'form-open-question-answer');

  this.get('/form/closed_question_answers', 'form-closed-question-answer');
  this.get('/form/closed_question_answers/:id', 'form-closed-question-answer');
  this.post('/form/closed_question_answers', 'form-closed-question-answer');
  this.put('/form/closed_question_answers/:id', 'form-closed-question-answer');

  this.get('/forum/categories', 'forum-category');
  this.get('/forum/categories/:id', 'forum-category');
  this.post('/forum/categories', 'forum-category');
  this.patch('/forum/categories/:id', 'forum-category');

  this.get('/forum/threads', 'forum-thread');
  this.get('/forum/threads/:id', 'forum-thread');
  this.post('/forum/threads', 'forum-thread');
  this.patch('/forum/threads/:id', 'forum-thread');

  this.get('/forum/posts', ({ forumPosts }, { queryParams }) => {
    const filterThreadId = queryParams['filter[thread_id]'];
    if (filterThreadId) {
      return forumPosts.where(forumPost => forumPost.threadId === filterThreadId);
    }
    return forumPosts.all();
  });
  this.post('/forum/posts', 'forum-post');
  this.patch('/forum/posts/:id', 'forum-post');
}
