import * as React from 'react';
import {useEffect} from 'react';
import {Grid, useMediaQuery, useTheme} from "@mui/material";
import PropTypes from "prop-types";
import corner15 from "../assets/images/common/corner15.png";
import {useWindowResize} from "../base";
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
        paddingTop = 64,
        menuBackgroundColor = 'white',
        contentBackgroundColor = '#e3f2fd',
        content = <div/>,
        onCloseMenu
    } = props

    const size = useWindowResize();
    const {breakpoints} = useTheme();
    const isMD = useMediaQuery(breakpoints.down('md'));

    const [scrollHeight, setScrollHeight] = React.useState(document.body.scrollHeight);

    useEffect(() => {
        if (isMD) {
            if (isOpen) {
                document.body.style.overflow = 'hidden';
                if (document.body.offsetHeight < document.body.scrollHeight && !isMobile) {
                    document.body.style.width = 'calc(100% - 15px)';
                }
                window.scrollTo(0, 0);
            } else {
                document.body.style.width = '100%';
                document.body.style.overflow = 'auto';
            }
        }
    }, [isOpen, isMD]);

    useEffect(() => {
        setScrollHeight(document.body.scrollHeight)
    }, [size])

    return (
        <React.Fragment>
            <div onClick={() => {
                if (onCloseMenu) {
                    onCloseMenu(false)
                }
            }} style={{
                display: isOpen && isMD ? 'block' : 'none',
                backgroundColor: 'black',
                position: 'absolute',
                opacity: isOpen ? 0.5 : 0,
                top: paddingTop,
                left: 0,
                right: 0,
                bottom: -200,
                zIndex: 1099,
                transitionDuration: '300ms',
            }}/>

            <div style={{
                position: 'absolute',
                height: 10,
                width: 10,
                top: paddingTop,
                marginLeft: isOpen ? menuWidth : 0,
                backgroundImage: `url(${corner15})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                zIndex: 1099,
                transitionDuration: '300ms',
            }}/>

            <div style={{
                backgroundColor: menuBackgroundColor,
                position: 'absolute',
                top: paddingTop,
                left: isOpen ? 0 : menuWidth * -1,
                width: menuWidth,
                height: isMD ? 'auto' : scrollHeight - paddingTop,
                bottom: !isMD ? 'auto' : 0,
                transitionDuration: '300ms',
                margin: 0,
                zIndex: 1100,
                overflow: 'auto',
                borderBottomRightRadius: 13
            }}>
                {props.children}
            </div>

            <Grid container spacing={0} rowSpacing={0} style={{
                paddingLeft: isOpen && !isMD ? menuWidth : 20,
                paddingRight: 20,
                height: '100%',
                transitionDuration: '300ms'
            }}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{
                    backgroundColor: contentBackgroundColor,
                    padding: 20,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15
                }}>
                    {content}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

MenuLayout.propTypes = {
    isOpen: PropTypes.bool,
    paddingTop: PropTypes.number,
    menuWidth: PropTypes.number,
    menuBackgroundColor: PropTypes.string,
    contentBackgroundColor: PropTypes.string,
    content: PropTypes.element,
    children: PropTypes.element.isRequired,
    onCloseMenu: PropTypes.func
};