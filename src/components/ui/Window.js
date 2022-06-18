export function getScreenWidth() {
    return document.documentElement.clientWidth;
}

export function getScreenHeight() {
    return document.documentElement.clientWidth / document.documentElement.clientHeight <= 1.8 ?
        document.documentElement.clientHeight : document.documentElement.clientWidth / 1.8;
}

export function isLandscape(width, height) {
    return height / width < 1.5;
}