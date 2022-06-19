import {createTheme} from "@material-ui/core";
import {isSmall} from "./Window.js";

var theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#ffffff',
            main: '#ccddee',
            dark: '#aabbcc',
            text: '#ccddee',
        },
        secondary: {
            light: '#aaaaaa',
            main: '#888888',
            dark: '#555555',
            text: '#000',
        },
    },
    typography: {
        fontFamily: 'Helvetica',
        h1: {
            fontSize: 42,
            lineHeight: 1.65,
        },
        h2: {
            fontSize: 32,
            lineHeight: 1.65,
        },
        h3: {
            fontSize: 24,
            lineHeight: 1.65,
        },
        h4: {
            fontSize: 18,
            lineHeight: 1.65,
        },
        h5: {
            fontSize: 14,
            lineHeight: 1.65,
        },
        h6: {
            fontSize: 10,
            lineHeight: 1.65,
        },
    },
});

export function setFontSize(dpi) {
    const small = isSmall(dpi);
    console.log(small)

    theme.typography.h1.fontSize = small ? 32 : 42;
    theme.typography.h2.fontSize = small ? 24 : 32;
    theme.typography.h3.fontSize = small ? 18 : 24;
    theme.typography.h4.fontSize = small ? 14 : 18;
    theme.typography.h5.fontSize = small ? 10 : 14;
    theme.typography.h6.fontSize = small ? 7 : 10;
}

export default theme;
