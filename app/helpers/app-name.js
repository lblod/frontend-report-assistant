import { helper } from '@ember/component/helper';
import ENV from 'frontend-lblod-chat/config/environment';
import { setting } from 'frontend-lblod-chat/utils/setting';

export default helper(() => setting(ENV.appName, 'Assistent'));
