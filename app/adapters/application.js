import { JSONAPIAdapter } from '@warp-drive/legacy/adapter/json-api';
import { ServerError } from '@warp-drive/legacy/adapter/error';

export default class ApplicationAdapter extends JSONAPIAdapter {
  ajax(url, method) {
    if (method !== 'GET') return super.ajax(...arguments);

    return retryOnError(super.ajax.bind(this), arguments);
  }
}

async function retryOnError(ajax, ajaxArgs, retryCount = 0) {
  const MAX_RETRIES = 6;

  try {
    return await ajax(...ajaxArgs);
  } catch (error) {
    if (retryCount < MAX_RETRIES && isWorthRetrying(error)) {
      await sleep(250 * (retryCount + 1));
      return retryOnError(ajax, ajaxArgs, retryCount + 1);
    } else {
      throw error;
    }
  }
}

// A server error or a lost connection can pass on a next try. A 4xx gives
// the same answer again.
function isWorthRetrying(error) {
  return error instanceof ServerError || !error?.isAdapterError;
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(() => resolve(true), time));
}
