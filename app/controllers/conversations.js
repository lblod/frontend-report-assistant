import Controller from '@ember/controller';

export default class ConversationsController extends Controller {
  queryParams = ['page'];
  page = 0;
}
