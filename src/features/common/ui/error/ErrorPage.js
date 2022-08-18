import * as React from 'react';
import {useContext} from 'react';
import {Button, Container, Stack, useMediaQuery, useTheme} from "@mui/material";
import Lottie from "lottie-react";
import {ConstantLottie, NavigateContext} from "../../../../base";
import {NavigateBefore} from "@mui/icons-material";

export function ErrorPage() {

    const {route, conf} = useContext(NavigateContext)
    const {breakpoints} = useTheme();
    const isSM = useMediaQuery(breakpoints.down('sm'));

    return (
        <Container maxWidth={"sm"}>
            <Stack alignItems={"center"} spacing={1}>
                <Lottie animationData={ConstantLottie.bot_error_404} style={{
                    width: isSM ? 200 : 400,
                }}/>

                <Button size={'large'} variant="outlined" startIcon={<NavigateBefore/>} sx={{
                    color: '#0063CC',
                    '& .MuiButton-startIcon': {
                        paddingBottom: '1px'
                    }
                }} onClick={() => {
                    route.toLocation(conf.routes.ps.dashboard)
                }}>
                    Back to site
                </Button>

            </Stack>
        </Container>
    );
}

ErrorPage.propTypes = {};