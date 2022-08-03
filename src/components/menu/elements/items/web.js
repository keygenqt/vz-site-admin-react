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

export const web = {
    group: 'Web',
    children: [
        {
            icon: icons.CoPresent,
            title: 'Private Site',
            color: '#1e88e5',
            children: [
                {
                    selected: true,
                    type: 'primary',
                    icon: icons.DashboardOutlined,
                    title: 'Dashboard',
                },
                {
                    type: 'primary',
                    icon: icons.ViewListOutlined,
                    title: 'Blog',
                },
                {
                    type: 'primary',
                    icon: icons.ViewListOutlined,
                    title: 'Projects',
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