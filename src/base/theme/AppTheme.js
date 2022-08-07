import {createTheme} from '@mui/material/styles';

import {palette} from "./impl/palette.js";
import {typography} from "./impl/typography.js";

// assets
import colors from './../../assets/scss/colors.scss';

export const AppTheme = createTheme({
    components: {
        MuiPaper: {
            defaultProps: {
                elevation: 0,
                sx: {
                    '&.MuiMenu-paper': {
                        borderRadius: 0,
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                    }
                }
            },
            styleOverrides: {
                rounded: {
                    borderRadius: 15
                }
            },
        },
        MuiButtonBase: {
            defaultProps: {
                sx: {
                    '&.MuiFab-root': {
                        boxShadow: 'none !important'
                    },
                    '&.MuiButton-contained': {
                        boxShadow: 'none !important'
                    }
                }
            },
        },
    },
    palette: palette(colors),
    typography: typography(colors),
});