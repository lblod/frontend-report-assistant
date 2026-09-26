import { helper } from '@ember/component/helper';

const DATE = new Intl.DateTimeFormat('nl-BE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
const TIME = new Intl.DateTimeFormat('nl-BE', {
  hour: '2-digit',
  minute: '2-digit',
});

export default helper(([date]) => {
  if (!date) return '';
  return `${DATE.format(date)} ${TIME.format(date)}`;
});
