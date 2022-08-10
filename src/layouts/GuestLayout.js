import * as React from 'react';
import PropTypes from "prop-types";
import {useTheme} from "@mui/material";

export function GuestLayout(props) {

    const {palette} = useTheme()

    return (
        <div className={"App AppTable"} style={{
            backgroundColor: palette.primary.light,
        }}>
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

GuestLayout.propTypes = {
    children: PropTypes.element.isRequired
};