import Route from '@ember/routing/route';
import { service } from '@ember/service';

// Admins pick a bestuur to act as. Each bestuur has a mock account
// (update-bestuurseenheid-mock-login); impersonating it gives the admin that
// bestuur's data, the same as in the loket.
export default class ImpersonateRoute extends Route {
  @service currentSession;
  @service router;
  @service session;
  @service store;

  queryParams = {
    gemeente: { refreshModel: true },
    page: { refreshModel: true },
  };

  beforeModel(transition) {
    if (!this.session.requireAuthentication(transition, 'login')) return;
    if (!this.currentSession.isAdmin) this.router.replaceWith('conversations');
  }

  model({ gemeente, page }) {
    const filter = { provider: 'https://github.com/lblod/mock-login-service' };
    if (gemeente) filter.gebruiker = { achternaam: gemeente };
    return this.store.query('account', {
      include: 'gebruiker.bestuurseenheden',
      filter,
      page: { size: 10, number: page },
      sort: 'gebruiker.achternaam',
    });
  }
}
