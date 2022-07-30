import * as React from 'react';
import {useContext} from 'react';
import {ThemeProvider} from "@mui/material";
import {AppTheme} from "./base/theme/AppTheme";
import {AppContext} from "./base";

function App() {

    const {route} = useContext(AppContext)

    return (
        <ThemeProvider theme={AppTheme}>
            <React.Fragment>
                <div className={"App AppTable"}>
                    <div className={"AppTableRow"}>
                        <main>
                            {route.render(() => {
                                console.log('page error')
                            })}
                        </main>
                    </div>
                </div>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default App;
