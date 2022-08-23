import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from "prop-types";
import {useMediaQuery, useTheme} from "@mui/material";
import {AppTopBarSettings} from "./elements/AppTopBarSettings";
import {AppTopBarPopper} from "./elements/AppTopBarPopper";

/**
 * Top bar fot app with adaptive layout
 *
 * @returns {JSX.Element}
 */
export function AppTopBar(props) {

    const {
        isOpenMenu,
        onChangeMenu = () => {
        }
    } = props

    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{flexGrow: 0}} style={{
            position: 'relative'
        }}>
            <AppBar position="static" color={'inherit'} elevation={0}>
                <Toolbar disableGutters sx={{
                    minHeight: 64,
                }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                        onClick={onChangeMenu}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        <span style={{color: theme.palette.primary[800]}}>Ad</span>minka
                    </Typography>

                    <Box sx={{flexGrow: 1}}/>

                    <AppTopBarSettings
                        clickable={!(isOpenMenu && isMD)}
                    >
                        <AppTopBarPopper/>
                    </AppTopBarSettings>

                </Toolbar>
            </AppBar>
        </Box>
    );
}

AppTopBar.propTypes = {
    isOpenMenu: PropTypes.bool,
    onChangeMenu: PropTypes.func
};