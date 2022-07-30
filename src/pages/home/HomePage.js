import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Grid, Stack} from "@mui/material";
import {AppContext} from "../../base";
import {CardChart} from "../../components";

export function HomePage(props) {

    const {route} = useContext(AppContext)

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        document.title = props.title;
    });

    return (
        <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid item xl={4} lg={6} md={6} sm={6} xs={6}>
                    <CardChart index={1} color={'blue'}/>
                </Grid>
                <Grid item xl={4} lg={6} md={6} sm={6} xs={6}>
                    <CardChart  index={2}  color={'purple'}/>
                </Grid>
                <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xl={12} lg={6} md={6} sm={6} xs={6}>
                            <CardChart  index={3}  color={'blueLite'}/>
                        </Grid>
                        <Grid item xl={12} lg={6} md={6} sm={6} xs={6}>
                            <CardChart  index={4}  color={'yellow'}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xl={8} lg={6} md={6} sm={6} xs={6}>
                    <CardChart  index={888881}  color={'yellow'}/>
                </Grid>
                <Grid item xl={4} lg={6} md={6} sm={6} xs={6}>
                    <CardChart  index={888882}  color={'yellow'}/>
                </Grid>
            </Grid>
        </Grid>
    );
}