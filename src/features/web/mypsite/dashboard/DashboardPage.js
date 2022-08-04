import * as React from 'react';
import {useEffect, useState} from 'react';
import {Avatar, Button, Card, CardContent, Divider, Grid, Stack, Typography} from "@mui/material";
import {AppCard} from "../../../../components";
import {
    AllInbox,
    AssignmentInd,
    Badge,
    Dashboard,
    Domain,
    KeyboardArrowDownOutlined,
    KeyboardArrowUpOutlined,
    NavigateNext
} from "@mui/icons-material";
import PropTypes from "prop-types";
import {AppCardChart} from "./elements/AppCardChart";
import Chart from 'react-apexcharts';

export const chartData = {
    height: 490,
    type: 'bar',
    options: {
        chart: {
            id: 'bar-chart',
            stacked: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%'
            }
        },
        xaxis: {
            type: 'category',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        legend: {
            show: true,
            fontSize: '14px',
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 20,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: 5
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        },
        fill: {
            type: 'solid'
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: true
        }
    },
    series: [
        {
            name: 'Investment',
            data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75]
        },
        {
            name: 'Loss',
            data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75]
        },
        {
            name: 'Profit',
            data: [35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10]
        },
        {
            name: 'Maintenance',
            data: [0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]
        }
    ]
};

export const chartData2 = {
    type: 'area',
    height: 105,
    options: {
        chart: {
            id: 'support-chart',
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1
        },
        yaxis: {
            min: 0,
            max: 55,
            show: false
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: 'Ticket '
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            data: [0, 15, 10, 50, 30, 40, 25]
        }
    ]
};

export function DashboardPage({title}) {

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        document.title = title;
        setTimeout(function () {
            setLoading(false)
        }, 2000);
    });

    return (
        <Grid container spacing={3} rowSpacing={3}>
            <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
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
            <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                <AppCard
                    isLoading={isLoading}
                    chart={AppCardChart}
                    title={'$203k'}
                    subheader={'Total Income'}
                    icon={<AssignmentInd/>}
                    color={'secondary'}

                />
            </Grid>
            <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={3} rowSpacing={3}>
                    <Grid item xl={12} lg={6} md={6} sm={6} xs={12}>
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
                    <Grid item xl={12} lg={6} md={6} sm={6} xs={12}>
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
            <Grid item xl={8} lg={8} md={6} sm={12} xs={12} style={{}}>
                <AppCard
                    isLoading={isLoading}
                    title={'Test chat title'}
                    size={'small'}
                    color={'success'}
                    contentHeight={504}
                    actionMenu={() => {
                        console.log('yes')
                    }}
                >
                    <Chart {...chartData} />
                </AppCard>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} style={{}}>
                <AppCard
                    isLoading={isLoading}
                    iconType={'small'}
                    icon={<Domain/>}
                    title={'Popular Stocks'}
                    size={'small'}
                    color={'blue'}
                    contentHeight={504}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Card variant={"outlined"} sx={{bgcolor: 'primary.light'}}>
                                <CardContent style={{
                                    padding: '20px 0 0 0'
                                }}>
                                    <Chart
                                        {...chartData2} />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="column">

                                <Divider sx={{my: 1.5, borderColor: 'white'}}/>

                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="h7">
                                                TTML
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Stack direction={'row'}>
                                                <Typography variant="h7">
                                                    $100.00
                                                </Typography>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        marginTop: '2px',
                                                        width: 16,
                                                        height: 16,
                                                        borderRadius: '5px',
                                                        backgroundColor: '#FE8BA0',
                                                        marginLeft: 1.875
                                                    }}
                                                >
                                                    <KeyboardArrowDownOutlined fontSize="small"/>
                                                </Avatar>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption" color={'#ff4058'}>
                                        10% loss
                                    </Typography>
                                </Grid>

                                <Divider sx={{my: 1.5}}/>

                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="h7">
                                                TTML
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Stack direction={'row'}>
                                                <Typography variant="h7">
                                                    $100.00
                                                </Typography>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        marginTop: '2px',
                                                        width: 16,
                                                        height: 16,
                                                        borderRadius: '5px',
                                                        backgroundColor: '#00c853',
                                                        marginLeft: 1.875
                                                    }}
                                                >
                                                    <KeyboardArrowUpOutlined fontSize="small"/>
                                                </Avatar>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption" color={'#00c853'}>
                                        10% Profit
                                    </Typography>
                                </Grid>

                                <Divider sx={{my: 1.5}}/>

                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="h7">
                                                TTML
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Stack direction={'row'}>
                                                <Typography variant="h7">
                                                    $100.00
                                                </Typography>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        marginTop: '2px',
                                                        width: 16,
                                                        height: 16,
                                                        borderRadius: '5px',
                                                        backgroundColor: '#FE8BA0',
                                                        marginLeft: 1.875
                                                    }}
                                                >
                                                    <KeyboardArrowDownOutlined fontSize="small"/>
                                                </Avatar>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption" color={'#ff4058'}>
                                        10% loss
                                    </Typography>
                                </Grid>

                                <Divider sx={{my: 1.5}}/>

                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="h7">
                                                TTML
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Stack direction={'row'}>
                                                <Typography variant="h7">
                                                    $100.00
                                                </Typography>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        marginTop: '2px',
                                                        width: 16,
                                                        height: 16,
                                                        borderRadius: '5px',
                                                        backgroundColor: '#00c853',
                                                        marginLeft: 1.875
                                                    }}
                                                >
                                                    <KeyboardArrowUpOutlined fontSize="small"/>
                                                </Avatar>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption" color={'#00c853'}>
                                        10% Profit
                                    </Typography>
                                </Grid>

                                <Divider sx={{my: 1.5}}/>

                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="h7">
                                                TTML
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Stack direction={'row'}>
                                                <Typography variant="h7">
                                                    $100.00
                                                </Typography>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        marginTop: '2px',
                                                        width: 16,
                                                        height: 16,
                                                        borderRadius: '5px',
                                                        backgroundColor: '#FE8BA0',
                                                        marginLeft: 1.875
                                                    }}
                                                >
                                                    <KeyboardArrowDownOutlined fontSize="small"/>
                                                </Avatar>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption" color={'#ff4058'}>
                                        10% loss
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{
                            textAlign: 'center'
                        }}>
                            <Button size={"small"} variant="outlined" endIcon={<NavigateNext/>}>
                                View All
                            </Button>
                        </Grid>
                    </Grid>
                </AppCard>
            </Grid>
        </Grid>
    );
}

DashboardPage.propTypes = {
    title: PropTypes.string,
};