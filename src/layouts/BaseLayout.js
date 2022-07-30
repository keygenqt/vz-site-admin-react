import * as React from 'react';
import {AppMenu, AppTopBar} from "../components";
import PropTypes from "prop-types";

export function BaseLayout(props) {
    return (
        <div className={"App AppTable"}>
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

BaseLayout.propTypes = {
    children: PropTypes.element.isRequired
};