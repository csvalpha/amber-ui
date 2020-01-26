## Module Report
### Unknown Global

**Global**: `Ember.String`

**Location**: `app/serializers/application.js` at line 7

```js

const {
  Logger, String
} = Ember;

```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/serializers/application.js` at line 7

```js

const {
  Logger, String
} = Ember;

```

### Unknown Global

**Global**: `Ember.testing`

**Location**: `app/components/tools/board-room-presence.js` at line 30

```js
  poll: task(function* () {
    // eslint-disable-next-line ember-suave/no-direct-property-access
    while (!Ember.testing) {
      this.fetchData.perform();
      yield timeout(1000 * 30); // Wait 30 seconds
```
