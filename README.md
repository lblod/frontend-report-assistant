# frontend-report-assistant

Chat frontend for the report assistant. Admin users ask questions in Dutch
and get a CSV report. The chat talks to the assistant backend via the
`/assistant` route of the app it is wired into. OAuth login goes through
ACM/IDM. When ACM/IDM is not configured, the app falls back to mock login.

It is an Ember app, built with Vite. The built app is a static frontend hosted
by the [mu-semtech/static-file-service](https://github.com/mu-semtech/static-file-service)
docker image, which fills the `{{PLACEHOLDER}}` strings in
`config/environment.js` from environment variables at container start.

## Environment variables

| Name                  | Description                                                                            |
| --------------------- | -------------------------------------------------------------------------------------- |
| `EMBER_APP_NAME`      | App name shown in the UI. Defaults to `Assistent`.                               |
| `EMBER_ASSISTANT_PATH`| Base path of the assistant backend in the wired app. Defaults to `/assistant`.          |
| `EMBER_ACMIDM_CLIENT_ID`     | ACM/IDM client id for the environment.                                          |
| `EMBER_ACMIDM_BASE_URL`      | ACM/IDM authorisation base URL.                                                 |
| `EMBER_ACMIDM_REDIRECT_URL`  | Callback URL ACM/IDM uses after login.                                          |
| `EMBER_ACMIDM_LOGOUT_URL`    | URL users go to when they log out.                                              |

Without the ACM/IDM variables the app uses mock login.

## Pair it with the backend

`natural-language-report-service` serves the `/assistant/*path` route, and the
app that hosts this frontend proxies `/assistant` to it. See the
`chat` service and the dispatcher config in `app-organization-portal`.

## Developing locally

Don't run the docker stack. Start the app itself:

```
npm ci
npm run start
```

`.env.development` points the app proxy at `localhost:90`. The umbrella app
(`app-organization-portal`) should run there.
