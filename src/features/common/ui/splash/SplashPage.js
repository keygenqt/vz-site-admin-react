import * as React from 'react';
import {useContext, useEffect} from 'react';
import {Container, Stack} from "@mui/material";
import {ConstantAuth, ConstantLottie, MethodsRequest, NavigateContext} from "../../../../base";
import PropTypes from "prop-types";
import Lottie from "lottie-react";

export function SplashPage({title, done}) {

    const {route, conf} = useContext(NavigateContext)

    useEffect(() => {

        document.title = title;

        const fetchDataSecret = async () => {
            try {
                const response = await MethodsRequest.common.secret()
                await new Promise(r => setTimeout(r, 1000));
                return response
            } catch (error) {
                console.log(error)
            }
        }

        fetchDataSecret().then((response) => {
            // set secret
            ConstantAuth.secret = response.secret
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
        })
    });

    return (
        <Container maxWidth={"sm"} className={"ErrorPage"}>
            <Stack alignItems={"center"} spacing={2}>
                <Lottie style={{
                    width: 250
                }} animationData={ConstantLottie.splash_loading}/>
            </Stack>
        </Container>
    );
}

SplashPage.propTypes = {
    title: PropTypes.string,
    done: PropTypes.func,
};