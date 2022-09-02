import * as React from "react";
import {Alert, Box, Collapse, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

export function TabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabPanel"
            hidden={value !== index}
            id={`tabPanel-${index}`}
            aria-labelledby={`tabPanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ paddingTop: 3, paddingBottom: 1 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.element.isRequired
};