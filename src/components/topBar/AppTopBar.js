import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from "prop-types";
import {
    Avatar,
    Chip,
    ClickAwayListener,
    Fade,
    Grid,
    Paper,
    Popper,
    Switch,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {ConstantImage} from "../../base/constants/ConstantImage";
import {SettingsOutlined} from "@mui/icons-material";
import {AppCard} from "../card/AppCard";
import {useState} from "react";
import {useWindowResize} from "../../base";

function Transitions(props: { onEnter: () => {}, in: boolean, onExited: () => {} }) {
    return null;
}

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
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [sdm, setSdm] = useState(true);

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    useWindowResize(() => {
        setOpen(false)
    })

    return (
        <Box sx={{flexGrow: 0}} style={{
            zIndex: 2000,
            position: 'relative'
        }}>
            <AppBar position="static" color={'inherit'} elevation={0}>
                <Toolbar disableGutters sx={{
                    minHeight: 64,
                    paddingLeft: '20px',
                    paddingRight: '20px',
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

                    <Chip
                        sx={{
                            alignItems: 'center',
                            height: '40px',
                            borderRadius: '27px',
                            border: 'none',
                            backgroundColor: open ? theme.palette.primary.main : theme.palette.primary.light,
                            transition: isOpenMenu && isMD ? 'all 0s ease-in-out' : 'all 0.2s ease-in-out',
                            '& .MuiChip-label': {
                                paddingLeft: isOpenMenu && isMD ? 0.6 : 2
                            },
                            '& svg': {
                                color: open ? theme.palette.primary.light : theme.palette.primary.main,
                                transition: 'all .2s ease-in-out',
                            },
                            '&:hover': isOpenMenu && isMD ? null : {
                                borderColor: theme.palette.primary.main,
                                background: `${theme.palette.primary.main}!important`,
                                '& svg': {
                                    color: theme.palette.primary.light,
                                },
                            },
                        }}
                        aria-describedby={id}
                        avatar={<Avatar sx={{paddingLeft: 1}} src={ConstantImage.common.default_user_avatar}/>}
                        label={isOpenMenu && isMD ? null : <SettingsOutlined sx={{width: 18}}/>}
                        variant="outlined"
                        onClick={isOpenMenu && isMD ? null : (event) => {
                            setAnchorEl(event.currentTarget);
                            event.stopPropagation();
                            setOpen((previousOpen) => !previousOpen);
                        }}
                    />

                    <ClickAwayListener onClickAway={() => {
                        setOpen(false);
                    }}>
                        <Popper
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            transition
                            disablePortal
                            placement="bottom-end"
                            role={undefined}
                            popperOptions={{
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [2, 10]
                                        }
                                    }
                                ]
                            }}
                        >
                            {({TransitionProps}) => (
                                <Fade {...TransitionProps} timeout={isOpenMenu && isMD ? 0 : 350}>
                                    <Paper style={{
                                        boxShadow: 'rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 5px 8px 0px, rgb(0 0 0 / 12%) 0px 1px 14px 0px',
                                    }}>
                                        <AppCard
                                            title={'Good Morning!'}
                                            size={'small'}
                                            color={'success'}
                                            style={{
                                                border: 'none',
                                                minWidth: 300
                                            }}
                                        >
                                            <Box sx={{
                                                backgroundColor: theme.palette.primary.light,
                                                borderRadius: 3,
                                                padding: 2
                                            }}>
                                                <Grid container spacing={2} direction="column">
                                                    <Grid item>
                                                        <Grid item container alignItems="center" justifyContent="space-between">
                                                            <Grid item>
                                                                <Typography variant="subtitle1">Theme dark</Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Switch
                                                                    color="primary"
                                                                    checked={sdm}
                                                                    onChange={(e) => setSdm(e.target.checked)}
                                                                    name="sdm"
                                                                    size="small"
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </AppCard>
                                    </Paper>
                                </Fade>
                            )}
                        </Popper>
                    </ClickAwayListener>



                </Toolbar>
            </AppBar>
        </Box>
    );
}

AppTopBar.propTypes = {
    isOpenMenu: PropTypes.bool,
    onChangeMenu: PropTypes.func
};