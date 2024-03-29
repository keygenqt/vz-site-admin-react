// assets
import {
    ConnectedTv,
    CoPresent,
    Dashboard,
    DashboardOutlined,
    GitHub,
    LinkOutlined,
    SettingsOutlined,
    VerticalSplit,
    CloudUpload,
    ViewListOutlined,
    ArticleOutlined,
    CellTower,
    YouTube
} from "@mui/icons-material";

import {RouteConf} from "../../../base/route/RouteConf";

// constant
const icons = {
    GitHub,
    CoPresent,
    Dashboard,
    YouTube,
    ConnectedTv,
    VerticalSplit,
    DashboardOutlined,
    ViewListOutlined,
    CloudUpload,
    SettingsOutlined,
    ArticleOutlined,
    CellTower,
    LinkOutlined,
};

export const web = {
    group: 'Web',
    children: [
        {
            icon: icons.CoPresent,
            title: 'Personal Site',
            color: '#1e88e5',
            children: [
                {
                    selected: true,
                    route: RouteConf.routes.ps.dashboard,
                    type: 'primary',
                    icon: icons.DashboardOutlined,
                    title: 'Dashboard',
                },
                {
                    route: RouteConf.routes.ps.blogs,
                    actions: [
                        RouteConf.routes.ps.blogs,
                        RouteConf.routes.ps.blogUpdate,
                        RouteConf.routes.ps.blogCreate,
                    ],
                    type: 'primary',
                    icon: icons.ArticleOutlined,
                    title: 'Articles',
                },
                {
                    route: RouteConf.routes.ps.videos,
                    actions: [
                        RouteConf.routes.ps.videos,
                        RouteConf.routes.ps.videoUpdate,
                        RouteConf.routes.ps.videoCreate,
                    ],
                    type: 'primary',
                    icon: icons.YouTube,
                    title: 'Videos',
                },
                {
                    route: RouteConf.routes.ps.projects,
                    actions: [
                        RouteConf.routes.ps.projects,
                        RouteConf.routes.ps.projectUpdate,
                        RouteConf.routes.ps.projectCreate,
                    ],
                    type: 'primary',
                    icon: icons.ViewListOutlined,
                    title: 'Projects',
                },
                {
                    role: 'ADMIN',
                    route: RouteConf.routes.ps.connects,
                    actions: [
                        RouteConf.routes.ps.connects,
                    ],
                    type: 'primary',
                    icon: icons.CellTower,
                    title: 'Connects',
                },
                {
                    role: 'ADMIN',
                    route: RouteConf.routes.ps.uploads,
                    actions: [
                        RouteConf.routes.ps.uploads,
                    ],
                    type: 'primary',
                    icon: icons.CloudUpload,
                    title: 'Uploads',
                },
                {
                    type: 'driver'
                },
                {
                    link: 'https://keygenqt.com/',
                    type: 'secondary',
                    icon: icons.LinkOutlined,
                    title: 'Go To',
                },
            ]
        },
    ]
};