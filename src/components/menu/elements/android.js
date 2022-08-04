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

export const android = {
    group: 'Android',
    children: [
        {
            icon: icons.GitHub,
            title: 'GitHubViewer',
            color: '#33393c',
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
        {
            icon: icons.ConnectedTv,
            title: 'Tvgram',
            color: '#6FC6FE',
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
        }
    ]
};