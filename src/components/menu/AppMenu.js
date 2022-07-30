import * as React from 'react';
import {useContext} from 'react';
import {AppContext} from "../../base";
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';

/**
 * Top bar fot app with adaptive layout
 *
 * @returns {JSX.Element}
 */
export function AppMenu() {

    const {route} = useContext(AppContext)

    return (
        <MenuList style={{
            width: 320,
            marginLeft: 20
        }}>
            <MenuItem>
                <ListItemIcon>
                    <ContentCut fontSize="small"/>
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
                <Typography variant="body2" color="text.secondary">
                    ⌘X
                </Typography>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <ContentCopy fontSize="small"/>
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
                <Typography variant="body2" color="text.secondary">
                    ⌘C
                </Typography>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <ContentPaste fontSize="small"/>
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
                <Typography variant="body2" color="text.secondary">
                    ⌘V
                </Typography>
            </MenuItem>
            <Divider/>
            <MenuItem>
                <ListItemIcon>
                    <Cloud fontSize="small"/>
                </ListItemIcon>
                <ListItemText>Web Clipboard</ListItemText>
            </MenuItem>
        </MenuList>
    );
}