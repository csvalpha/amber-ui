import { youtubeRegex } from 'alpha-amber/initializers/register-showdown-extensions';
import { module, test } from 'qunit';

module('Unit | Helper | youtube regex', function() {
  const youtubeUrl = '$(https://www.youtube.com/watch?v=Sr0g_A00Vvo)';
  const youtubeID = 'Sr0g_A00Vvo';

  const nonYoutubeUrl = '$(https://forms.gle/PQRjWdhdg6fWDxQd9)';
  const linkUrl = '[link](https://www.youtube.com/watch?v=Sr0g_A00Vvo)';

  test('youtube is recognized', (assert) => {
    assert.equal(youtubeRegex.exec(youtubeUrl)[3], youtubeID);
  });

  test('non youtube is not recognized', (assert) => {
    assert.equal(youtubeRegex.exec(nonYoutubeUrl), null);
  });

  test('link to youtube is not recognized', (assert) => {
    assert.equal(youtubeRegex.exec(linkUrl), null);
  });
});
