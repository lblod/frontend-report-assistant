## v0.2.0 (2026-09-27)

#### :rocket: Enhancement
- The sidebar pages through the conversations, newest first.

#### :bug: Bugfix
- Adapter requests are retried only on server errors and lost connections, not on 4xx answers.
- The user is loaded before the first page shows, so a new conversation always has its creator.
- A login route sends the user to ACM/IDM, or to mock login when ACM/IDM is not set up.
- The index route replaces instead of transitions, so Back does not bounce back to /conversations.
- A failed conversation reload after sending a question shows an error, instead of silently stopping the poll.
- The bijlagen alert in an answer has a real link button to the bijlagen panel.

#### :house: Internal
- Route and component cleanup: the conversation route under conversations/, one message component, no dead models, helpers or utils.

#### :memo: Documentation
- README updated.

## v0.1.0 (2026-09-27)

#### :rocket: Enhancement
- initial release
- Chat UI for the report assistant: conversations, messages, CSV attachments and the sidebar.
