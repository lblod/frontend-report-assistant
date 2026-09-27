import DOMPurify from 'dompurify';
import MarkdownIt from 'markdown-it';

// The text comes from an LLM. html: false drops raw html in the source;
// DOMPurify is the second layer.
const md = new MarkdownIt({ html: false, linkify: true, breaks: true });

// Links open in a new tab, so the conversation stays open. DOMPurify drops a
// target it did not set, hence the hook. rel keeps the opened page away from
// this tab (window.opener).
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

export function renderMarkdown(text) {
  return DOMPurify.sanitize(md.render(text || ''));
}
