import {Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack} from "@mui/material";
import {ExitToAppOutlined, SettingsOutlined} from "@mui/icons-material";
import {AppCard} from "../../card/AppCard";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {isMobile} from 'react-device-detect';
import {useContext} from "react";
import {AppContext} from "../../../base";

export function AppTopBarPopper() {

    const {route, conf} = useContext(AppContext)

    return (
        <React.Fragment>
            <AppCard
                type={'inline'}
                color={'blue'}
                variant={'circles3'}
                title={'Good Morning!'}
                style={{
                    border: 'none',
                    minWidth: isMobile ? 250 : 300
                }}
            >
                <Stack spacing={2}>
                    <Divider/>
                    <List
                        component="nav"
                        sx={{
                            width: '100%',
                            '& .MuiListItemButton-root': {
                                borderRadius: 2,
                            },
                            // hover states
                            '& .MuiListItemButton-root:hover': {
                                bgcolor: '#ebebeb78',
                            },

                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <SettingsOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="body2">Account Settings</Typography>}/>
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            route.toLocation(conf.routes.common.signIn)
                        }}>
                            <ListItemIcon>
                                <ExitToAppOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="body2">Logout</Typography>}/>
                        </ListItemButton>
                    </List>
                </Stack>
            </AppCard>
        </React.Fragment>
    );
}