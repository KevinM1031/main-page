import { MainPage } from "./pages/MainPage/MainPage";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./components/ui/Theme"

const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <MainPage/>
        </ThemeProvider>

  );
}

export default App;
