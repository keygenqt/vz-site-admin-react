import * as React from "react";
import {Avatar, Card, CardContent, CardHeader, Fab, Grid, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {MoreVert} from "@mui/icons-material";
import Chart from 'react-apexcharts';
import {SkeletonNormal} from "./elements/SkeletonNormal";
import {SkeletonSmall} from "./elements/SkeletonSmall";
import {LoaderPage} from "./elements/LoaderPage";

const colors = {
    blue: {
        main: '#2196f3',
        bg: '#c0e0ff',
    },
    blueLight: {
        main: '#71bfff',
        bg: '#d3e9ff',
    },
    purple: {
        main: '#673ab7',
        bg: '#c5aef6',
    },
    yellow: {
        main: '#ffc107',
        bg: '#ffe57f',
    },
    green: {
        main: '#16da7a',
        bg: '#abffd7',
    }
}

const variants = {
    circles1: {
        before: {
            width: '150px',
            height: '150px',
            top: '-76px',
            right: '27px',
            opacity: 0.5
        },
        after: {
            width: '210px',
            height: '210px',
            top: '-100px',
            right: '-95px',
        }
    },
    circles2: {
        before: {
            width: '150px',
            height: '150px',
            top: '-95px',
            right: '-40px',
            opacity: 0.6
        },
        after: {
            width: '210px',
            height: '210px',
            bottom: '-150px',
            right: '-140px',
            opacity: 0.4
        }
    },
    circles3: {
        before: {
            width: '150px',
            height: '150px',
            bottom: '-120px',
            right: '-45px',
            opacity: 0.5,
            backgroundColor: 'transparent',
            border: '3px solid',
        },
        after: {
            width: '150px',
            height: '150px',
            bottom: '-95px',
            right: '-125px',
            opacity: 0.7,
            backgroundColor: 'transparent',
            border: '10px solid',
        }
    },
    circles4: {
        before: {
            width: '150px',
            height: '150px',
            bottom: '-110px',
            left: '-90px',
            backgroundColor: 'transparent',
            border: '5px solid',
        },
        after: {
            width: '180px',
            height: '180px',
            top: '-120px',
            right: '-70px',
        }
    }
}


export function AppCard(props) {

    const {
        type = 'inline',
        color = 'blue',
        variant = 'circles3',
        backdrop,
        style,
        icon,
        title,
        subheader,
        actionDisable = false,
        actionIcon,
        actionMenu,
        chart,
        contentHeight = 0,
        isLoading = false,
        hideButton = false
    } = props

    return (
        <>
            {isLoading ? (type === 'card' ? <SkeletonNormal
                    isAction={actionMenu !== undefined}
                    isChart={chart !== undefined}
                /> :
                <SkeletonSmall
                    isAction={actionMenu !== undefined}
                    isTitle={title !== undefined}
                    isSubheader={subheader !== undefined}
                    isIcon={icon !== undefined}
                    isIconSmall={type === 'page'}
                    contentHeight={contentHeight}
                />) : (
                <Card variant={"outlined"} className={variant} style={style} sx={{
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: type === 'card' ? colors[color].bg : 'auto',
                    '& .MuiCardHeader-root, & .MuiCardContent-root': {
                        position: 'relative',
                        zIndex: 1,
                    },
                    [`&.${variant}:before`]: {
                        content: '""',
                        position: 'absolute',
                        borderRadius: '50%',
                        zIndex: 0,
                        backgroundColor: colors[color].main,
                        ...variants[variant].before,
                        borderColor: colors[color].main,
                    },
                    [`&.${variant}:after`]: {
                        content: '""',
                        position: 'absolute',
                        borderRadius: '50%',
                        zIndex: 0,
                        backgroundColor: colors[color].main,
                        ...variants[variant].after,
                        borderColor: colors[color].main,
                    }
                }}>
                    {icon || actionMenu || title || subheader ? <CardHeader
                        avatar={
                            <Avatar
                                variant="rounded"
                                aria-label="recipe"
                                sx={{
                                    backgroundColor: type === 'page' ? 'transparent' : colors[color].main,
                                    fontSize: type === 'page' ? 24 : 'auto',
                                    color: type === 'page' ? 'black' : 'auto',
                                    width: type === 'page' ? 30 : 40,
                                    height: type === 'page' ? 30 : 40,
                                }}>
                                {icon}
                            </Avatar>
                        }
                        action={
                            actionMenu && !hideButton ?
                                <Fab disabled={actionDisable} size="small"
                                     sx={{
                                         '&': {
                                             backgroundColor: colors[color].bg,
                                         },
                                         '&:hover': {
                                             backgroundColor: colors[color].bg,
                                         },
                                         '&.Mui-disabled': {
                                             backgroundColor: 'white',
                                         }
                                     }}
                                     aria-label="add"
                                     onClick={actionMenu}
                                >
                                    {actionIcon ? actionIcon : <MoreVert/>}
                                </Fab> : null
                        }
                        title={
                            type !== 'card' ? <Typography component="div" variant="h7" sx={{
                                margin: subheader ? 0 : '7px 0px'
                            }}>
                                {title}
                            </Typography> : null
                        }
                        subheader={
                            type !== 'card' ? <Typography component="div" variant="caption">
                                {subheader}
                            </Typography> : null
                        }
                        sx={{
                            paddingBottom: type === 'card' ? '1px' : 'auto'
                        }}
                    /> : null}

                    {type === 'card' || props.children ? <CardContent sx={{
                        padding: type === 'page' ? '0 16px 16px 16px !important' : '0 16px',
                        minHeight: type === 'card' ? '109px' : 'auto',
                        '&:last-child': {
                            paddingBottom: '15px'
                        }
                    }}>
                        <Grid container spacing={1}>
                            {type === 'card' ? <React.Fragment>
                                <Grid item xs={5}>
                                    <Stack spacing={1} style={{
                                        paddingTop: 18
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

                            {props.children ? <Grid item xs={12}>
                                {props.children}
                            </Grid> : null}

                        </Grid>

                    </CardContent> : null}

                    {backdrop && (
                        <LoaderPage/>
                    )}

                </Card>)}
        </>
    );
}

AppCard.propTypes = {
    type: PropTypes.oneOf(['page', 'card', 'inline']),
    color: PropTypes.oneOf(['blue', 'blueLight', 'purple', 'yellow', 'green']),
    variant: PropTypes.oneOf(['circles1', 'circles2', 'circles3', 'circles4']),
    style: PropTypes.object,
    contentHeight: PropTypes.number,
    hideButton: PropTypes.bool,
    isLoading: PropTypes.bool,
    backdrop: PropTypes.bool,
    icon: PropTypes.node,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    subheader: PropTypes.string,
    actionDisable: PropTypes.bool,
    actionIcon: PropTypes.element,
    actionMenu: PropTypes.func,
    chart: PropTypes.object,
};