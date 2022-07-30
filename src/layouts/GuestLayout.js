import * as React from 'react';
import {useContext} from 'react';
import {AppContext} from "../base";

export function GuestLayout(props) {

    const {route} = useContext(AppContext)

    return (
        <div className={"AppTable"}>
            <div className={"AppTableRow"}>
                <main className={"AppTableCell"} style={{
                    verticalAlign: 'middle'
                }}>
                    {props.children}
                </main>
            </div>
        </div>
    );
}