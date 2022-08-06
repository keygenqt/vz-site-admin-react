import * as React from 'react';
import {useEffect} from 'react';
import {Grid, useMediaQuery, useTheme} from "@mui/material";
import PropTypes from "prop-types";
import {AddOutlined, DeleteOutline, EditOutlined, ViewListOutlined, VisibilityOutlined} from "@mui/icons-material";
import {AppCard} from "../../../../components";
import {DataGrid, GridActionsCellItem, GridCellParams, GridToolbar} from '@mui/x-data-grid';
import {SplitButton} from "../../../../components/buttons/SplitButton";
import clsx from 'clsx';

const gridColumnsClasses = {
    headerClassName: (params: GridCellParams<number>) => {
        return clsx('super-app', {
            fullWith: params.colDef.width === 0,
        })
    },
    cellClassName: (params: GridCellParams<number>) => {
        return clsx('super-app', {
            fullWith: params.colDef.width === 0,
        })
    },
}

const columns = [
    {
        ...gridColumnsClasses,
        field: 'id',
        headerName: 'ID',
        width: 100,
    },
    {
        ...gridColumnsClasses,
        field: 'firstName',
        headerName: 'First name',
        width: 0,
        minWidth: 200,
        editable: true,
    },
    {
        ...gridColumnsClasses,
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        disableColumnMenu: true,
        sortable: false,
        width: 0,
        minWidth: 200,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        ...gridColumnsClasses,
        field: 'age',
        headerName: 'Age',
        width: 120
    },
    {
        ...gridColumnsClasses,
        field: 'actions',
        type: 'actions',
        width: 130,
        getActions: () => [
            <GridActionsCellItem color="success" icon={<VisibilityOutlined/>} label="Edit"/>,
            <GridActionsCellItem color="primary" icon={<EditOutlined/>} label="Edit"/>,
            <GridActionsCellItem color="error" icon={<DeleteOutline/>} label="Delete"/>,
        ],
    },
];

const rows = [
    {id: 1, lastName: 'Snow', firstName: 'Jonsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf', age: 35},
    {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
    {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
    {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
    {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
    {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
    {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
    {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 14, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 15, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 16, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 17, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 18, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 20, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 21, lastName: 'Roxie', firstName: 'Harvey', age: 65},
];

export function BlogsPage({title}) {

    const theme = useTheme()

    useEffect(() => {
        document.title = title;
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SplitButton
                    color={theme.palette.success.main}
                    size={'large'}
                    startIcon={<AddOutlined/>}
                >
                    Add
                </SplitButton>
            </Grid>
            <Grid item xs={12}>
                <AppCard
                    iconType={'page'}
                    icon={<ViewListOutlined/>}
                    title={'Blogs Page'}
                    size={'small'}
                    color={'success'}
                    actionMenu={() => {

                    }}
                >
                    <DataGrid
                        checkboxSelection
                        disableSelectionOnClick
                        disableColumnSelector
                        disableColumnFilter
                        autoHeight
                        rows={rows}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[15]}
                        sx={{
                            '& .MuiDataGrid-main': {
                                width: '100%'
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                width: '100%',
                                backgroundColor: '#00000014'
                            },
                            '& .MuiDataGrid-columnHeaders .MuiDataGrid-columnSeparator': {
                                display: 'none'
                            },
                            '& .MuiDataGrid-columnHeaders .MuiDataGrid-menuIcon': {
                                paddingRight: 1
                            },
                            '& .MuiDataGrid-columnHeaders .MuiCheckbox-root': {
                                padding: '14px'
                            },
                            '& .MuiDataGrid-columnHeadersInner': {
                                width: '100%'
                            },
                            '& .MuiDataGrid-columnHeader.fullWith': {
                                width: '100% !important',
                                maxWidth: '100% !important'
                            },
                            '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
                                outline: 'none'
                            },

                            '& .MuiDataGrid-virtualScrollerRenderZone': {
                                width: '100%',
                            },
                            '& .MuiDataGrid-row': {
                                width: '100%',
                            },
                            '& .MuiDataGrid-cell.fullWith': {
                                width: '100% !important',
                                maxWidth: '100% !important'
                            },
                            '& .MuiDataGrid-cell:last-child:not(.super-app)': {
                                display: 'none'
                            },
                            '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                                outline: 'none'
                            }
                        }}
                    />
                </AppCard>
            </Grid>
        </Grid>
    );
}

BlogsPage.propTypes = {
    title: PropTypes.string,
};