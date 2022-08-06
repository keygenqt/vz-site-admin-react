import * as React from 'react';
import {useEffect} from 'react';
import {Grid, useTheme} from "@mui/material";
import PropTypes from "prop-types";
import {AddOutlined, ViewListOutlined} from "@mui/icons-material";
import {AppCard} from "../../../../components";
import {SplitButton} from "../../../../components/buttons/SplitButton";
import {AppGridData} from "../../../../components/gridData/AppGridData";

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 110,
    },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 0,
        minWidth: 200,
        editable: true,
    },
    {
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
        field: 'age',
        headerName: 'Age',
        width: 124
    }
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
                    size={'medium'}
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
                >
                    <AppGridData
                        checkboxSelection={true}
                        rows={rows}
                        columns={columns}
                        onClickView={(e, id) => {
                            console.log(id)
                        }}
                        onClickEdit={(e, id) => {
                            console.log(id)
                        }}
                        onClickDelete={(e, id) => {
                            console.log(id)
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