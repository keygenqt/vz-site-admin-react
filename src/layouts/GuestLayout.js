import * as React from 'react';
import {useContext} from 'react';
import {AppContext} from "../base";

export function GuestLayout(props) {

    const {route} = useContext(AppContext)

    return (
        <div className={"App AppTable"}>
            <div className={"AppTableRow"}>
                <main className={"AppTableCell"}>
                    {props.children}
                </main>
            </div>
        </div>
    );
}