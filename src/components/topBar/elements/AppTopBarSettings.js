import {Avatar, Chip, ClickAwayListener, Fade, Paper, Popper, useTheme} from "@mui/material";
import {ConstantImage, useWindowResize} from "../../../base";
import {SettingsOutlined} from "@mui/icons-material";
import * as React from "react";
import {useEffect} from "react";
import PropTypes from "prop-types";

export function AppTopBarSettings(props) {

    const {
        clickable,
    } = props

    const theme = useTheme()

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    const sizeWindow = useWindowResize()

    useEffect(() => {
        setOpen(false)
    }, [sizeWindow])

    return (
        <React.Fragment>
            <Chip
                sx={{
                    alignItems: 'center',
                    height: '40px',
                    borderRadius: '27px',
                    border: 'none',
                    backgroundColor: open ? theme.palette.primary.main : theme.palette.primary.light,
                    transition: !clickable ? 'all 0s ease-in-out' : 'all 0.2s ease-in-out',
                    '& .MuiChip-label': {
                        paddingLeft: !clickable ? 0.6 : 2,
                        paddingTop: '1px'
                    },
                    '& svg': {
                        color: open ? theme.palette.primary.light : theme.palette.primary.main,
                        transition: 'all .2s ease-in-out',
                    },
                    '&:hover': !clickable ? null : {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        '& svg': {
                            color: theme.palette.primary.light,
                        },
                    },
                }}
                aria-describedby={id}
                avatar={<Avatar sx={{paddingLeft: 1}} src={ConstantImage.common.default_user_avatar}/>}
                label={!clickable ? null : <SettingsOutlined sx={{width: 18}}/>}
                variant="outlined"
                onClick={!clickable ? null : (event) => {
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
                    sx={{
                        zIndex: 2
                    }}
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
                        <Fade {...TransitionProps} timeout={!clickable ? 0 : 350}>
                            <Paper style={{
                                boxShadow: 'rgb(0 0 0 / 5%) 0px 3px 5px -1px, rgb(0 0 0 / 5%) 0px 5px 8px 0px, rgb(0 0 0 / 5%) 0px 1px 14px 0px',
                            }}>
                                {props.children}
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </ClickAwayListener>
        </React.Fragment>
    );
}

AppTopBarSettings.propTypes = {
    clickable: PropTypes.bool,
    children: PropTypes.element.isRequired
};