import Modifier from 'ember-modifier';

// Keeps the chat scrolled to the bottom: on insert, when another
// conversation is opened, and when the number of messages changes. The same
// conversation and count (e.g. a poll reload) leaves the scroll position
// alone, so reading history is not interrupted.
export default class ChatScrollBottom extends Modifier {
  lastKey = null;

  modify(element, positional) {
    const [id, count] = positional;
    const key = `${id}:${count}`;
    if (key === this.lastKey) return;
    this.lastKey = key;
    element.scrollTop = element.scrollHeight;
  }
}
