import * as React from 'react';
import {useContext} from 'react';
import {ThemeProvider} from "@mui/material";
import {AppTheme} from "./base/theme/AppTheme";
import {NavigateContext} from "./base";

function App() {

    const {route} = useContext(NavigateContext)

    return (
        <ThemeProvider theme={AppTheme}>
            <div className={"App"}>
                {route.render()}
            </div>
        </ThemeProvider>
    );
}

export default App;
