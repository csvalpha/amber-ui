import EmberRouter from '@ember/routing/router';
import RouterScroll from 'ember-router-scroll';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

const AppRouter = EmberRouter.extend(googlePageview, RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL
});

AppRouter.map(function() {
  this.route('oauth', function() {
    this.route('authorize');
  });

  this.route('login');

  this.route('lustrum');

  this.route('profile');

  this.route('static-pages', function() {
    this.route('show', { path: '/:id' });
    this.route('new');
    this.route('edit', { path: '/:id/edit' });
    this.route('destroy', { path: '/:id/destroy' });
  });

  this.route('quickpost');

  this.route('forum', function() {
    this.route('categories', function() {
      this.route('new');

      this.route('category', { path: ':category_id' }, function() {
        this.route('show', { path: '/' });
        this.route('edit');
        this.route('destroy');

        this.route('threads', { path: '/threads' }, function() {
          this.route('new');

          this.route('thread', { path: ':thread_id' }, function() {
            this.route('show', { path: '/' });
            this.route('edit');
            this.route('destroy');

            this.route('posts', function() {
              this.route('edit', { path: ':post_id/edit' });
              this.route('destroy', { path: ':post_id/destroy' });
            });
          });
        });
      });
    });
  });

  this.route('photo-albums', function() {
    this.route('new');

    this.route('photo-album', { path: ':photo_album_id' }, function() {
      this.route('show', { path: '/' });
      this.route('edit');
      this.route('destroy');

      this.route('photos', { path: '/photos' }, function() {
        this.route('show', { path: '/:photo_id' });
        this.route('destroy', { path: '/:photo_id/destroy' });
      });
    });
  });

  this.route('photo-comments', function() {
    this.route('destroy', { path: '/:id/destroy' });
  });

  this.route('users', function() {
    this.route('members');

    this.route('new');
    this.route('edit', { path: '/:id/edit' });
    this.route('edit-permissions', { path: '/:id/edit/permissions' });
    this.route('edit-privacy', { path: '/:id/edit/privacy' });
    this.route('edit-security', { path: '/:id/edit/security' });
    this.route('show', { path: '/:id' });
    this.route('show-groups', { path: '/:id/groups' });
    this.route('show-settings', { path: '/:id/settings' });
    this.route('show-mail', { path: '/:id/mail' });
    this.route('show-mandates', { path: '/:id/mandates' });
    this.route('show-permissions', { path: '/:id/permissions' });
    this.route('destroy', { path: '/:id/destroy' });

    this.route('webdav', { path: '/webdav' });

    this.route('forgot_password');
    this.route('activate_account', { path: '/:id/activate_account' });
    this.route('resend_activation', { path: '/:id/resend_activation' });

    this.route('batch', function() {
      this.route('new');
      this.route('confirm');
    });
  });

  this.route('articles', function() {
    this.route('new');
    this.route('edit', { path: '/:id/edit' });
    this.route('show', { path: '/:id' });
    this.route('destroy', { path: '/:id/destroy' });
  });

  this.route('article-comments', function() {
    this.route('destroy', { path: '/:id/destroy' });
  });

  this.route('polls', function() {
    this.route('new');
    this.route('edit', { path: '/:id/edit' });
    this.route('show', { path: '/:id' });
    this.route('destroy', { path: '/:id/destroy' });
  });

  this.route('mail-aliases', function() {
    this.route('new');
    this.route('edit', { path: '/:id/edit' });
    this.route('show', { path: '/:id' });
    this.route('destroy', { path: '/:id/destroy' });
  });

  this.route('mail-moderations', function() {
    this.route('show', { path: '/:id' });
    this.route('destroy', { path: '/:id/destroy' });
    this.route('accept', { path: '/:id/accept' });
    this.route('reject', { path: '/:id/reject' });
  });

  this.route('activities', function() {
    this.route('show', { path: '/:id' });
    this.route('ical', { path: '/ical' });
    this.route('new');
    this.route('edit', { path: '/:id/edit' });
    this.route('destroy', { path: '/:id/destroy' });
    this.route('mail-enrolled', { path: '/:id/mail-enrolled' });
    this.route('print-enrolled', { path: '/:id/print-enrolled' });
  });

  this.route('debit', function() {
    this.route('collections', function() {
      this.route('show', { path: '/:id' });
      this.route('sepa', { path: '/:id/sepa' });
      this.route('new');
      this.route('edit', { path: '/:id/edit' });
      this.route('destroy', { path: '/:id/destroy' });
    });

    this.route('transactions', function() {
      this.route('edit', { path: '/:id/edit' });
      this.route('destroy', { path: '/:id/destroy' });
    });

    this.route('mandates', function() {
      this.route('show', { path: '/:id' });
      this.route('new');
      this.route('edit', { path: '/:id/edit' });
    });
  });

  this.route('form', function() {
    this.route('responses', function() {
      this.route('destroy', { path: '/:id/destroy' });
    });
  });

  this.route('groups', function() {
    this.route('show', { path: '/:id' });
    this.route('export', { path: '/:id/export' });
    this.route('new');
    this.route('edit', { path: '/:id/edit' });
  });

  this.route('404-page-not-found', { path: '/*path' });

  this.route('418-im-a-teapot', { path: '/coffee' });

  this.route('sponsorkliks');

  return true;
});

export default AppRouter;
