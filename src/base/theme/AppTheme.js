import {createTheme} from '@mui/material/styles';

import {palette} from "./impl/palette.js";
import {typography} from "./impl/typography.js";

// assets
import colors from './../../assets/scss/colors.scss';

export const AppTheme = createTheme({
    shadows: [
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none'
    ],
    palette: palette(colors),
    typography: typography(colors),
});