import EmberRouter from '@ember/routing/router';
import config from 'amber-ui/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;

  constructor() {
    super(...arguments);

    this.on('routeDidChange', () => {
      if (!config.googleAnalytics) {
        return;
      }

      if (typeof gtag === 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };

        window.gtag('js', new Date());
      }

      /* eslint-disable camelcase */
      window.gtag('config', config.googleAnalytics.webPropertyId, {
        page_path: this.url,
      });
      /* eslint-enable camelcase */
    });
  }
}

Router.map(function () {
  this.route('oauth', function () {
    this.route('authorize');
  });

  this.route('login');

  this.route('profile');

  this.route('static-pages', function () {
    this.route('new');

    this.route('static-page', { path: ':id' }, function () {
      this.route('edit');
      this.route('destroy');
    });
  });

  this.route('quickpost');

  this.route('forum', function () {
    this.route('categories', function () {
      this.route('new');

      this.route('category', { path: ':category_id' }, function () {
        this.route('edit');
        this.route('destroy');

        this.route('threads', function () {
          this.route('new');

          this.route('thread', { path: ':thread_id' }, function () {
            this.route('edit');
            this.route('destroy');

            this.route('posts', function () {
              this.route('post', { path: ':post_id' }, function () {
                this.route('edit');
                this.route('destroy');
              });
            });
          });
        });
      });
    });
  });

  this.route('photo-albums', function () {
    this.route('new');

    this.route('photo-album', { path: ':photo_album_id' }, function () {
      this.route('edit');
      this.route('destroy');

      this.route('photos', function () {
        this.route('photo', { path: ':photo_id' }, function () {
          this.route('destroy');
        });
      });
    });
  });

  this.route('photo-comments', function () {
    this.route('photo-comment', { path: ':id' }, function () {
      this.route('destroy');
    });
  });

  this.route('users', function () {
    this.route('new');

    this.route('forgot-password');
    this.route('members');
    this.route('webdav');

    this.route('user', { path: ':id' }, function () {
      this.route('edit', function () {
        this.route('permissions');
        this.route('privacy');
        this.route('security');
      });
      this.route('destroy');

      this.route('groups');
      this.route('mail');
      this.route('mandates');
      this.route('permissions');
      this.route('settings');

      this.route('activate-account');
      this.route('resend-activation-code');
    });

    this.route('batch', function () {
      this.route('new');
    });
  });

  this.route('articles', function () {
    this.route('new');

    this.route('article', { path: ':id' }, function () {
      this.route('edit');
      this.route('destroy');
    });
  });

  this.route('article-comments', function () {
    this.route('article-comment', { path: ':id' }, function () {
      this.route('destroy');
    });
  });

  this.route('polls', function () {
    this.route('new');
    this.route('edit', { path: '/:id/edit' });
    this.route('show', { path: '/:id' });
    this.route('destroy', { path: '/:id/destroy' });
  });

  this.route('mail-aliases', function () {
    this.route('new');
    this.route('edit', { path: '/:id/edit' });
    this.route('show', { path: '/:id' });
    this.route('destroy', { path: '/:id/destroy' });
  });

  this.route('mail-moderations', function () {
    this.route('show', { path: '/:id' });
    this.route('destroy', { path: '/:id/destroy' });
    this.route('accept', { path: '/:id/accept' });
    this.route('reject', { path: '/:id/reject' });
  });

  this.route('activities', function () {
    this.route('new');

    this.route('ical');

    this.route('activity', { path: ':id' }, function () {
      this.route('edit');
      this.route('destroy');

      this.route('generate-alias');
      this.route('print-enrolled');
    });
  });

  this.route('debit', function () {
    this.route('collections', function () {
      this.route('new');

      this.route('collection', { path: ':id' }, function () {
        this.route('edit');
        this.route('destroy');

        this.route('sepa');
      });
    });

    this.route('mandates', function () {
      this.route('new');

      this.route('mandate', { path: ':id' }, function () {
        this.route('edit');
      });
    });

    this.route('transactions', function () {
      this.route('transaction', { path: ':id' }, function () {
        this.route('edit');
        this.route('destroy');
      });
    });
  });

  this.route('form', function () {
    this.route('responses', function () {
      this.route('destroy', { path: '/:id/destroy' });
    });
  });

  this.route('groups', function () {
    this.route('new');

    this.route('group', { path: ':id' }, function () {
      this.route('edit');

      this.route('export');
    });
  });

  this.route('sog', function () {
    this.route('name-trainer');
  });

  this.route('books', function () {
    this.route('new');

    this.route('book', { path: ':id' }, function () {
      this.route('edit');
      this.route('destroy');
    });
  });

  this.route('sponsorkliks');

  this.route('404-page-not-found', { path: '/*path' });

  this.route('418-im-a-teapot', { path: '/coffee' });

  this.route('vacancies', function () {
    this.route('show', { path: '/:id' });
    this.route('new');
    this.route('edit', { path: '/:id/edit' });
    this.route('destroy', { path: '/:id/destroy' });
  });

  return true;
});
