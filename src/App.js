import { MainPage } from "./pages/MainPage";
import { ThemeProvider } from '@material-ui/core/styles';
import defaultTheme, { setFontSize } from "./components/ui/Theme";
import { useState, useEffect } from "react";

const App = () => {

    const [theme, setTheme] = useState(defaultTheme);

    const resizeHandler = () => {
        setTimeout( () => {
            const dpi = {
                w: document.getElementById("dpi").offsetWidth,
                h: document.getElementById("dpi").offsetHeight
            };
            setFontSize(dpi);
            setTheme(defaultTheme);
        }, 100 );
    }

    useEffect(() => {
        resizeHandler();
        window.addEventListener("resize", resizeHandler, true);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div id="dpi" style={{height: '1in', width: '1in', left: '100%', position: 'fixed', top: '100%'}}/>
            <MainPage/>
        </ThemeProvider>

  );
}

export default App;
