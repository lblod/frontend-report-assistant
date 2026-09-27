import EmberRouter from '@embroider/router';
import config from 'frontend-report-assistant/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('mock-login');
  this.route('authorization-callback', { path: '/authorization/callback' });
  this.route('conversations');
  this.route('conversation', { path: '/conversations/:id' });
  this.route('route-not-found', { path: '/*wildcard' });
});
