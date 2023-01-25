import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Avatar, Button, CircularProgress, Divider, Fab, Grid, Stack, Typography, useTheme} from "@mui/material";
import {AppCard} from "../../../../components";
import {
    AccountTree,
    CalendarMonth,
    Description,
    Group,
    Interests,
    NavigateNext,
    OpenInNew,
    Refresh,
    Star,
    TrendingUp, VisibilityOffRounded, VisibilityRounded
} from "@mui/icons-material";
import Chart from 'react-apexcharts';
import {MethodsRequest, NavigateContext, useRequest} from "../../../../base";

export function DashboardPage() {

    const {route} = useContext(NavigateContext)
    const {palette} = useTheme();

    // Projects
    const [refreshProjects, setRefreshProjects] = useState(false)
    const [hideButtons, setHideButtons] = useState(false)

    const {
        loading: loadingProjects,
        data: dataProjects,
        error: errorProjects,
    } = useRequest(MethodsRequest.ps.projectsInfo, refreshProjects);

    useEffect(() => {
        if (!loadingProjects) {
            setRefreshProjects(false)
        }
    }, [loadingProjects])

    // Projects
    const [refreshArticles, setRefreshArticles] = useState(false)

    const {
        loading: loadingArticles,
        data: dataArticles,
        error: errorArticles,
    } = useRequest(MethodsRequest.ps.articlesInfo, refreshArticles);

    useEffect(() => {
        if (!loadingArticles) {
            setRefreshArticles(false)
        }
    }, [loadingArticles])

    // Followers
    const [refreshFollowers, setRefreshFollowers] = useState(false)

    const {
        loading: loadingFollowers,
        data: dataFollowers,
        error: errorFollowers,
    } = useRequest(MethodsRequest.ps.followersInfo, refreshFollowers);

    useEffect(() => {
        if (!loadingFollowers) {
            setRefreshFollowers(false)
        }
    }, [loadingFollowers])

    // Repos
    const [refreshRepos, setRefreshRepos] = useState(false)

    const {
        loading: loadingRepos,
        data: dataRepos,
        error: errorRepos,
    } = useRequest(MethodsRequest.ps.publicReposInfo, refreshRepos);

    useEffect(() => {
        if (!loadingRepos) {
            setRefreshRepos(false)
        }
    }, [loadingRepos])

    // Repos Types
    const [refreshReposTypes, setRefreshReposTypes] = useState(false)

    const {
        loading: loadingReposTypes,
        data: dataReposTypes,
        error: errorReposTypes,
    } = useRequest(MethodsRequest.ps.reposTypes, refreshReposTypes);

    useEffect(() => {
        if (!loadingReposTypes) {
            setRefreshReposTypes(false)
        }
    }, [loadingReposTypes])

    // Repos Types
    const [refreshReposPopular, setRefreshReposPopular] = useState(false)

    const {
        loading: loadingReposPopular,
        data: dataReposPopular,
        error: errorReposPopular,
    } = useRequest(MethodsRequest.ps.reposPopular, refreshReposPopular);

    useEffect(() => {
        if (!loadingReposPopular) {
            setRefreshReposPopular(false)
        }
    }, [loadingReposPopular])

    return (
        <Grid container spacing={3} rowSpacing={3}>
            <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                <AppCard
                    type={'card'}
                    color={'blue'}
                    variant={'circles1'}
                    icon={<AccountTree/>}
                    isLoading={(loadingRepos || errorRepos) && !refreshRepos}
                    title={refreshRepos ? '∞' : dataRepos?.count ?? '∞'}
                    subheader={'Public Repos'}
                    hideButton={hideButtons}
                    actionIcon={refreshRepos ? <CircularProgress color="primary" size={18} sx={{
                        padding: '3px'
                    }}/> : <Refresh/>}
                    actionMenu={() => {
                        setRefreshRepos(true)
                    }}
                    chart={(dataRepos?.data ?? []).length > 1 ? {
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
                                min: Math.min(...dataRepos?.data ?? [0]) - 2,
                                max: Math.max(...dataRepos?.data ?? [0]) + 2,
                                show: false
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
                                name: 'Repos',
                                data: dataRepos?.data ?? []
                            }
                        ]
                    } : null}
                />
            </Grid>
            <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                <AppCard
                    type={'card'}
                    color={'purple'}
                    variant={'circles1'}
                    icon={<Group/>}
                    isLoading={(loadingFollowers || errorFollowers) && !refreshFollowers}
                    title={refreshFollowers ? '∞' : dataFollowers?.count ?? '∞'}
                    subheader={'GitHub Followers'}
                    hideButton={hideButtons}
                    actionIcon={refreshFollowers ? <CircularProgress color="primary" size={18} sx={{
                        padding: '3px'
                    }}/> : <Refresh/>}
                    actionMenu={() => {
                        setRefreshFollowers(true)
                    }}
                    chart={(dataFollowers?.data ?? []).length > 1 ? {
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
                                min: Math.min(...dataFollowers?.data ?? [0]) - 2,
                                max: Math.max(...dataFollowers?.data ?? [0]) + 2,
                                show: false
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
                                name: 'Followers',
                                data: dataFollowers?.data ?? []
                            }
                        ]
                    } : null}
                />
            </Grid>
            <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={3} rowSpacing={3}>
                    <Grid item xl={12} lg={6} md={6} sm={6} xs={12}>
                        <AppCard
                            type={'inline'}
                            color={'blueLight'}
                            variant={'circles2'}
                            size={'small'}
                            icon={<Interests/>}
                            hideButton={hideButtons}
                            isLoading={(loadingProjects || errorProjects) && !refreshProjects}
                            title={refreshProjects ? '∞' : dataProjects?.count ?? '∞'}
                            subheader={'Published projects on the website'}
                            actionIcon={refreshProjects ? <CircularProgress color="primary" size={18} sx={{
                                padding: '3px'
                            }}/> : <Refresh/>}
                            actionMenu={() => {
                                setRefreshProjects(true)
                            }}
                        />
                    </Grid>
                    <Grid item xl={12} lg={6} md={6} sm={6} xs={12}>
                        <AppCard
                            type={'inline'}
                            color={'yellow'}
                            variant={'circles2'}
                            size={'small'}
                            icon={<Description/>}
                            hideButton={hideButtons}
                            isLoading={(loadingArticles || errorArticles) && !refreshArticles}
                            title={refreshArticles ? '∞' : dataArticles?.count ?? '∞'}
                            subheader={'Published articles on the website'}
                            actionIcon={refreshArticles ? <CircularProgress color="secondary" size={18} sx={{
                                padding: '3px'
                            }}/> : <Refresh/>}
                            actionMenu={() => {
                                setRefreshArticles(true)
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xl={8} lg={8} md={6} sm={12} xs={12} style={{}}>
                <AppCard
                    type={'page'}
                    color={'green'}
                    variant={'circles3'}
                    icon={<CalendarMonth/>}
                    hideButton={hideButtons}
                    isLoading={(loadingReposTypes || errorReposTypes) && !refreshReposTypes}
                    title={'Repos Types by Month'}
                    size={'small'}
                    contentHeight={530}
                    actionIcon={refreshReposTypes ? <CircularProgress color="success" size={18} sx={{
                        padding: '3px'
                    }}/> : <Refresh/>}
                    actionMenu={() => {
                        setRefreshReposTypes(true)
                    }}
                >
                    <Chart {...{
                        height: hideButtons ? 486 : 517,
                        type: 'bar',
                        options: {
                            colors: ['#008FFB', '#00E396', '#787878', '#FF4560'],
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
                                name: 'Web',
                                data: dataReposTypes?.web ?? []
                            },
                            {
                                name: 'Android',
                                data: dataReposTypes?.android ?? []
                            },
                            {
                                name: 'iOS',
                                data: dataReposTypes?.ios ?? []
                            },
                            {
                                name: 'Other',
                                data: dataReposTypes?.other ?? []
                            }
                        ]
                    }} />
                </AppCard>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} style={{}}>
                <AppCard
                    type={'page'}
                    color={'blue'}
                    variant={'circles3'}
                    icon={<TrendingUp/>}
                    size={'small'}
                    contentHeight={531}
                    hideButton={hideButtons}
                    isLoading={(loadingReposPopular || errorReposPopular)}
                    title={'Popular Repos'}
                    actionIcon={refreshReposPopular ? <CircularProgress color="primary" size={18} sx={{
                        padding: '3px'
                    }}/> : <Refresh/>}
                    actionMenu={() => {
                        setRefreshReposPopular(true)
                    }}
                >
                    <div style={{height: '10px'}}/>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Stack spacing={2}>
                                {(dataReposPopular ?? []).map((item, index) => (
                                    <Stack key={`item-${item.name}`} spacing={1}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Stack direction={'row'}>

                                                    <a href={item.html_url} target={'_blank'}>
                                                        <Avatar
                                                            variant="rounded"
                                                            sx={{
                                                                marginTop: '2px',
                                                                width: 16,
                                                                height: 16,
                                                                borderRadius: '5px',
                                                                backgroundColor: palette.primary.main,
                                                                marginRight: 1,
                                                            }}
                                                        >
                                                            <OpenInNew fontSize="small" sx={{
                                                                width: '12px',
                                                                height: '12px'
                                                            }}/>
                                                        </Avatar>
                                                    </a>

                                                    <Typography variant="h7">
                                                        {item.name
                                                            .replace("android-", "")
                                                            .replace("kmm-", "")
                                                            .replace("yii2-", "")
                                                            .replace("api-", "")
                                                        }
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item>
                                                <Stack direction={'row'}>
                                                    <Typography variant="h7">
                                                        {item.stargazers_count}
                                                    </Typography>

                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            marginTop: '2px',
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: '5px',
                                                            backgroundColor: '#00c853',
                                                            marginLeft: 1.875,
                                                        }}
                                                    >
                                                        <Star fontSize="small" sx={{
                                                            width: '12px',
                                                            height: '12px'
                                                        }}/>
                                                    </Avatar>
                                                </Stack>
                                            </Grid>
                                        </Grid>

                                        <Typography variant="caption" sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 1,
                                        }}>
                                            {item.description}
                                        </Typography>

                                        {index !== dataReposPopular.length - 1 ? <Divider sx={{my: 1.5}}/> : null}

                                    </Stack>
                                ))}
                            </Stack>
                        </Grid>

                        {hideButtons ? (
                            <Grid item xs={12} sx={{
                                textAlign: 'center'
                            }}>
                                <div style={{height: '5px'}}/>
                            </Grid>
                        ): (
                            <Grid item xs={12} sx={{
                                textAlign: 'center'
                            }}>
                                <div style={{height: '5px'}}/>
                                <Button
                                    size={"small"}
                                    variant="outlined"
                                    endIcon={<NavigateNext/>}
                                    onClick={() => {
                                        route.openUrlNewTab('https://github.com/keygenqt?tab=repositories')
                                    }}
                                >
                                    View All
                                </Button>
                            </Grid>
                        )}

                    </Grid>
                </AppCard>
            </Grid>

            <Grid item xs={12} sx={{
                textAlign: 'right',
                'svg': {
                    paddingRight: '7px'
                }
            }}>
                <Fab variant="extended" size="small" color="primary" onClick={() => {
                    setHideButtons(!hideButtons)
                }}>
                    {hideButtons ? (
                        <VisibilityRounded />
                    ) : (
                        <VisibilityOffRounded />
                    )}

                    {hideButtons ? (
                        "Show buttons"
                    ) : (
                        "Hide buttons"
                    )}

                </Fab>
            </Grid>


        </Grid>
    );
}

DashboardPage.propTypes = {};