import * as React from 'react';
import {useEffect, useState} from 'react';
import {Avatar, Box, CircularProgress, Grid, Stack} from "@mui/material";
import {
    Adjust, AdjustOutlined,
    CheckCircle,
    CheckCircleOutline,
    Done,
    FilePresent,
    RadioButtonChecked, RadioButtonUnchecked,
    Refresh,
    ViewListOutlined
} from "@mui/icons-material";
import {AppCard, AppGridData, SnackbarError} from "../../../../components";
import {MethodsRequest, useRequest} from "../../../../base";
import {MultipleFiles} from "../../../../components/dropzone/MultipleFiles";
import {AppUtils} from "../../../../base/utils/AppUtils";
import {FileDialog} from "../../../../components/dialogs/FileDialog";


export function UploadsPage() {

    const [refresh, setRefresh] = useState(false)
    const {loading, data, error} = useRequest(MethodsRequest.ps.uploadFiles, refresh);
    const [rows, setRows] = useState([])
    const [loadingUpload, setLoadingUpload] = useState(false)

    const [response, setResponse] = React.useState(null);

    useEffect(() => {
        if (!loading) {
            setRows(data)
        }
        if (!loading && refresh) {
            setRefresh(false)
        }
    }, [loading, data]);

    return (
        <>
            <SnackbarError error={error}/>

            <FileDialog
                open={Boolean(response)}
                response={response}
                onClose={() => {
                    setResponse(null)
                }}
            />

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

                        <Stack spacing={2}>

                            <MultipleFiles
                                disabled={loadingUpload || loading}
                                disabledChips={true}
                                value={[]}
                                onChange={(files) => {
                                    setRows(files.concat(rows))
                                    // setRows(files.concat(rows).sort(function (x, y) {
                                    //     return y.createAt - x.createAt;
                                    // }))
                                }}
                                onLoading={(state) => {
                                    setLoadingUpload(state)
                                }}
                            />

                            <AppGridData
                                loading={loading}
                                checkboxSelection={false}
                                pageSize={12}
                                rows={rows}
                                columns={[
                                    {
                                        field: 'listImage',
                                        headerName: 'Icon',
                                        width: 80,
                                        disableColumnMenu: true,
                                        sortable: false,
                                        renderCell: (params) => {
                                            return (<Avatar
                                                alt={params.row.originalFileName}
                                                src={AppUtils.isImage(params.row.fileMime) ? AppUtils.getUrl(params.row.fileName) : null}
                                                sx={{
                                                    width: 30,
                                                    height: 30,
                                                    border: '1px solid #bfbfbf',
                                                    backgroundColor: 'white'
                                                }}>
                                                <FilePresent sx={{
                                                    fontSize: '17px',
                                                    color: '#7c7c7c'
                                                }}/>
                                            </Avatar>)
                                        }
                                    },
                                    {
                                        field: 'originalFileName',
                                        headerName: 'Original File Name',
                                        width: 0,
                                        minWidth: 200,
                                        editable: true,
                                    },
                                    {
                                        field: 'isRelationArticle',
                                        headerName: 'Is Article',
                                        width: 110,
                                        editable: true,
                                        disableColumnMenu: true,
                                        renderCell: (params) => {
                                            return <Box
                                                sx={{
                                                    '& svg': {
                                                        paddingTop: '8px',
                                                        paddingLeft: '15px',
                                                        fontSize: '24px',
                                                    }
                                                }}
                                            >
                                                {
                                                    params.row.isRelationArticle ? (
                                                        <AdjustOutlined fontSize="inherit" color={"success"}/>
                                                    ) : (
                                                        <RadioButtonUnchecked fontSize="inherit" sx={{
                                                            color: '#919191'
                                                        }}/>
                                                    )
                                                }
                                            </Box>
                                        }
                                    },
                                    {
                                        field: 'isRelationProject',
                                        headerName: 'Is Project',
                                        width: 110,
                                        editable: true,
                                        disableColumnMenu: true,
                                        renderCell: (params) => {
                                            return <Box
                                                sx={{
                                                    '& svg': {
                                                        paddingTop: '8px',
                                                        paddingLeft: '15px',
                                                        fontSize: '24px',
                                                    }
                                                }}
                                            >
                                                {
                                                    params.row.isRelationProject ? (
                                                        <AdjustOutlined fontSize="inherit" color={"success"}/>
                                                    ) : (
                                                        <RadioButtonUnchecked fontSize="inherit" sx={{
                                                            color: '#919191'
                                                        }}/>
                                                    )
                                                }
                                            </Box>
                                        }
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
                                onClickView={(e, id, row) => {
                                    setResponse(row)
                                }}
                                onClickDelete={(e, id, row) => {
                                    MethodsRequest.ps.deleteFile(row.fileName)
                                    setRows(rows.filter(function (e) {
                                        return e !== row
                                    }))
                                }}
                            />
                        </Stack>

                    </AppCard>
                </Grid>
            </Grid>
        </>
    );
}

UploadsPage.propTypes = {};