import * as React from 'react';
import {useContext} from 'react';
import {AppContext} from "../base";

export function BaseLayout(props) {

    const {route} = useContext(AppContext)

    return (
        <div className={"App AppTable"}>
            <div className={"AppTableRow"}>
                <header className={"AppTableCell"} style={{
                    height: 100,
                    backgroundColor: '#6cc2ff'
                }}>
                    HEADER
                </header>
            </div>
            <div className={"AppTableRow"}>
                <main className={"AppTableCell"} style={{
                    verticalAlign: 'top'
                }}>
                    {props.children}
                </main>
            </div>
            <div className={"AppTableRow"}>
                <footer className={"AppTableCell"} style={{
                    height: 300,
                    backgroundColor: '#65a3ce'
                }}>
                    FOOTER
                </footer>
            </div>
        </div>
    );
}