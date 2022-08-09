import * as React from "react";
import {Backdrop, CircularProgress} from "@mui/material";

export function LoaderPage() {
    return (<Backdrop
        sx={{
            backgroundColor: '#ffffff78',
            color: (theme) => theme.palette.primary.dark,
            position: 'absolute',
            zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
    >
        <CircularProgress color="inherit"/>
    </Backdrop>)
}

LoaderPage.propTypes = {};