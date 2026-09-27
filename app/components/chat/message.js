import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { renderMarkdown } from 'frontend-report-assistant/utils/markdown';

export default class ChatMessage extends Component {
  @tracked showBijlagen = false;

  // renderMarkdown sanitizes; htmlSafe only stops Ember from escaping it.
  get html() {
    return htmlSafe(renderMarkdown(this.args.message.content));
  }

  @action
  openBijlagen() {
    this.showBijlagen = true;
  }

  @action
  showText() {
    this.showBijlagen = false;
  }
}
