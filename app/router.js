import EmberRouter from '@embroider/router';
import config from 'frontend-report-assistant/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('mock-login');
  this.route('auth', { path: '/authorization' }, function () {
    this.route('callback');
    this.route('login');
  });
  this.route('conversations', function () {
    this.route('conversation', { path: '/:id' });
  });
  this.route('route-not-found', { path: '/*wildcard' });
});
