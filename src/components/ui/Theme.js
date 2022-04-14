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
        fontFamily: 'Arial',
    },
});
export default theme;
