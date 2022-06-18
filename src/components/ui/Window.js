export function getScreenWidth() {
    return document.documentElement.clientWidth;
}

export function getScreenHeight() {
    const thresholdRatio = small ? 1.1 : 1.8;
    return document.documentElement.clientWidth / document.documentElement.clientHeight <= thresholdRatio?
        document.documentElement.clientHeight : document.documentElement.clientWidth / thresholdRatio;
}

export function isLandscape() {
    return getScreenHeight() / getScreenWidth() < 1;
}

var small = false;
export function isSmall(dpi) {
    small = isLandscape() && getScreenWidth() / dpi.w <= 12;
    return small
}
export function wasSmall() {
    return small;
}