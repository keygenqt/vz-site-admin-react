import * as React from "react";
import {Button, useTheme} from "@mui/material";
import PropTypes from "prop-types";

export function SplitButton(props) {

    const theme = useTheme()

    const {
        type,
        disabled,
        color = theme.palette.primary.main,
        startIcon,
        endIcon,
        size = 'medium',
        onClick,
    } = props

    return (
        <>
            <Button
                type={type}
                disabled={disabled}
                onClick={onClick}
                variant="contained"
                size={size}
                endIcon={endIcon}
                startIcon={startIcon}
                sx={{
                    '&': {
                        overflow: 'hidden',
                        backgroundColor: color,
                        borderRadius: 1
                    },
                    '&:hover': {
                        backgroundColor: color,
                    },
                    '&.MuiButton-sizeSmall': {
                        paddingLeft: startIcon ? '40px' : 'auto',
                        paddingRight: endIcon ? '40px' : 'auto'
                    },
                    '&.MuiButton-sizeMedium': {
                        paddingLeft: startIcon ? '50px' : 'auto',
                        paddingRight: endIcon ? '50px' : 'auto'
                    },
                    '&.MuiButton-sizeLarge': {
                        paddingLeft: startIcon ? '60px' : 'auto',
                        paddingRight: endIcon ? '60px' : 'auto'
                    },
                    '& .MuiButton-startIcon': {
                        backgroundColor: '#00000038',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        margin: 0
                    },
                    '& .MuiButton-endIcon': {
                        backgroundColor: '#00000038',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        margin: 0
                    },
                    '& .MuiSvgIcon-root': {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        margin: '0 auto'
                    },
                    '& .MuiButton-iconSizeSmall': {
                        paddingTop: '6px',
                        width: '30px',
                    },
                    '& .MuiButton-iconSizeMedium': {
                        paddingTop: '8px',
                        width: '36px',
                    },
                    '& .MuiButton-iconSizeLarge': {
                        paddingTop: '10px',
                        width: '40px',
                    },
                }}>
                {props.children}
            </Button>
        </>
    );
}

SplitButton.propTypes = {
    color: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    startIcon: PropTypes.element,
    endIcon: PropTypes.element,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
};