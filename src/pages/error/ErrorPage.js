import * as React from 'react';
import {useContext, useEffect} from 'react';
import {Container, Stack, Typography, Zoom} from "@mui/material";
import {AppContext} from "../../base";
import PropTypes from "prop-types";
import {AppCard} from "../../components";

export function ErrorPage({title}) {

    const {route} = useContext(AppContext)

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