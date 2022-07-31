import * as React from "react";
import {Avatar, Card, CardContent, CardHeader, Fab, Grid, Skeleton, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {MoreVert} from "@mui/icons-material";
import Chart from 'react-apexcharts';


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

function EarningCard(props) {

    const {
        isAction = false,
    } = props

    return (<Card>
        <CardContent className={"CardChartSkeleton"}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Skeleton variant="rectangular" width={40} height={40}/>
                        </Grid>
                        <Grid item>
                            {isAction ? <Skeleton variant="circular" width={40} height={40}/> : null}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>

                    <Grid container spacing={3} sx={{paddingTop: 1}}>
                        <Grid item xs={5}>
                            <Stack spacing={1} sx={{paddingTop: 1}}>
                                <Skeleton variant="rectangular" height={41}/>
                                <Skeleton variant="rectangular" height={19}/>
                            </Stack>
                        </Grid>
                        <Grid item xs={7}>
                            <Skeleton variant="rectangular" height={85}/>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </CardContent>
    </Card>)
}

function EarningCardSmall(props) {

    const {
        isIcon = false,
        isIconSmall = false,
        isTitle = false,
        isSubheader = false,
        isAction = false,
        contentHeight = 0,
    } = props

    return (<Card>
        <CardContent className={"CardChartSkeleton"}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" style={{
                        padding: isIconSmall && !isAction ? '4px 0' : null
                    }}>
                        <Grid item>

                            <Stack direction={'row'} spacing={1}>

                                {isIcon ? <Skeleton variant="rectangular" width={isIconSmall ? 30 : 40}
                                                    height={isIconSmall ? 30 : 40}/> : null}

                                <Stack spacing={1}>
                                    {isTitle ? <Skeleton variant="rectangular" height={17} width={100} style={{
                                        marginTop: isSubheader === false ? isIconSmall ? 6 : 11 : null
                                    }}/> : null}
                                    {isSubheader ? <Skeleton variant="rectangular" height={14} width={100} style={{
                                        marginTop: isTitle === false ? isIconSmall ? 7 : 12 : null
                                    }}/> : null}
                                </Stack>
                            </Stack>

                        </Grid>
                        <Grid item>
                            {isAction ? <Skeleton variant="circular" width={40} height={40}/> : null}
                        </Grid>

                        {contentHeight > 0 ?
                            (
                                <Grid item xs={12} style={{
                                    paddingTop: 20
                                }}>
                                    <Skeleton variant="rectangular" height={contentHeight}/>
                                </Grid>
                            )
                            : null}

                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>)
}


export function CardChart(props) {

    const {
        icon,
        title,
        subheader,
        actionMenu,
        contentHeight = 0,
        isLoading = false,
        iconSize = 'normal',
        size = 'normal',
        color = 'blue',
    } = props

    return (
        <>
            {isLoading ? (size === 'normal' ? <EarningCard isAction={actionMenu !== undefined}/> :
                <EarningCardSmall
                    isAction={actionMenu !== undefined}
                    isTitle={title !== undefined}
                    isSubheader={subheader !== undefined}
                    isIcon={icon !== undefined}
                    isIconSmall={iconSize === 'small'}
                    contentHeight={contentHeight}
                />) : (
                <Card variant={"outlined"} className={`CardChart ${color} ${size}`}>
                    {icon || actionMenu || title || subheader ? <CardHeader
                        avatar={
                            icon && iconSize === 'normal' ?
                                <Avatar variant="rounded" aria-label="recipe" className={"CardChartAvatar"}>
                                    {icon}
                                </Avatar> : icon ?
                                    <Avatar variant="rounded" aria-label="recipe" className={"CardChartAvatar Small"}>
                                        {icon}
                                    </Avatar> : null
                        }
                        action={
                            actionMenu ?
                                <Fab size="small" color={color === 'blue' || color === 'yellow' ? 'primary' : color}
                                     aria-label="add" onClick={actionMenu}>
                                    <MoreVert/>
                                </Fab> : null
                        }
                        title={
                            size === 'small' ? <Typography component="div" variant="h7" sx={{
                                margin: subheader ? 0 : '7px 0px'
                            }}>
                                {title}
                            </Typography> : null
                        }
                        subheader={
                            size === 'small' ? <Typography component="div" variant="caption">
                                {subheader}
                            </Typography> : null
                        }
                    /> : null}

                    {size === 'normal' || props.children ? <CardContent sx={{
                        padding: '0 16px'
                    }}>
                        <Grid container spacing={1}>
                            {size === 'normal' ? <React.Fragment>
                                <Grid item xs={5}>
                                    <Stack spacing={1} style={{
                                        paddingTop: 10
                                    }}>
                                        <Typography variant="h4">
                                            {title}
                                        </Typography>
                                        <Typography variant="h8">
                                            {subheader}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={7}>
                                    {color === 'primary' ? <Chart {...chartData1} /> : <Chart {...chartData2} />}
                                </Grid>
                            </React.Fragment> : null}
                            <Grid item xs={12}>
                                {props.children}
                            </Grid>
                        </Grid>

                    </CardContent> : null}

                </Card>)}
        </>
    );
}

CardChart.propTypes = {
    contentHeight: PropTypes.number,
    isLoading: PropTypes.bool,
    icon: PropTypes.node,
    iconSize: PropTypes.oneOf(['small', 'normal']),
    title: PropTypes.string,
    subheader: PropTypes.string,
    actionMenu: PropTypes.func,
    color: PropTypes.oneOf(['primary', 'secondary', 'blue', 'yellow']),
    size: PropTypes.oneOf(['small', 'normal']),
};

EarningCard.propTypes = {
    contentHeight: PropTypes.number,
    isTitle: PropTypes.bool,
    isSubheader: PropTypes.bool,
    isAction: PropTypes.bool,
    isIcon: PropTypes.bool,
    isIconSmall: PropTypes.bool,
};
