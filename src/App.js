import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./components/ui/Theme"
import { useState, useEffect } from "react";

const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
            </Routes>
        </ThemeProvider>

  );
}

export default App;
