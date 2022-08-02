import * as React from 'react';
import {AppMenu, AppTopBar} from "../components";
import PropTypes from "prop-types";
import {Button, Grid} from "@mui/material";

export function BaseLayout(props) {

    const [isOpenMenu, setIsOpenMenu] = React.useState(null);

    return (
        <Grid container spacing={0} rowSpacing={0} style={{
            height: '100%'
        }}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <AppTopBar onChangeMenu={() => {
                    setIsOpenMenu(!isOpenMenu)
                }}/>
            </Grid>

            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{
                height: 'calc(100% - 64px)'
            }}>
                <AppMenu isOpen={isOpenMenu} onChangeMenu={(isOpen) => {
                    setIsOpenMenu(isOpen)
                }} content={props.children}>
                    <Grid container spacing={2} style={{
                        padding: 20
                    }}>
                        <Grid item xs={12}>
                            <Button variant="contained" href="#contained-buttons" style={{
                                width: '100%'
                            }}>
                                Menu test 1
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" href="#contained-buttons" style={{
                                width: '100%'
                            }}>
                                Menu test 2
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" href="#contained-buttons" style={{
                                width: '100%'
                            }}>
                                Menu test 3
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" href="#contained-buttons" style={{
                                width: '100%'
                            }}>
                                Menu test 4
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" href="#contained-buttons" style={{
                                width: '100%'
                            }}>
                                Menu test 5
                            </Button>
                        </Grid>
                    </Grid>
                </AppMenu>
            </Grid>
        </Grid>
    )
}

BaseLayout.propTypes = {
    children: PropTypes.element.isRequired
};