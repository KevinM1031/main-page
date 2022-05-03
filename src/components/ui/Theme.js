import {createTheme} from "@material-ui/core";

const theme = createTheme({
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
export default theme;
