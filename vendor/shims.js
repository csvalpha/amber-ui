(function() {
  /* globals define, MessageBus */
  define('message-bus', [], function() {
    'use strict';

    return { default: MessageBus.noConflict() };
  });
})();
