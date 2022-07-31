import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Grid, Stack, Typography} from "@mui/material";
import {AppContext} from "../../base";
import {AppCard} from "../../components";
import {AllInbox, AssignmentInd, Badge, Dashboard, Domain} from "@mui/icons-material";

const chartData1 = {
    type: 'line',
    height: 90,
    options: {
        chart: {
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#fff'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        yaxis: {
            min: 0,
            max: 100
        },
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: 'Total Order'
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            name: 'series1',
            data: [45, 66, 41, 89, 25, 44, 9, 54]
        }
    ]
};

const chartData2 = {
    type: 'line',
    height: 90,
    options: {
        chart: {
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#fff'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        yaxis: {
            min: 0,
            max: 100
        },
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: 'Total Order'
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            name: 'series1',
            data: [35, 44, 9, 54, 45, 66, 41, 69]
        }
    ]
};

export function HomePage(props) {

    const {route} = useContext(AppContext)

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        document.title = props.title;

        setTimeout(function () {
            setLoading(false)
        }, 2000);
    });

    return (
        <Grid item xs={12}>
            <Grid container spacing={3} rowSpacing={3}>
                <Grid item xl={4} lg={6} md={6} sm={6} xs={6}>
                    <AppCard
                        isLoading={isLoading}
                        title={'$500.00'}
                        subheader={'Total Earning'}
                        icon={<AllInbox/>}
                        color={'primary'}
                        actionMenu={() => {
                            console.log('yes')
                        }}
                    />
                </Grid>
                <Grid item xl={4} lg={6} md={6} sm={6} xs={6}>
                    <AppCard
                        isLoading={isLoading}
                        chart={chartData2}
                        title={'$203k'}
                        subheader={'Total Income'}
                        icon={<AssignmentInd/>}
                        color={'secondary'}

                    />
                </Grid>
                <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={3} rowSpacing={3}>
                        <Grid item xl={12} lg={6} md={6} sm={6} xs={6}>
                            <AppCard
                                isLoading={isLoading}
                                title={'$203k'}
                                subheader={'Total Income'}
                                size={'small'}
                                icon={<Badge/>}
                                color={'blue'}
                                actionMenu={() => {
                                    console.log('yes')
                                }}
                            />
                        </Grid>
                        <Grid item xl={12} lg={6} md={6} sm={6} xs={6}>
                            <AppCard
                                isLoading={isLoading}
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
                    <AppCard
                        isLoading={isLoading}
                        title={'Test chat title'}
                        size={'small'}
                        color={'success'}
                        contentHeight={120}
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
                    </AppCard>
                </Grid>
                <Grid item xl={4} lg={6} md={6} sm={6} xs={6}>
                    <AppCard
                        isLoading={isLoading}
                        iconSize={'small'}
                        icon={<Domain/>}
                        title={'Test chat title'}
                        size={'small'}
                        color={'blue'}
                        contentHeight={120}
                    >
                        <Stack spacing={1}>
                            <Typography component="div" variant="h3">
                                Test card block 1
                            </Typography>
                            <Typography component="div" variant="h3">
                                Test card block 2
                            </Typography>
                        </Stack>
                    </AppCard>
                </Grid>
            </Grid>
        </Grid>
    );
}