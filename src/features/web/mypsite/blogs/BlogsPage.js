import * as React from 'react';
import {useEffect} from 'react';
import {Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {ViewListOutlined} from "@mui/icons-material";
import {AppCard} from "../../../../components";

export function BlogsPage({title}) {

    useEffect(() => {
        document.title = title;
    });

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <AppCard
                    iconType={'page'}
                    icon={<ViewListOutlined/>}
                    title={'Blogs Page'}
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

BlogsPage.propTypes = {
    title: PropTypes.string,
};