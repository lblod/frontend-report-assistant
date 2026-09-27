import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task, restartableTask, timeout } from 'ember-concurrency';

const POLL_MS = 3000;
// Past this, the service is not coming back with an answer: stop polling
// and say so.
const ANSWER_CEILING_MS = 10 * 60 * 1000;

export default class ChatWindow extends Component {
  @service store;

  @tracked now = Date.now();

  constructor() {
    super(...arguments);
    this.poll.perform();
  }

  get messages() {
    return this.args.conversation.messages
      .slice()
      .sort((a, b) => a.created - b.created);
  }

  get last() {
    return this.messages.at(-1);
  }

  isAssistant = (message) => message.maker === this.args.assistant?.uri;

  age(date) {
    return this.now - date.getTime();
  }

  // The service answers after the 202: the newest message is the user's
  // until the answer is written.
  get waitingForAnswer() {
    return (
      !!this.last &&
      !this.isAssistant(this.last) &&
      this.age(this.last.created) < ANSWER_CEILING_MS
    );
  }

  get answerTimedOut() {
    return (
      !!this.last &&
      !this.isAssistant(this.last) &&
      this.age(this.last.created) >= ANSWER_CEILING_MS
    );
  }

  poll = restartableTask(async () => {
    while (this.waitingForAnswer) {
      await timeout(POLL_MS);
      await this.reload();
    }
  });

  async reload() {
    await this.store.findRecord(
      'chat-conversation',
      this.args.conversation.id,
      {
        reload: true,
        include: 'messages.attachments',
      },
    );
    this.now = Date.now();
  }

  send = task(async (content) => {
    const res = await fetch(
      `/assistant/conversations/${this.args.conversation.id}/turns`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ content }),
      },
    );
    if (!res.ok)
      throw new Error(`De vraag kon niet verstuurd worden (${res.status}).`);
    // The 202 answers with the message id, but fetching that message alone
    // does not link it into the conversation: the resource sends relationships
    // as links, without data. Reload the conversation instead, so the question
    // shows now and the poll loop sees it waits for an answer.
    try {
      await this.reload();
    } catch {
      // the poll loop retries the reload
    }
    this.poll.perform();
  });

  @action
  async refresh() {
    await this.reload();
    this.poll.perform();
  }
}
