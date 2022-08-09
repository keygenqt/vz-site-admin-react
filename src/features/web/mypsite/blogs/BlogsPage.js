import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Avatar, Grid, useTheme} from "@mui/material";
import PropTypes from "prop-types";
import {AddOutlined, ViewListOutlined} from "@mui/icons-material";
import {AppCard, AppGridData, SplitButton} from "../../../../components";
import {AppContext, ConstantOther} from "../../../../base";

const rows = [
    {
        id: 1,
        icon: 'https://keygenqt.com/images/blog/601076d399c15.jpg',
        title: 'Алгоритмы. Основы.',
        create_at: 1659881551
    },
    {
        id: 2,
        icon: 'https://keygenqt.com/images/blog/5ef881c28b6c6.jpg',
        title: 'Плохо написанные хорошие задачи.',
        create_at: 1659881551
    },
    {
        id: 3,
        icon: 'https://keygenqt.com/images/blog/5e6e70713347a.jpg',
        title: 'Дурные привычки.',
        create_at: 1659881551
    },
    {
        id: 4,
        icon: 'https://keygenqt.com/images/blog/5eb1e22f20315.jpg',
        title: 'Количество станет качеством.',
        create_at: 1659881551
    },
    {
        id: 5,
        icon: 'https://keygenqt.com/images/blog/5ec6e29c20719.jpg',
        title: 'Ментальная усталость.',
        create_at: 1659881551
    },
    {
        id: 6,
        icon: 'https://keygenqt.com/images/blog/5ee7e4486df16.jpg',
        title: 'Становление философии.',
        create_at: 1659881551
    },
    {
        id: 7,
        icon: 'https://keygenqt.com/images/blog/5ed26eec8b8cd.jpg',
        title: 'Оптимизация процессов.',
        create_at: 1659881551
    },
    {
        id: 8,
        icon: 'https://keygenqt.com/images/blog/5e5d66c8b82dc.jpg',
        title: 'Логика. Основы.',
        create_at: 1659881551
    },
    {
        id: 9,
        icon: 'https://keygenqt.com/images/blog/5f0519630f1dd.jpg',
        title: 'Деградируй или проиграешь.',
        create_at: 1659881551
    },
    {
        id: 10,
        icon: 'https://keygenqt.com/images/blog/5e5d656a012f7.jpg',
        title: 'Красная шапочка.',
        create_at: 1659881551
    },
    {
        id: 11,
        icon: 'https://keygenqt.com/images/blog/5e5d5f715bb0d.jpg',
        title: 'Безумие прогресса.',
        create_at: 1659881551
    },
    {
        id: 12,
        icon: 'https://keygenqt.com/images/blog/5e5d6042aa75b.jpg',
        title: 'Когда ты хороший.',
        create_at: 1659881551
    },
    {
        id: 13,
        icon: 'https://keygenqt.com/images/blog/5e5e06b1245c3.jpg',
        title: 'Смотрите под ноги.',
        create_at: 1659881551
    },
    {
        id: 14,
        icon: 'https://keygenqt.com/images/blog/5e5e0d10466c7.jpg',
        title: 'Философский пароход.',
        create_at: 1659881551
    },
    {
        id: 15,
        icon: 'https://keygenqt.com/images/blog/5e5cc904a805d.jpg',
        title: 'Углеродная форма.',
        create_at: 1659881551
    },
    {
        id: 16,
        icon: 'https://keygenqt.com/images/blog/5e5d6662883b3.jpg',
        title: 'Работа над собой.',
        create_at: 1659881551
    },
    {
        id: 17,
        icon: 'https://keygenqt.com/images/blog/5ea5d50695947.jpg',
        title: 'Пчелиный рой.',
        create_at: 1659881551
    },
];

export function BlogsPage({title}) {

    const theme = useTheme()
    const {route, conf} = useContext(AppContext)
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        document.title = title;

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
                    onClick={() => {
                        route.toLocation(conf.routes.ps.blogCreate)
                    }}
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
                    title={'Blogs Page'}
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

BlogsPage.propTypes = {
    title: PropTypes.string,
};