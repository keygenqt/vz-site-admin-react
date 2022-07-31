import * as React from "react";
import {Avatar, Card, CardContent, CardHeader, Fab, Grid, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {MoreVert} from "@mui/icons-material";
import Chart from 'react-apexcharts';
import {SkeletonNormal} from "./elements/SkeletonNormal";
import {SkeletonSmall} from "./elements/SkeletonSmall";

export function AppCard(props) {

    const {
        icon,
        title,
        subheader,
        actionMenu,
        chart,
        contentHeight = 0,
        isLoading = false,
        iconSize = 'normal',
        size = 'normal',
        color = 'blue',
    } = props

    return (
        <>
            {isLoading ? (size === 'normal' ? <SkeletonNormal
                    isAction={actionMenu !== undefined}
                    isChart={chart !== undefined}
                /> :
                <SkeletonSmall
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
                                    {chart ? <Chart {...chart} /> : null}
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

AppCard.propTypes = {
    contentHeight: PropTypes.number,
    isLoading: PropTypes.bool,
    icon: PropTypes.node,
    iconSize: PropTypes.oneOf(['small', 'normal']),
    title: PropTypes.string,
    subheader: PropTypes.string,
    actionMenu: PropTypes.func,
    chart: PropTypes.object,
    color: PropTypes.oneOf(['primary', 'secondary', 'blue', 'yellow', 'success']),
    size: PropTypes.oneOf(['small', 'normal']),
};