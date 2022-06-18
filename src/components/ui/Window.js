export function getScreenWidth() {
    return document.documentElement.clientWidth;
}

export function getScreenHeight() {
    return document.documentElement.clientWidth / document.documentElement.clientHeight <= 1.8 ?
        document.documentElement.clientHeight : document.documentElement.clientWidth / 1.8;
}

export function isLandscape() {
    return getScreenHeight() / getScreenWidth() < 1;
}

export function isSmall(dpi) {
    return isLandscape() && getScreenWidth() / dpi.w <= 12;
}