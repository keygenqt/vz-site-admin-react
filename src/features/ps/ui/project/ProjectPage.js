import * as React from 'react';
import {Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {AppCard} from "../../../../components";
import {ViewListOutlined} from "@mui/icons-material";


export function ProjectPage() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <AppCard
                    type={'page'}
                    color={'blueLight'}
                    variant={'circles4'}
                    icon={<ViewListOutlined/>}
                    title={'Project Page'}
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

ProjectPage.propTypes = {};