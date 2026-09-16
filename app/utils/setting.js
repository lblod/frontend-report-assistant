// A {{PLACEHOLDER}} that static-file-service did not fill in still starts
// with "{{". In development nothing fills them in.
export function setting(value, fallback) {
  return typeof value === 'string' && value.trim() && !value.startsWith('{{')
    ? value
    : fallback;
}
