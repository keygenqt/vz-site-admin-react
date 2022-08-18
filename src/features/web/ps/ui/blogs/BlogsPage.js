import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Avatar, Grid, useTheme} from "@mui/material";
import {AddOutlined, ViewListOutlined} from "@mui/icons-material";
import {AppCard, AppGridData, SplitButton} from "../../../../../components";
import {ConstantOther, MethodsRequest, NavigateContext} from "../../../../../base";

export function BlogsPage() {

    const theme = useTheme()
    const {route, conf} = useContext(NavigateContext)
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (data.length === 0) {
            const fetchData = async () => {
                try {
                    const response = await MethodsRequest.ps.articles()
                    await new Promise(r => setTimeout(r, 1000));
                    return response
                } catch (error) {
                    console.log(error)
                }
            }

            fetchData().then((response) => {
                setData(response)
                setLoading(false)
            })
        }

    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SplitButton
                    color={theme.palette.success.main}
                    size={'medium'}
                    startIcon={<AddOutlined/>}
                    onClick={() => {
                        route.toLocation(conf.routes.ps.blogCreate)
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
                    title={'Blogs Page'}
                    actionMenu={() => {
                    }}
                >
                    <AppGridData
                        loading={isLoading}
                        checkboxSelection={false}
                        rows={data}
                        columns={[
                            {
                                field: 'id',
                                headerName: 'ID',
                                width: 80,
                                disableColumnMenu: true,
                                sortable: false,
                            },
                            {
                                field: 'icon',
                                headerName: 'Icon',
                                width: 80,
                                disableColumnMenu: true,
                                sortable: false,
                                renderCell: (params) => <Avatar
                                    alt={params.row.title}
                                    src={params.row.icon}
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
                                width: 170,
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
                        onClickView={(e, id) => {
                            route.openUrlNewTab(route.createLink(ConstantOther.psBlogViewUrl, id))
                        }}
                        onClickEdit={(e, id) => {
                            route.toLocation(route.createLink(conf.routes.ps.blogUpdate, id))
                        }}
                    />
                </AppCard>
            </Grid>
        </Grid>
    );
}

BlogsPage.propTypes = {};