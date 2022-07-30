import * as React from 'react';
import {useContext} from 'react';
import {AppContext} from "../base";
import {AppMenu, AppTopBar} from "../components";

export function BaseLayout(props) {

    const {route} = useContext(AppContext)
    // xl={2} lg={3} md={4} sm={5} xs={12}

    return (
        <div className={"AppTable"}>
            <div className={"AppTableRow"}>
                <div className={"AppTableCell"}>
                    <AppTopBar/>
                    <div className={"AppTable"} style={{
                        height: 'calc(100% - 64px)'
                    }}>
                        <div className={"AppTableRow"}>
                            <div className={"AppTableCell"} style={{width: 0}}>
                                <AppMenu/>
                            </div>
                            <div className={"AppTableCell"}>
                                <div className={"Page"}>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}