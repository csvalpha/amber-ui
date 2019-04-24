import Application from '@ember/application';
import loadInitializers from 'ember-load-initializers';
import Resolver from './resolver';
import config from './config/environment';
import './models/custom-inflector-rules';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
