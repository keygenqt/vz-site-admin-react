import {Card, CardContent, Grid, Skeleton, Stack} from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";

export function SkeletonSmall(props) {

    const {
        isIcon = false,
        isIconSmall = false,
        isTitle = false,
        isSubheader = false,
        isAction = false,
        contentHeight = 0,
    } = props

    return (<Card variant={"outlined"}  sx={{
        '& .MuiCardContent-root': {
            padding: '16px !important'
        }
    }}>
        <CardContent className={"AppCardSkeleton"}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" >
                        <Grid item>
                            <Stack direction={'row'} spacing={1}>

                                {isIcon ? <Skeleton variant="rectangular" width={isIconSmall ? 30 : 40}
                                                    height={isIconSmall ? 30 : 40}/> : null}

                                <Stack spacing={1}>
                                    {isTitle ? <Skeleton variant="rectangular" height={16} width={100} style={{
                                        marginTop: isSubheader === false ? isIconSmall ? (isIcon ? 6 : 12) : 13 : null
                                    }}/> : null}
                                    {isSubheader ? <Skeleton variant="rectangular" height={15} width={100} style={{
                                        marginTop: isTitle === false ? isIconSmall ? 7 : 12 : null
                                    }}/> : null}
                                </Stack>
                            </Stack>
                        </Grid>

                        <Grid item>
                            {isAction ? <Skeleton variant="circular" width={40} height={40}/> : <div style={{width: 40, height: 40}}/>}
                        </Grid>

                        {contentHeight > 0 ? (
                            <Grid item xs={12} style={{
                                paddingTop: 10
                            }}>
                                <Skeleton variant="rectangular" height={contentHeight}/>
                            </Grid>
                        ) : null}

                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>)
}

SkeletonSmall.propTypes = {
    contentHeight: PropTypes.number,
    isTitle: PropTypes.bool,
    isSubheader: PropTypes.bool,
    isAction: PropTypes.bool,
    isIcon: PropTypes.bool,
    isIconSmall: PropTypes.bool,
};