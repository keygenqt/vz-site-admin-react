import * as React from 'react';
import PropTypes from "prop-types";

export function GuestLayout(props) {
    return (
        <div className={"section"} style={{
            height: '100%'
        }}>
            <div className={"AppTable"} style={{
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
        </div>
    );
}

GuestLayout.propTypes = {
    children: PropTypes.element.isRequired
};