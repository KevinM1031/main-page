export function getSunPos(date, lat, lon) {

    lat = lat / 180 * Math.PI;

    // calculating equatorial coordinates
    // from https://en.wikipedia.org/wiki/Position_of_the_Sun
    const n = (date.getTime() - 946728000000) / 86400000;

    const L = 4.89495042 + 0.0172027923937 * n;
    const g = 6.240040768 + 0.0172019703436 * n;

    const gamma = L + 0.033423055 * Math.sin(g) + 0.0003490659 * Math.sin(2*g);
    const epsilon = 0.409087723 - 0.000000006981317 * n;

    const RA = Math.atan2(Math.cos(epsilon) * Math.sin(gamma), Math.cos(gamma));
    const delta = Math.asin(Math.sin(epsilon) * Math.sin(gamma));

    // calculating local sidereal time
    const UTC_hours = date.getUTCHours() + date.getUTCMinutes()/60 + date.getUTCSeconds()/3600;
    const LST = (100.46 + 0.985647332 * n + lon + 15 * UTC_hours) % 360 / 180 * Math.PI;

    // converting equatorial coordinates to horizontal coordinates
    // from http://www.stargazing.net/kepler/altaz.html
    const H = RA - LST;

    const a = Math.asin(Math.sin(delta) * Math.sin(lat) + Math.cos(delta) * Math.cos(lat) * Math.cos(H));
    const A0 = Math.acos((Math.sin(delta) - Math.sin(a) * Math.sin(lat)) / (Math.cos(a) * Math.cos(lat)));
    const A = Math.sin(H) > 0 ? A0 : Math.PI * 2 - A0;

    return {
        altitude: a,
        azimuth: A,
    };
}