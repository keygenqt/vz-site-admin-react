import * as React from "react";
import {Avatar, Card, CardContent, CardHeader, Fab, Grid, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {MoreVert} from "@mui/icons-material";
import Chart from 'react-apexcharts';


const chartData = {
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

export function CardChart(props) {

    const {
        icon,
        title,
        subheader,
        actionMenu,
        iconSize = 'normal',
        size = 'normal',
        color = 'blue',
    } = props

    return (
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
                    actionMenu ? <Fab size="small" color={color === 'blue' || color === 'yellow' ? 'primary' : color}
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
                            <Chart {...chartData}/>
                        </Grid>
                    </React.Fragment> : null}
                    <Grid item xs={12}>
                        {props.children}
                    </Grid>
                </Grid>

            </CardContent> : null}

        </Card>
    );
}

CardChart.propTypes = {
    icon: PropTypes.node,
    iconSize: PropTypes.oneOf(['small', 'normal']),
    title: PropTypes.string,
    subheader: PropTypes.string,
    actionMenu: PropTypes.func,
    color: PropTypes.oneOf(['primary', 'secondary', 'blue', 'yellow']),
    size: PropTypes.oneOf(['small', 'normal']),
};
