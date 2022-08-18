import * as React from 'react';
import PropTypes from "prop-types";

export function GuestLayout(props) {
    return (
        <div className={"App AppTable"} style={{
            backgroundColor: '#c5e6ff',
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