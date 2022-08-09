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
    ViewListOutlined,
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
    SettingsOutlined,
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
                    icon: icons.ViewListOutlined,
                    title: 'Blog',
                },
                {
                    route: RouteConf.routes.ps.projects,
                    type: 'primary',
                    icon: icons.ViewListOutlined,
                    title: 'Projects',
                },
                {
                    type: 'driver'
                },
                {
                    link: 'https://version2.keygenqt.com/',
                    type: 'secondary',
                    icon: icons.LinkOutlined,
                    title: 'Go To',
                },
            ]
        },
        {
            icon: icons.YouTube,
            title: 'YT Download',
            color: '#ff4545',
            children: [
                {
                    type: 'primary',
                    icon: icons.DashboardOutlined,
                    title: 'Dashboard',
                },
                {
                    type: 'primary',
                    icon: icons.SettingsOutlined,
                    title: 'Settings',
                },
                {
                    type: 'driver'
                },
                {
                    type: 'secondary',
                    icon: icons.LinkOutlined,
                    title: 'Go to App',
                },
            ]
        },
    ]
};