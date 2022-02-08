import {createTheme} from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
        primary: {
            light: '#00ffff',
            main: '#A4925A',
            dark: '#857437',
            contrastText: '#fff',
        },
        secondary: {
            light: '#003057',
            main: '#003057',
            dark: '#003057',
            contrastText: '#000',
        },
    },
});
export default theme;
