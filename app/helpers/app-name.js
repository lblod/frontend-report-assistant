import { helper } from '@ember/component/helper';
import ENV from 'frontend-report-assistant/config/environment';
import { setting } from 'frontend-report-assistant/utils/setting';

export default helper(() => setting(ENV.appName, 'Assistent'));
