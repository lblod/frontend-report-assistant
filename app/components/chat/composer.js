import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ChatComposer extends Component {
  @tracked draft = '';

  @action update(event) {
    this.draft = event.target.value;
  }

  @action keydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submit();
    }
  }

  @action submit() {
    const content = this.draft.trim();
    if (!content || this.args.disabled) return;
    this.args.onSend(content);
    this.draft = '';
  }
}
