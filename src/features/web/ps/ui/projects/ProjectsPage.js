import * as React from 'react';
import {useEffect, useState} from 'react';
import {Avatar, Grid, useTheme} from "@mui/material";
import PropTypes from "prop-types";
import {AppCard, AppGridData, SplitButton} from "../../../../../components";
import {AddOutlined, ViewListOutlined} from "@mui/icons-material";

const rows = [
    {
        id: 1,
        icon: 'https://keygenqt.com/images/blog/61337b11b1300.jpg',
        title: 'Autoway',
        create_at: 1659881551
    },
    {
        id: 2,
        icon: 'https://keygenqt.com/images/blog/612a101db4c35.jpg',
        title: 'KChat (client)',
        create_at: 1659881551
    },
    {
        id: 3,
        icon: 'https://keygenqt.com/images/blog/612a101269cee.jpg',
        title: 'KChat (server)',
        create_at: 1659881551
    },
    {
        id: 4,
        icon: 'https://keygenqt.com/images/blog/612a0cce4ed06.jpg',
        title: 'Demo Compose РИВ ГОШ',
        create_at: 1659881551
    },
    {
        id: 5,
        icon: 'https://keygenqt.com/images/blog/612a0b5e47e6d.jpg',
        title: 'Firebase Stack',
        create_at: 1659881551
    },
    {
        id: 6,
        icon: 'https://keygenqt.com/images/blog/612a08ad79afd.jpg',
        title: 'Exploring',
        create_at: 1659881551
    },
    {
        id: 7,
        icon: 'https://keygenqt.com/images/blog/612a076507afe.jpg',
        title: 'Auto App Distribution',
        create_at: 1659881551
    },
    {
        id: 8,
        icon: 'https://keygenqt.com/images/blog/60b65ff92ff7d.jpg',
        title: 'GitHub Viewer',
        create_at: 1659881551
    },
    {
        id: 9,
        icon: 'https://keygenqt.com/images/blog/6011ce8e90e52.jpg',
        title: 'BackupZ2',
        create_at: 1659881551
    },
    {
        id: 10,
        icon: 'https://keygenqt.com/images/blog/600fd9d1bdc78.jpg',
        title: 'Changeln',
        create_at: 1659881551
    },
    {
        id: 11,
        icon: 'https://keygenqt.com/images/blog/60052a6bc4a2f.jpg',
        title: 'Screener 2.0',
        create_at: 1659881551
    },
    {
        id: 12,
        icon: 'https://keygenqt.com/images/blog/5fb4be5080358.jpg',
        title: 'MyLibrary',
        create_at: 1659881551
    },
    {
        id: 13,
        icon: 'https://keygenqt.com/images/blog/5ed615b3c5d75.jpg',
        title: 'NumberMask',
        create_at: 1659881551
    },
    {
        id: 14,
        icon: 'https://keygenqt.com/images/blog/5ed35103d38e7.jpg',
        title: 'FancyBox3',
        create_at: 1659881551
    }
];

export function ProjectsPage() {

    const theme = useTheme()
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // @todo demo
        setTimeout(function () {
            setLoading(false)
        }, 1000);
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
                    backdrop={isLoading}
                    type={'page'}
                    color={'blueLight'}
                    variant={'circles4'}
                    icon={<ViewListOutlined/>}
                    title={'Projects Page'}
                    actionMenu={() => {

                    }}
                >
                    <AppGridData
                        checkboxSelection={false}
                        rows={rows}
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
                                field: 'create_at',
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
                                    .format(params.row.create_at * 1000)
                            }
                        ]}
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

ProjectsPage.propTypes = {};