import {Card, CardContent, Grid, Skeleton, Stack} from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";

export function SkeletonNormal(props) {

    const {
        isAction = false,
        isChart = false,
    } = props

    return (<Card variant={"outlined"} sx={{
        '& .MuiCardContent-root': {
            padding: '16px !important'
        }
    }}>
        <CardContent>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Skeleton variant="rectangular" width={40} height={40}/>
                        </Grid>
                        <Grid item>
                            {isAction ? <Skeleton variant="circular" width={40} height={40}/> : null}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>

                    <Grid container spacing={3} sx={{paddingTop: 1}}>
                        <Grid item xs={5}>
                            <Stack spacing={1} sx={{paddingTop: 1, paddingBottom: '9px'}}>
                                <Skeleton variant="rectangular" height={41}/>
                                <Skeleton variant="rectangular" height={19}/>
                            </Stack>
                        </Grid>
                        <Grid item xs={7}>
                            {isChart ? <Skeleton variant="rectangular" height={85}/> : null}
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </CardContent>
    </Card>)
}

SkeletonNormal.propTypes = {
    isAction: PropTypes.bool,
    isChart: PropTypes.bool,
};