import {Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack} from "@mui/material";
import {ExitToAppOutlined, SettingsOutlined} from "@mui/icons-material";
import {AppCard} from "../../card/AppCard";
import Typography from "@mui/material/Typography";
import * as React from "react";

export function AppTopBarPopper() {

    return (
        <React.Fragment>
            <AppCard
                type={'inline'}
                color={'blue'}
                variant={'circles3'}
                title={'Good Morning!'}
                style={{
                    border: 'none',
                    minWidth: 300
                }}
            >
                <Stack spacing={2}>
                    <Divider/>
                    <List

                        component="nav"
                        sx={{
                            width: '100%',
                            // selected and (selected + hover) states
                            '& .MuiListItemButton-root': {
                                borderRadius: 2,
                            },
                            // hover states
                            '& .MuiListItemButton-root:hover': {
                                bgcolor: '#ebebeb78',
                            },

                        }}
                    >
                        <ListItemButton
                        >
                            <ListItemIcon>
                                <SettingsOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="body2">Account Settings</Typography>}/>
                        </ListItemButton>
                        <ListItemButton
                        >
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