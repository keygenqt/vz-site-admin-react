import * as React from 'react';
import {useContext, useEffect} from 'react';
import {Container, Stack, Typography, Zoom} from "@mui/material";
import {NavigateContext} from "../../../../base";
import PropTypes from "prop-types";

export function ErrorPage({title}) {

    const {route} = useContext(NavigateContext)

    useEffect(() => {
        document.title = title;
    });

    return (
        <Container maxWidth={"sm"} className={"ErrorPage"}>
            <Stack alignItems={"center"} spacing={2}>
                <Zoom timeout={1000} in={true}>
                    <Typography variant="h3">
                        Error page
                    </Typography>
                </Zoom>
            </Stack>
        </Container>
    );
}

ErrorPage.propTypes = {
    title: PropTypes.string,
};