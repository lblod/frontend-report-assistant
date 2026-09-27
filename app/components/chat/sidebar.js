import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import ENV from 'frontend-lblod-chat/config/environment';
import { setting } from 'frontend-lblod-chat/utils/setting';

export default class ChatSidebar extends Component {
  @service store;
  @service router;
  assistantPath = setting(ENV.assistantPath, '/assistant');

  // The trash bin behind a conversation. The backend removes the messages,
  // the bijlagen and the reports with it.
  @action
  async delete(conversation) {
    if (!window.confirm('Dit gesprek verwijderen?')) return;
    const res = await fetch(
      `${this.assistantPath}/conversations/${conversation.id}`,
      { method: 'DELETE' },
    );
    if (!res.ok) {
      window.alert('Het gesprek kon niet verwijderd worden.');
      return;
    }
    this.store.unloadRecord(conversation);
    // The open conversation is gone; leave its route before it 404s. Any
    // other route only needs its sidebar list refreshed.
    if (this.args.currentConversation?.id === conversation.id) {
      this.router.transitionTo('conversations');
    } else {
      this.router.refresh();
    }
  }
}
