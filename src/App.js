import { Route, Routes, HashRouter } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./components/ui/Theme"

const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <Routes path>
                <Route exact path='/' element={<MainPage/>}/>
            </Routes>
        </ThemeProvider>

  );
}

export default App;
