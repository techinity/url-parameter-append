/**
 * Backwards compatibility of Object.entries function.
 */
const entries = typeof Object.entries === 'undefined' ?
  obj => Object.keys(obj).map(key => [key, obj[key]]) :
  Object.entries;

/**
 * Add, update or remove querystring parameters.
 * @param {string} url
 * @param {...string|object} args
 * @return {string}
 */
function urlParameterAppend(url, ...args) {
  if (args[0] && typeof args[0] === 'object') {
    return urlParameterAppend.call(
      null,
      url,
      ...entries(args[0]).reduce((acc, item) => [...acc, ...item], []),
    );
  }

  let [modifiedUrl, ...fragment] = url.split('#');
  fragment = fragment.length ? `#${fragment.join('#')}` : '';

  for (let i = 0; i < args.length; i += 2) {
    const param = args[i];
    const value = args[i + 1];

    // add / update
    const firstParamRx = new RegExp(`([?])${param}=([^&#]*)(&)`, 'i');
    const secondParamRx = new RegExp(`([?&])${param}=([^&#]*)`, 'i');
    const hasValue = !(value === null || value === undefined || value === '');

    if (firstParamRx.exec(modifiedUrl)) {
      modifiedUrl = hasValue ?
        modifiedUrl.replace(firstParamRx, `$1${param}=${value}$3`) :
        modifiedUrl.replace(firstParamRx, '?');
    } else if (secondParamRx.exec(modifiedUrl)) {
      modifiedUrl = hasValue ?
        modifiedUrl.replace(secondParamRx, `$1${param}=${value}`) :
        modifiedUrl.replace(secondParamRx, '');
    } else if (hasValue) {
      modifiedUrl = `${modifiedUrl}${(modifiedUrl.indexOf('?') < 0 ? '?' : '&') + param}=${value}`;
    }
  }

  return `${modifiedUrl}${fragment}`;
}

module.exports = urlParameterAppend;
