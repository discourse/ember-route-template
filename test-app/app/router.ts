import EmberRouter from '@ember/routing/router';
import config from 'test-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('hbs-template-works');
  this.route('gjs-template-works');
  this.route('gts-template-works');
  this.route('model-works', { path: 'model-works/:id' });
  this.route('controller-works', { path: 'controller-works/:id' });
  this.route('component-works', { path: 'component-works/:id' });
});
