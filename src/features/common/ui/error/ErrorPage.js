import * as React from 'react';
import {Container, Stack, Typography, Zoom} from "@mui/material";

export function ErrorPage() {
    return (
        <Container maxWidth={"sm"}>
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

ErrorPage.propTypes = {};