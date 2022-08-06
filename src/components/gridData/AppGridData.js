import PropTypes from "prop-types";
import {DataGrid, GridActionsCellItem, GridCellParams} from "@mui/x-data-grid";
import * as React from "react";
import clsx from "clsx";
import {DeleteOutline, EditOutlined, VisibilityOutlined} from "@mui/icons-material";

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
            <GridActionsCellItem color="success" sx={{
                backgroundColor: '#07a94a14',
                transitionDuration: '300ms',
                '&:hover': {
                    backgroundColor: '#07a94a2e',
                }
            }} icon={<VisibilityOutlined/>} label="Edit"/>,
            <GridActionsCellItem color="primary" sx={{
                backgroundColor: '#2196f314',
                transitionDuration: '300ms',
                '&:hover': {
                    backgroundColor: '#2196f32e',
                }
            }} icon={<EditOutlined/>} label="Edit"/>,
            <GridActionsCellItem color="error" sx={{
                backgroundColor: '#d32f2f14',
                transitionDuration: '300ms',
                '&:hover': {
                    backgroundColor: '#d32f2f2e',
                }
            }} icon={<DeleteOutline/>} label="Delete"/>,
        ],
    },
];

export function AppGridData(props) {

    const {
        checkboxSelection = true,
        columns = [],
        rows = [],
        onClickView,
        onClickEdit,
        onClickDelete,
    } = props

    const columnsMap = columns.map((item) => {
        return {...item, ...gridColumnsClasses}
    });

    if (onClickView || onClickEdit || onClickDelete) {
        let actions = [];
        if (onClickView) {
            actions.push(<GridActionsCellItem color="success" sx={{
                backgroundColor: '#07a94a14',
                transitionDuration: '300ms',
                '&:hover': {
                    backgroundColor: '#07a94a2e',
                }
            }} icon={<VisibilityOutlined/>} label="Edit"/>)
        }
        if (onClickEdit) {
            actions.push(<GridActionsCellItem color="primary" sx={{
                backgroundColor: '#2196f314',
                transitionDuration: '300ms',
                '&:hover': {
                    backgroundColor: '#2196f32e',
                }
            }} icon={<EditOutlined/>} label="Edit"/>,)
        }
        if (onClickDelete) {
            actions.push(<GridActionsCellItem color="error" sx={{
                backgroundColor: '#d32f2f14',
                transitionDuration: '300ms',
                '&:hover': {
                    backgroundColor: '#d32f2f2e',
                }
            }} icon={<DeleteOutline/>} label="Delete"/>)
        }

        columnsMap.push({
            ...gridColumnsClasses,
            field: 'actions',
            type: 'actions',
            width: 40 * actions.length,
            getActions: () => actions,
        })
    }

    return (
        <DataGrid
            checkboxSelection={checkboxSelection}
            disableSelectionOnClick
            disableColumnSelector
            disableColumnFilter
            autoHeight
            rows={rows}
            columns={columnsMap}
            pageSize={12}
            rowsPerPageOptions={[12]}
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
    )
}

AppGridData.propTypes = {
    checkboxSelection: PropTypes.bool,
    columns: PropTypes.array,
    rows: PropTypes.array,
    onClickView: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
};