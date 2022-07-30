import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Grid, Stack, Typography} from "@mui/material";
import {AppContext} from "../../base";
import {CardChart} from "../../components";
import {AllInbox, AssignmentInd, Badge, Dashboard, Domain} from "@mui/icons-material";

export function HomePage(props) {

    const {route} = useContext(AppContext)

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        document.title = props.title;
    });

    return (
        <Grid item xs={12}>
            <Grid container spacing={3} rowSpacing={3}>
                <Grid item xl={4} lg={6} md={6} sm={6} xs={6}>
                    <CardChart
                        title={'$203k'}
                        subheader={'Total Income'}
                        icon={<AllInbox/>}
                        color={'primary'}
                    />
                </Grid>
                <Grid item xl={4} lg={6} md={6} sm={6} xs={6}>
                    <CardChart
                        title={'$203k'}
                        subheader={'Total Income'}
                        icon={<AssignmentInd/>}
                        color={'secondary'}
                        actionMenu={() => {
                            console.log('yes')
                        }}
                    />
                </Grid>
                <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={3} rowSpacing={3}>
                        <Grid item xl={12} lg={6} md={6} sm={6} xs={6}>
                            <CardChart
                                title={'$203k'}
                                subheader={'Total Income'}
                                size={'small'}
                                icon={<Badge/>}
                                color={'blue'}
                            />
                        </Grid>
                        <Grid item xl={12} lg={6} md={6} sm={6} xs={6}>
                            <CardChart
                                size={'small'}
                                title={'$203k'}
                                subheader={'Total Income'}
                                icon={<Dashboard/>}
                                color={'yellow'}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xl={8} lg={6} md={6} sm={6} xs={6}>
                    <CardChart
                        title={'Test chat title'}
                        size={'small'}
                        color={'blue'}
                        actionMenu={() => {
                            console.log('yes')
                        }}
                    >
                        <Stack spacing={1}>
                            <Typography component="div" variant="h3">
                                Test card block 1
                            </Typography>
                            <Typography component="div" variant="h3">
                                Test card block 2
                            </Typography>
                        </Stack>
                    </CardChart>
                </Grid>
                <Grid item xl={4} lg={6} md={6} sm={6} xs={6}>
                    <CardChart
                        iconSize={'small'}
                        icon={<Domain/>}
                        title={'Test chat title'}
                        size={'small'}
                        color={'blue'}
                    >
                        <Stack spacing={1}>
                            <Typography component="div" variant="h3">
                                Test card block 1
                            </Typography>
                            <Typography component="div" variant="h3">
                                Test card block 2
                            </Typography>
                        </Stack>
                    </CardChart>
                </Grid>
            </Grid>
        </Grid>
    );
}