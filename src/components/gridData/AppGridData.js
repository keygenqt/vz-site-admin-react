import PropTypes from "prop-types";
import {DataGrid, GridActionsCellItem, GridCellParams} from "@mui/x-data-grid";
import * as React from "react";
import clsx from "clsx";
import {DeleteOutline, EditOutlined, VisibilityOutlined} from "@mui/icons-material";
import {useEffect, useState} from "react";

const gridColumnsClasses = {
    headerClassName: (params: GridCellParams<number>) => {
        return clsx('MuiDataGrid-custom', {
            'MuiDataGrid-fullWith': params.colDef.width === 0,
        })
    },
    cellClassName: (params: GridCellParams<number>) => {
        return clsx('MuiDataGrid-custom', {
            'MuiDataGrid-fullWith': params.colDef.width === 0,
            'MuiDataGrid-lastColumn': params.colDef.lastColumn,
        })
    },
}

export function AppGridData(props) {

    const {
        loading = false,
        checkboxSelection = true,
        columns = [],
        rows = [],
        onClickView,
        onClickEdit,
        onClickDelete,
    } = props

    const [key] = useState(JSON.stringify(columns));
    const [actionPage, setActionPage] = useState(JSON.parse(localStorage.getItem(`page-${key}`)) ?? 0);

    useEffect(() => {
        localStorage.setItem(`page-${key}`, JSON.stringify(actionPage))
    }, [actionPage])

    const columnsMap = columns.map((item, index) => {
        return {
            ...item,
            ...{lastColumn: index === columns.length - 1 && !(onClickView || onClickEdit || onClickDelete)},
            ...gridColumnsClasses
        }
    });

    if (onClickView || onClickEdit || onClickDelete) {
        let actions = [];
        if (onClickView) {
            actions.push(<GridActionsCellItem color="success" onClick={(event) => {
                onClickView(event, event.target.closest('.MuiDataGrid-row').dataset.id)
            }} sx={{
                backgroundColor: '#07a94a14',
                transitionDuration: '300ms',
                '&:hover': {
                    backgroundColor: '#07a94a2e',
                }
            }} icon={<VisibilityOutlined/>} label="Edit"/>)
        }
        if (onClickEdit) {
            actions.push(<GridActionsCellItem color="primary" onClick={(event) => {
                onClickEdit(event, event.target.closest('.MuiDataGrid-row').dataset.id)
            }} sx={{
                backgroundColor: '#2196f314',
                transitionDuration: '300ms',
                '&:hover': {
                    backgroundColor: '#2196f32e',
                }
            }} icon={<EditOutlined/>} label="Edit"/>)
        }
        if (onClickDelete) {
            actions.push(<GridActionsCellItem color="error" onClick={(event) => {
                onClickDelete(event, event.target.closest('.MuiDataGrid-row').dataset.id)
            }} sx={{
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
            width: 40 * actions.length + 20,
            getActions: () => actions,
        })
    }

    return (
        <DataGrid
            loading={loading}
            density={'standard'}
            checkboxSelection={checkboxSelection}
            disableSelectionOnClick
            disableColumnSelector
            disableColumnFilter
            autoHeight
            rows={rows}
            columns={columnsMap}
            pageSize={12}
            page={actionPage}
            onPageChange={(page) => {
                setActionPage(page)
            }}
            rowsPerPageOptions={[12]}
            sx={{
                '&': loading ? {
                    pointerEvents: 'none'
                } : null,
                '& .MuiDataGrid-main': {
                    width: '100%'
                },
                '& .MuiCheckbox-root ': {
                    paddingRight: '10px !important',
                    paddingLeft: ' 0 !important'
                },
                '& .MuiDataGrid-main .MuiDataGrid-columnHeader:first-of-type, & .MuiDataGrid-cell:first-of-type': {
                    paddingLeft: '20px !important'
                },
                '& .MuiDataGrid-main .MuiDataGrid-columnHeader:last-child, & .MuiDataGrid-cell.MuiDataGrid-lastColumn': {
                    paddingRight: '20px !important'
                },
                '& .MuiDataGrid-columnHeaderCheckbox, & .MuiDataGrid-cellCheckbox': {
                    width: '60px !important',
                    minWidth: '60px !important',
                    maxWidth: '60px !important'
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
                '& .MuiDataGrid-columnHeader.MuiDataGrid-fullWith': {
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
                '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'inherit',
                },
                '& .MuiDataGrid-cell.MuiDataGrid-fullWith': {
                    width: '100% !important',
                    maxWidth: '100% !important'
                },
                '& .MuiDataGrid-cell:last-child:not(.MuiDataGrid-custom)': {
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
    loading: PropTypes.bool,
    checkboxSelection: PropTypes.bool,
    columns: PropTypes.array,
    rows: PropTypes.array,
    onClickView: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
};