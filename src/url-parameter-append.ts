import { entries } from './object-entries';

const flatten = (args: {}) => entries(args).reduce((acc, item) => [...acc, ...item], []);

/**
 * Add, update or remove querystring parameters.
 * @param {string} url
 * @param {...string|object} args
 * @return {string}
 */
export default function urlParameterAppend(url: string, ...args: any[]): string {
  if (args[0] && typeof args[0] === 'object') {
    return urlParameterAppend.call(
      null,
      url,
      ...flatten(args[0]),
    );
  }

  // tslint:disable-next-line:prefer-const
  let [modifiedUrl, ...fragment] = (url ?? '').split('#');

  for (let i = 0; i < args.length; i += 2) {
    const param = args[i];
    const value = args[i + 1];

    // add / update
    const firstParamRx = new RegExp(`([?])${param}=([^&#]*)(&)`, 'i');
    const secondParamRx = new RegExp(`([?&])${param}=([^&#]*)`, 'i');
    const hasValue = !(value === null || value === undefined || value === '');

    if (firstParamRx.exec(modifiedUrl)) {
      modifiedUrl = hasValue
        ? modifiedUrl.replace(firstParamRx, `$1${param}=${value}$3`)
        : modifiedUrl.replace(firstParamRx, '?');
    } else if (secondParamRx.exec(modifiedUrl)) {
      modifiedUrl = hasValue
        ? modifiedUrl.replace(secondParamRx, `$1${param}=${value}`)
        : modifiedUrl.replace(secondParamRx, '');
    } else if (hasValue) {
      modifiedUrl = `${modifiedUrl}${(modifiedUrl.indexOf('?') < 0 ? '?' : '&') + param}=${value}`;
    }
  }

  return `${modifiedUrl}${fragment.length ? `#${fragment.join('#')}` : ''}`;
}

module.exports = urlParameterAppend;
