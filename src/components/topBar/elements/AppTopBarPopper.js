import {Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack} from "@mui/material";
import {ExitToAppOutlined, ManageAccounts, Person, SettingsOutlined} from "@mui/icons-material";
import {AppCard} from "../../card/AppCard";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {isMobile} from 'react-device-detect';
import {ConstantAuth} from "../../../base";

export function AppTopBarPopper() {
    return (
        <React.Fragment>
            <AppCard
                type={'inline'}
                color={'blue'}
                variant={'circles3'}
                title={'Good Morning!'}
                icon={ConstantAuth.getRole() === 'ADMIN' ? <ManageAccounts/> : <Person/>}
                subheader={ConstantAuth.getEmail()}
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
                        <ListItemButton sx={{display: 'none' /* @todo */}}>
                            <ListItemIcon>
                                <SettingsOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="body2">Account Settings</Typography>}/>
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            ConstantAuth.logout()
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