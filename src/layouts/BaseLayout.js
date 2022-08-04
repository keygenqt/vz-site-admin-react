import * as React from 'react';
import {AppCard, AppMenu, AppTopBar} from "../components";
import PropTypes from "prop-types";
import {Grid, LinearProgress, Typography, useTheme} from "@mui/material";
import {MenuLayout} from "./MenuLayout";
import {linearProgressClasses} from "@mui/material/LinearProgress";

export function BaseLayout(props) {

    const {palette} = useTheme();

    const [isOpenMenu, setIsOpenMenu] = React.useState(null);

    return (
        <Grid container spacing={0} rowSpacing={0} style={{
            height: '100%'
        }}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <AppTopBar
                    isOpenMenu={isOpenMenu}
                    onChangeMenu={() => {
                        setIsOpenMenu(!isOpenMenu)
                    }}
                />
            </Grid>

            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{
                height: 'calc(100% - 64px)'
            }}>
                <MenuLayout isOpen={isOpenMenu} onChangeMenu={(isOpen) => {
                    setIsOpenMenu(isOpen)
                }} content={props.children}>
                    <AppMenu>
                        <AppCard
                            isLoading={false}
                            title={'Total Income'}
                            subheader={'100GB'}
                            size={'small'}
                            color={'blue'}
                        >
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Typography component="div" variant="caption" sx={{
                                        fontWeight: 'bold',
                                        color: palette.primary.dark
                                    }}>
                                        Progress
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{
                                    textAlign: 'right'
                                }}>
                                    <Typography component="div" variant="caption">
                                        70%
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <LinearProgress variant="determinate" value={70} sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                            backgroundColor: palette.primary.light,
                                        },
                                        [`& .${linearProgressClasses.bar}`]: {
                                            borderRadius: 5,
                                            backgroundColor: palette.primary.dark,
                                        },
                                    }}/>
                                </Grid>
                            </Grid>
                        </AppCard>
                    </AppMenu>
                </MenuLayout>
            </Grid>
        </Grid>
    )
}

BaseLayout.propTypes = {
    children: PropTypes.element.isRequired
};