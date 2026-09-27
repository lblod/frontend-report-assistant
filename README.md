# frontend-report-assistant

Chat frontend for the report assistant. Work in progress, POC phase.

Users ask questions in Dutch and get a CSV report. The chat talks to the
assistant backend via the `/assistant` route of the app it is wired into.

## Environment variables

| Name                        | Description                            |
| --------------------------- | -------------------------------------- |
| `EMBER_ACMIDM_CLIENT_ID`    | ACM/IDM client id for the environment. |
| `EMBER_ACMIDM_BASE_URL`     | ACM/IDM authorisation base URL.        |
| `EMBER_ACMIDM_REDIRECT_URL` | Callback URL ACM/IDM uses after login. |
| `EMBER_ACMIDM_LOGOUT_URL`   | URL users go to when they log out.     |
| `EMBER_ACMIDM_SCOPE`        | Scope the ACM/IDM client asks for.     |

Without the ACM/IDM variables the app uses mock login.

## Pair it with the backend

`natural-language-report-service` serves the `/assistant/*path` route, and the
app that hosts this frontend proxies `/assistant` to it. See the
`chat` service and the dispatcher config in `app-organization-portal`.

## Prerequisites

You will need the following things properly installed on your computer.

- Git
- Node.js (with npm)
- Ember CLI
- Google Chrome

## Installation

```
git clone <repository-url>
cd frontend-report-assistant
npm install
```

## Running / Development

```
npm run start
```

Visit your app at http://localhost:4200.

`.env.development` points the app proxy at `localhost:90`. The umbrella app
(`app-organization-portal`) should run there.

## Running Tests

```
npm run test
```
