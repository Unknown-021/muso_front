export function trim(value) {
    return value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

export function isMobile() {
    return typeof window.orientation !== 'undefined';
}

export function getBrowserWidth() {
    if (typeof document === 'undefined') return 1280;
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

export function filterInt(value) {
    if (/^([-+])?([0-9]+|Infinity)$/.test(value)) {
        return Number(value);
    }
    return NaN;
}
