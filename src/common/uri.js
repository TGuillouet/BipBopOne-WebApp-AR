/**
 * @author TGuillouet
 */
const QUERY_START_CHAR = "?"
const QUERY_PARAM_SEPARATOR = "&"
const QUERY_PARAM_KEYVAL_SEPARATOR = "="

/**
 * Get the params contained in the url
 */
export function getUrlParams() {
    const queryString = window.location.href.split(QUERY_START_CHAR)[1]
    return queryString
        .split(QUERY_PARAM_SEPARATOR)
        .map((uriElement) => {
            const [ key, value ] = uriElement.split(QUERY_PARAM_KEYVAL_SEPARATOR)
            return { [key]: decodeURI(value) };
        })
        .reduce((total, current) => ({ ...total, ...current }), {})
}