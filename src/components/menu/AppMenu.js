import * as React from 'react';
import {Collapse, Grid, useMediaQuery, useTheme} from "@mui/material";
import PropTypes from "prop-types";
import {useEffect} from "react";

/**
 * Top bar fot app with adaptive layout
 *
 * @returns {JSX.Element}
 */
export function AppMenu(props) {

    const {breakpoints} = useTheme();

    const isMD = useMediaQuery(breakpoints.down('md'));

    const {
        isOpen = true
    } = props

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    return (
        <div className={`AppTableCell Menu ${isMD ? 'Menu-Small' : ''}`} style={{
            backgroundColor: isOpen && isMD ? '#00000080' : 'transparent',
        }}>
            <div className={"AppMenu"}>
                <Collapse orientation="horizontal" in={isOpen}>
                    <Grid container spacing={1} style={{
                        width: 300,
                    }}>
                        <Grid item xs={12}>
                            sdfs
                        </Grid>
                    </Grid>
                </Collapse>
            </div>
        </div>
    );
}

AppMenu.propTypes = {
    isOpen: PropTypes.bool
};