import * as React from 'react';
import {Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {AppCard} from "../../../../components";
import {ViewListOutlined} from "@mui/icons-material";


export function ProjectPage({title}) {

    useEffect(() => {
        document.title = title;
    });

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <AppCard
                    iconType={'page'}
                    icon={<ViewListOutlined/>}
                    title={'Project Page'}
                    size={'small'}
                    color={'success'}
                    contentHeight={504}
                >
                    <Typography component="div" variant="h4">
                        Page content...
                    </Typography>
                </AppCard>
            </Grid>
        </Grid>
    );
}

ProjectPage.propTypes = {
    title: PropTypes.string,
};