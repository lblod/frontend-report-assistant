// The type is the ember-data model name, which is the SIOC class, which is
// rdf:type. No field exists whose only job is to say which component to draw.
// The assistant's messages are markdown; the user's own stay plain.
import InstantMessage from 'frontend-lblod-chat/components/chat/types/instant-message';
import AssistantMessage from 'frontend-lblod-chat/components/chat/types/assistant-message';

const TYPES = {
  'chat-instant-message': InstantMessage,
};

export function componentFor(modelName, isAssistant) {
  return isAssistant ? AssistantMessage : (TYPES[modelName] ?? InstantMessage);
}
