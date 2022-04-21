export function getScreenWidth() {
    return document.documentElement.clientWidth;
}

export function getScreenHeight() {
    return document.documentElement.clientHeight;
}

export function isLandscape(width, height) {
    return height / width < 1.5;
}