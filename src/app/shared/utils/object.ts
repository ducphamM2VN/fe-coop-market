import { SafeAny } from './types';

export class ObjectUtil {
    static convertValueObjecArrayToString(object: SafeAny) {
        Object.keys(object).map(function (key) {
            if (key.startsWith('ids')) {
                object[key] = object[key] ? object[key].join(',') : null
            }
        });
        return {
            ...object
        };
    }

    static parseObject(obj: Record<string, unknown> | SafeAny) {
        try {
            return JSON.parse(JSON.stringify(obj));
        } catch (ex) {
            return null;
        }
    }
}

/**
     * Parse JSON string
     */
export function parseJSON(data: SafeAny) {
    data = data || '';
    return JSON.parse(data);
}

/**
 * Check empty object
 */
export function checkEmptyObject(obj: SafeAny) {
    for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/**
 * Check if the string is empty or null
 */
export function checkNotNullAndNotEmpty(data: SafeAny) {
    return data !== null && data !== '';

}

/**
  * Check if the variable is undefined
  */
export function isUndefined(data: SafeAny) {
    return data === undefined;
}


/**
  * "Safer" String.toLowerCase()
  */
export function lowerCase(str: string) {
    return str.toLowerCase();
}

/**
 * "Safer" String.toUpperCase()
 */
export function upperCase(str: string) {
    return str.toUpperCase();
}

/**
 * UPPERCASE first char of each word.
 */
export function properCase(str: string) {
    return lowerCase(str).replace(/^\w|\s\w/g, upperCase);
}

/**
 * UPPERCASE first char of each sentence and lowercase other chars.
 */
export function sentenceCase(str: string) {
    // Replace first char of each sentence (new line or after '.\s+') to
    // UPPERCASE
    return lowerCase(str).replace(/(^\w)|\.\s+(\w)/gm, upperCase);
}

export function isObject(val: SafeAny) {
    if (val === null) {
        return false;
    }
    return ((typeof val === 'function') || (typeof val === 'object'));
}

export function convertToObject(object: string) {
    if (!object) return;
    try {
        return JSON.parse(JSON.parse(object));
    } catch (ex) {
        return null;
    }
}

/**
 * Convert object to query string
 * @param params
 * @returns {string}
 */
export function convertToQueryString(params: SafeAny) {
    return Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&');
}
