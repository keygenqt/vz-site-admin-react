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

export const pc = {
    group: 'Linux',
    children: [
        {
            icon: icons.VerticalSplit,
            title: 'Changeln',
            color: '#4527A0',
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