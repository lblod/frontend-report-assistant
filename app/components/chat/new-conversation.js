import Component from '@glimmer/component';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class ChatNewConversation extends Component {
  @service store;
  @service router;
  @service currentSession;

  create = task(async () => {
    const now = new Date();
    const conversation = this.store.createRecord('chat-conversation', {
      created: now,
      lastActivity: now,
      creator: this.currentSession.user,
    });
    await conversation.save();
    await this.router.transitionTo(
      'conversations.conversation',
      conversation.id,
    );
    // The sidebar shows the list the conversations route loaded; load it
    // again so the new conversation is in it.
    this.router.refresh('conversations');
  });
}
