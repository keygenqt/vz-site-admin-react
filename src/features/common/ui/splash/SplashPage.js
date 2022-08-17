import * as React from 'react';
import {useContext, useEffect} from 'react';
import {Container, Stack} from "@mui/material";
import {ConstantAuth, ConstantLottie, NavigateContext} from "../../../../base";
import PropTypes from "prop-types";
import Lottie from "lottie-react";

export function SplashPage({done}) {

    const {route, conf} = useContext(NavigateContext)

    useEffect(() => {
        setTimeout(() => {
            // emit disable start
            done()
            // open page after start
            if (ConstantAuth.isAuth()) {
                if (route.isPage(conf.routes.common.signIn)) {
                    route.toLocation(conf.routes.ps.dashboard)
                } else {
                    route.refreshLocation()
                }
            } else {
                route.toLocation(conf.routes.common.signIn)
            }
        }, 1000)
    });

    return (
        <Container maxWidth={"sm"}>
            <Stack alignItems={"center"} spacing={2}>
                <Lottie style={{
                    width: 250
                }} animationData={ConstantLottie.splash_loading}/>
            </Stack>
        </Container>
    );
}

SplashPage.propTypes = {
    done: PropTypes.func,
};