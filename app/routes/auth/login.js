import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ENV from 'frontend-report-assistant/config/environment';
import buildUrlFromConfig from '@lblod/ember-acmidm-login/utils/build-url-from-config';

export default class AuthLoginRoute extends Route {
  @service router;
  @service session;

  beforeModel() {
    if (this.session.prohibitAuthentication('index')) {
      if (isAcmidmConfigured(ENV.acmidm)) {
        window.location.replace(buildUrlFromConfig(ENV.acmidm));
      } else {
        this.router.replaceWith('mock-login');
      }
    }
  }
}

// The static-file-service fills the {{PLACEHOLDER}} values at container
// start; one left unfilled means ACM/IDM is not set up here.
function isAcmidmConfigured(acmidm) {
  return Object.values(acmidm).every(
    (value) =>
      typeof value === 'string' &&
      value.trim() !== '' &&
      !value.startsWith('{{'),
  );
}
