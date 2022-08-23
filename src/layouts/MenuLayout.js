import * as React from 'react';
import {Box, Grid, useMediaQuery, useTheme} from "@mui/material";
import PropTypes from "prop-types";
import corner15 from "../assets/images/common/corner15.png";
import {isMobile} from 'react-device-detect';

/**
 * Top bar fot app with adaptive layout
 *
 * @returns {JSX.Element}
 */
export function MenuLayout(props) {

    const {
        isOpen = true,
        menuWidth = isMobile ? 270 : 300,
        menuBackgroundColor = 'white',
        contentBackgroundColor = '#e3f2fd',
        content = <div/>,
        onCloseMenu
    } = props

    const {breakpoints} = useTheme();
    const isMD = useMediaQuery(breakpoints.down('md'));

    return (
        <Box sx={{
            position: 'relative',
            minHeight: '100%',
            background: contentBackgroundColor
        }}>
            <div onClick={() => {
                if (onCloseMenu) {
                    onCloseMenu(false)
                }
            }} style={{
                display: isOpen && isMD ? 'block' : 'none',
                backgroundColor: 'black',
                position: 'absolute',
                opacity: isOpen ? 0.5 : 0,
                top: 0,
                left: 0,
                right: -20,
                bottom: 0,
                zIndex: 1099,
                transitionDuration: '300ms',
            }}/>

            <div style={{
                position: 'absolute',
                height: 14,
                width: 14,
                top: 0,
                marginLeft: isOpen ? menuWidth : 0,
                backgroundImage: `url(${corner15})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                zIndex: 1099,
                transitionDuration: '300ms',
            }}/>

            <div style={{
                position: 'absolute',
                right: 0,
                height: 14,
                width: 14,
                top: 0,
                backgroundImage: `url(${corner15})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                transform: 'rotate(90deg)'
            }}/>

            <div style={{
                backgroundColor: menuBackgroundColor,
                position: 'absolute',
                top: 0,
                left: isOpen ? 0 : menuWidth * -1,
                width: menuWidth,
                bottom: 0,
                transitionDuration: '300ms',
                margin: 0,
                zIndex: 1100,
                overflow: 'auto'
            }}>
                {props.children}
            </div>

            <Grid container spacing={0} rowSpacing={0} style={{
                paddingLeft: isOpen && !isMD ? menuWidth : 0,
                paddingRight: 0,
                height: '100%',
                transitionDuration: '300ms'
            }}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{
                    padding: 20
                }}>
                    {content}
                </Grid>
            </Grid>
        </Box>
    );
}

MenuLayout.propTypes = {
    isOpen: PropTypes.bool,
    menuWidth: PropTypes.number,
    menuBackgroundColor: PropTypes.string,
    contentBackgroundColor: PropTypes.string,
    content: PropTypes.element,
    children: PropTypes.element.isRequired,
    onCloseMenu: PropTypes.func
};