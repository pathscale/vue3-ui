/**
 * +/- function to native math sign
 * @param value
 */
function signPoly(value) {
    if (value < 0) return -1
    return value > 0 ? 1 : 0
}
export const sign = Math.sign || signPoly

/**
 * Get value of an object property/path even if it's nested
 * @param obj
 * @param path
 * @param obj
 * @param path
 */
export function getValueByPath(obj, path) {
    const value = path.split('.').reduce((o, i) => o ? o[i] : null, obj)
    return value
}

/**
 * Extension of indexOf method by equality function if specified
 * @param array
 * @param obj
 * @param fn
 * @param array
 * @param obj
 * @param fn
 * @param array
 * @param obj
 * @param fn
 */
export function indexOf(array, obj, fn) {
    if (!array) return -1

    if (!fn || typeof fn !== 'function') return array.indexOf(obj)

    for (const [i, element] of array.entries()) {
        if (fn(element, obj)) {
            return i
        }
    }

    return -1
}

/**
 * Merge function to replace Object.assign with deep merging possibility
 * @param item
 */
const isObject = (item) => typeof item === 'object' && !Array.isArray(item)
const mergeFn = (target, source, deep = false) => {
    if (deep || !Object.assign) {
        const isDeep = (prop) =>
            isObject(source[prop]) &&
            target !== null &&
            target.hasOwnProperty(prop) &&
            isObject(target[prop])
        const replaced = Object.getOwnPropertyNames(source)
            .map((prop) => ({ [prop]: isDeep(prop)
                ? mergeFn(target[prop], source[prop], deep)
                : source[prop] }))
            .reduce((a, b) => ({ ...a, ...b }), {})

        return {
            ...target,
            ...replaced
        }
    } 
        return Object.assign(target, source)
    
}
export const merge = mergeFn

/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */
export const isMobile = {
    Android () {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/android/i)
        )
    },
    BlackBerry () {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/blackberry/i)
        )
    },
    iOS () {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/iphone|ipad|ipod/i)
        )
    },
    Opera () {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/opera mini/i)
        )
    },
    Windows () {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/iemobile/i)
        )
    },
    any () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        )
    }
}

export function removeElement(el) {
    if (typeof el.remove !== 'undefined') {
        el.remove()
    } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
        el.remove()
    }
}

export function createAbsoluteElement(el) {
    const root = document.createElement('div')
    root.style.position = 'absolute'
    root.style.left = '0px'
    root.style.top = '0px'
    const wrapper = document.createElement('div')
    root.append(wrapper)
    wrapper.append(el)
    document.body.append(root)
    return root
}

/**
 * Escape regex characters
 * http://stackoverflow.com/a/6969486
 * @param value
 */
export function escapeRegExpChars(value) {
    if (!value) return value

    // eslint-disable-next-line
    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}

export function multiColumnSort(inputArray, sortingPriority) {
    // clone it to prevent the any watchers from triggering every sorting iteration
    const array = JSON.parse(JSON.stringify(inputArray))
    const fieldSorter = (fields) => (a, b) => fields.map((o) => {
        let dir = 1
        if (o[0] === '-') { dir = -1; o = o.slice(1) }
        return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0
    }).reduce((p, n) => p || n, 0)

    return array.sort(fieldSorter(sortingPriority))
}

export function createNewEvent(eventName) {
    let event
    if (typeof Event === 'function') {
        event = new Event(eventName)
    } else {
        event = document.createEvent('Event')
        event.initEvent(eventName, true, true)
    }
    return event
}
