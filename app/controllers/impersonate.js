import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { restartableTask, task, timeout } from 'ember-concurrency';

export default class ImpersonateController extends Controller {
  @service impersonation;
  @service router;

  queryParams = ['gemeente', 'page'];
  @tracked gemeente = '';
  @tracked page = 0;
  size = 10;

  updateSearch = restartableTask(async (value) => {
    await timeout(500);
    this.page = 0;
    this.gemeente = value;
  });

  impersonate = task(async (accountId) => {
    await this.impersonation.impersonate(accountId);
    // A full reload: nothing of the admin's own session may stay in the store.
    window.location.href = this.router.urlFor('conversations');
  });
}
