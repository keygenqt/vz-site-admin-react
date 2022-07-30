import * as React from 'react';
import {useContext, useEffect} from 'react';
import {Container, Stack, Typography, Zoom} from "@mui/material";
import {AppContext} from "../../base";

export function HomePage(props) {

    const {route} = useContext(AppContext)

    useEffect(() => {
        document.title = props.title;
    });

    return (
        <Container maxWidth={"sm"} className={"Page HomePage"}>
            <Stack alignItems={"center"} spacing={2}>
                <Zoom timeout={1000} in={true}>
                    <Typography variant="h3">
                        Home page
                    </Typography>
                </Zoom>
            </Stack>
        </Container>
    );
}