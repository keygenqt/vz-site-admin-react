import * as React from 'react';
import {useContext} from 'react';
import {ThemeProvider} from "@mui/material";
import {AppTheme} from "./base/theme/AppTheme";
import {AppContext} from "./base";

function App() {

    const {route} = useContext(AppContext)

    return (
        <ThemeProvider theme={AppTheme}>
            <div className={"App"}>
                {route.render(() => {
                    console.log('page error')
                })}
            </div>
        </ThemeProvider>
    );
}

export default App;
