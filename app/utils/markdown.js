// Assistant messages are markdown. markdown-it renders, DOMPurify strips
// what should not reach the DOM (html: false already drops raw html in the
// source; sanitize is the second layer), and every link it leaves opens in
// a new tab.
//
// The spec is hidden behind a "Technische details" disclosure (task 10): a
// ```turtle (or any other language-tagged) block becomes
// <details class="chat-md__spec"> instead of a plain code block.

import DOMPurify from 'dompurify';
import MarkdownIt from 'markdown-it';

// Every link opens in a new tab (task 10 subtask 1). DOMPurify drops a
// target it did not set, so the attribute is added on sanitized output in
// the hook; rel protects any opened page from switching this tab's
// location (window.opener attacks).
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

const SPEC_LABEL = 'Technische details';
const QUERIES_LABEL = 'De SPARQL-query\'s die het rapport ophaalt';
const QUERIES_CLASS = 'chat-md__spec-queries';

const md = new MarkdownIt({ html: false, linkify: true, breaks: true });

// One renderer for both fenced and indented code: the class hooks the spec
// styles and keeps every block consistent. Indented blocks have no language,
// and an indented spec is not shown as technical details.
md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const lang = token.info.trim();
  if (!lang) return codeBlock(token.content);
  if (lang === 'sparql') return queriesBlock(token.content);
  return specBlock(token.content);
};
md.renderer.rules.code_block = (tokens, idx) => codeBlock(tokens[idx].content);

function codeBlock(content) {
  return `<pre><code class="chat-md__code">${md.utils.escapeHtml(
    content,
  )}</code></pre>\n`;
}

function specBlock(content) {
  return `<details class="chat-md__spec"><summary>${SPEC_LABEL}</summary>` +
    `<pre><code class="chat-md__code">${md.utils.escapeHtml(
      content,
    )}</code></pre></details>\n`;
}

// The SPARQL translation of the spec (task 10 subtask 4). Rendered first as
// a marker div after the details; renderMarkdown() then moves it inside the
// preceding details block, so spec and queries stay in one disclosure.
function queriesBlock(content) {
  return `<div class="${QUERIES_CLASS}"><p class="chat-md__queries-label">${QUERIES_LABEL}</p>` +
    `<pre><code class="chat-md__code">${md.utils.escapeHtml(
      content,
    )}</code></pre></div>\n`;
}

export function renderMarkdown(text) {
  let html = md.render(String(text ?? ''));
  // A ```sparql block that follows the spec disclosure joins it: the div is
  // moved inside <details>, before its closing tag. html: false means the
  // only details in the output are the ones this renderer emits, so the
  // match is unambiguous.
  html = html.replace(
    /<\/details>\s*(<div class="chat-md__spec-queries">[\s\S]*?<\/div>)/,
    '$1</details>\n',
  );
  return DOMPurify.sanitize(html);
}