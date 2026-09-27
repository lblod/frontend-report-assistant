import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ChatSidebar extends Component {
  @service router;

  // Not a destroyRecord: the service also removes the messages, the bijlagen
  // and the reports.
  @action
  async delete(conversation) {
    if (!window.confirm('Dit gesprek verwijderen?')) return;
    const res = await fetch(`/assistant/conversations/${conversation.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      window.alert('Het gesprek kon niet verwijderd worden.');
      return;
    }
    // Leave the open conversation before its route 404s.
    if (this.router.isActive('conversations.conversation', conversation.id)) {
      await this.router.transitionTo('conversations');
    }
    this.router.refresh('conversations');
  }
}
