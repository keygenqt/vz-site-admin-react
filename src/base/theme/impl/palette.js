export const palette = (colors) => {
    return {
        primary: {
            light: colors?.primaryLight,
            main: colors?.primaryMain,
            dark: colors?.primaryDark,
            200: colors?.primary200,
            800: colors?.primary800
        },
        secondary: {
            light: colors?.secondaryLight,
            main: colors?.secondaryMain,
            dark: colors?.secondaryDark,
            200: colors?.secondary200,
            800: colors?.secondary800
        }
    }
}