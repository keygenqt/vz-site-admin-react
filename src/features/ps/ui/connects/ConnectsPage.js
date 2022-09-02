import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {CircularProgress, Grid, Switch} from "@mui/material";
import {Mail, Refresh, ViewListOutlined} from "@mui/icons-material";
import {AppCard, AppGridData, SnackbarError} from "../../../../components";
import {MethodsRequest, NavigateContext, useRequest} from "../../../../base";
import {MethodsPS} from "../../services/MethodsPS";

const icons = {
    Mail
}

export function ConnectsPage() {

    const {route} = useContext(NavigateContext)
    const [refresh, setRefresh] = useState(false)
    const {loading, data, error} = useRequest(MethodsRequest.ps.connects, refresh);

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
                    <AppCard
                        type={'page'}
                        color={'blueLight'}
                        variant={'circles4'}
                        icon={<ViewListOutlined/>}
                        title={'Articles'}
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
                            pageSize={12}
                            rows={data ?? []}
                            columns={[
                                {
                                    field: 'email',
                                    headerName: 'Email',
                                    width: 0,
                                    minWidth: 200,
                                    editable: true,
                                },
                                {
                                    field: 'isSent',
                                    headerName: 'Is Send',
                                    width: 100,
                                    disableColumnMenu: true,
                                    sortable: false,
                                    renderCell: (params) => {
                                        return <Switch
                                            sx={{
                                                marginLeft: '-4px',
                                            }}
                                            checked={Boolean(params.row.isSent)}
                                            onChange={(event, checked) => {
                                                MethodsRequest.ps.connectUpdate(params.row.id, {
                                                    email: params.row.email,
                                                    locale: params.row.locale,
                                                    isSent: checked,
                                                })
                                                params.row.isSent = checked
                                                setRefresh(true)
                                            }}
                                        />
                                    }
                                },
                                {
                                    field: 'locale',
                                    headerName: 'Locale',
                                    width: 110,
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
                                },
                            ]}
                            onCustom={{
                                label: 'Send',
                                icon: icons.Mail,
                                iconColor: '#2196f3',
                                backgroundColor: '#2196f314',
                                backgroundColorHover: '#2196f32e',
                                onClick: (e, id, row) => {
                                    route.openUrl(`mailto:${row.email}?subject=${
                                        row.locale === 'RU-ru' ? (
                                            'Привет! Получите распишитесь :)'
                                        ) : (
                                            'Hello! You wanted my resume :)'
                                        )
                                    }`)
                                }
                            }}
                        />

                    </AppCard>
                </Grid>
            </Grid>
        </>
    );
}

ConnectsPage.propTypes = {};