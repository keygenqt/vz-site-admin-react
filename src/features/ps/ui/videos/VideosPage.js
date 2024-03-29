import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Avatar, CircularProgress, Grid, useTheme} from "@mui/material";
import {AddOutlined, Refresh, ViewListOutlined} from "@mui/icons-material";
import {AppCard, AppGridData, SnackbarError, SplitButton} from "../../../../components";
import {ConstantOther, MethodsRequest, NavigateContext, useRequest} from "../../../../base";


export function VideosPage() {

    const theme = useTheme()
    const {route, conf} = useContext(NavigateContext)
    const [refresh, setRefresh] = useState(false)
    const {loading, data, error} = useRequest(MethodsRequest.ps.videos, refresh);

    useEffect(() => {
        if (!loading && refresh) {
            setRefresh(false)
        }
    }, [loading]);

    return (
        <>
            <SnackbarError error={error}/>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SplitButton
                        color={theme.palette.success.main}
                        size={'medium'}
                        startIcon={<AddOutlined/>}
                        onClick={() => {
                            route.toLocation(conf.routes.ps.videoCreate)
                        }}
                    >
                        Add
                    </SplitButton>
                </Grid>
                <Grid item xs={12}>
                    <AppCard
                        type={'page'}
                        color={'blueLight'}
                        variant={'circles4'}
                        icon={<ViewListOutlined/>}
                        title={'Videos'}
                        actionDisable={refresh}
                        actionIcon={refresh ? <CircularProgress color="primary" size={18} sx={{
                            padding: '3px'
                        }}/> : <Refresh/>}
                        actionMenu={() => {
                            setRefresh(true)
                        }}
                    >
                        <AppGridData
                            loading={loading}
                            checkboxSelection={false}
                            rows={data ?? []}
                            columns={[
                                {
                                    field: 'id',
                                    headerName: 'ID',
                                    width: 80,
                                    disableColumnMenu: true,
                                    sortable: false,
                                },
                                {
                                    field: 'image',
                                    headerName: 'Icon',
                                    width: 80,
                                    disableColumnMenu: true,
                                    sortable: false,
                                    renderCell: (params) => <Avatar
                                        alt={params.row.title}
                                        src={params.row.image}
                                        sx={{width: 24, height: 24}}
                                    />
                                },
                                {
                                    field: 'title',
                                    headerName: 'Title',
                                    width: 0,
                                    minWidth: 200,
                                    editable: true,
                                },
                                {
                                    field: 'createAt',
                                    headerName: 'Created',
                                    width: 180,
                                    valueGetter: (params) => new Intl
                                        .DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })
                                        .format(params.row.createAt)
                                }
                            ]}
                            onClickView={(e, id, row) => {
                                route.openUrlNewTab(row.url)
                            }}
                            onClickEdit={(e, id) => {
                                route.toLocation(route.createLink(conf.routes.ps.videoUpdate, id))
                            }}
                        />
                    </AppCard>
                </Grid>
            </Grid>
        </>
    );
}

VideosPage.propTypes = {};