import * as React from 'react';
import {useContext, useEffect} from 'react';
import {
    Avatar,
    Collapse,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Typography,
    useTheme
} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

import {AppContext} from "../../base";
import {web} from "./elements/web";
import {pc} from "./elements/pc";
import {android} from "./elements/android";

/**
 * Data menu
 */
export const menuItems = {
    items: [web, pc, android]
};

/**
 * Top bar fot app with adaptive layout
 *
 * @returns {JSX.Element}
 */
export function AppMenu(props) {

    const {route} = useContext(AppContext)
    const {palette} = useTheme();
    const [open, setOpen] = React.useState([]);
    const [pageSelected, setPageSelected] = React.useState(null);
    const [isAnimateCollapse, setIsAnimateCollapse] = React.useState(false);

    const handleClick = (index) => {
        if (open.includes(index)) {
            setOpen(open.filter(function (value) {
                return value !== index;
            }))
        } else {
            setOpen(open.concat([index]))
        }
    };

    useEffect(() => {
        menuItems.items.forEach((data, indexGroup) => {
            data.children.forEach((app, indexApp) => {
                const idApp = `app-item-${indexGroup}-${indexApp}`
                app.children.forEach((page, indexPage) => {
                    const idPage = `icon-page-item-${indexGroup}-${indexApp}-${indexPage}`
                    const isSelected = route.isPage(page.route)
                    if (isSelected) {
                        setOpen(open.concat([idApp]))
                        setPageSelected(idPage)
                        setTimeout(function () {
                            setIsAnimateCollapse(true)
                        }, 50);
                    }
                })
            })
        })
    }, [pageSelected]);

    const listGroups = []

    menuItems.items.forEach((data, indexGroup) => {

        const listApps = []

        data.children.forEach((app, indexApp) => {

            const IconApp = app.icon;
            const idApp = `app-item-${indexGroup}-${indexApp}`

            const listPages = []

            if (app.children) {
                app.children.forEach((page, indexPage) => {

                    const IconPage = page.icon;
                    const idPage = `icon-page-item-${indexGroup}-${indexApp}-${indexPage}`

                    const onClickPage = () => {
                        if (page.route) {
                            route.toLocation(page.route)
                            setPageSelected(idPage)
                        }
                        if (page.link) {
                            route.openUrlNewTab(page.link)
                        }
                    }

                    switch (page.type) {
                        case 'primary':
                            listPages.push(
                                <ListItemButton selected={pageSelected === idPage} key={idPage} sx={{ml: 4}}
                                                onClick={onClickPage}>
                                    <ListItemIcon>
                                        <IconPage/>
                                    </ListItemIcon>
                                    <ListItemText primary={page.title}/>
                                </ListItemButton>
                            )
                            break;
                        case 'secondary':
                            listPages.push(
                                <ListItemButton selected={pageSelected === idPage} key={idPage} sx={{ml: 4}}
                                                onClick={onClickPage}>
                                    <ListItemIcon>
                                        <IconPage/>
                                    </ListItemIcon>
                                    <ListItemText secondary={page.title}/>
                                </ListItemButton>
                            )
                            break;
                        case 'driver':
                            listPages.push(
                                <Divider key={idPage} sx={{my: 0.5, ml: 4}}/>
                            )
                            break;
                        default:
                            console.log("Error type menu: " + page.type)
                    }
                })
            }

            listApps.push(
                <React.Fragment key={idApp}>
                    <ListItemButton selected={open.includes(idApp)} onClick={() => {
                        handleClick(idApp)
                    }}>
                        <ListItemIcon>
                            <Avatar variant="circular" sx={{
                                width: 30,
                                height: 30,
                                backgroundColor: 'white',
                                border: '1px solid ' + palette.grey.A200,
                            }}>
                                <IconApp style={{
                                    width: 20,
                                    color: app.color
                                }}/>
                            </Avatar>

                        </ListItemIcon>
                        <ListItemText primary={app.title}/>
                        {open.includes(idApp) ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>

                    <Collapse in={open.includes(idApp)} timeout={!isAnimateCollapse ? 0 : 'auto'} unmountOnExit>
                        <List component="div">
                            {listPages}
                        </List>
                    </Collapse>
                </React.Fragment>
            );
        });

        listGroups.push(
            <React.Fragment key={`group-item-${indexGroup}`}>
                <List
                    sx={{
                        width: '100%',
                        // selected and (selected + hover) states
                        '& .MuiListItemButton-root': {
                            borderRadius: 2,
                        },
                        // selected and (selected + hover) states
                        '&& .Mui-selected, && .Mui-selected:hover': {
                            bgcolor: palette.primary.light,
                            '& .MuiListItemIcon-root': {
                                color: palette.primary.dark,
                            },
                        },
                        // hover states
                        '& .MuiListItemButton-root:hover': {
                            bgcolor: palette.grey.A100,
                        },

                        '&& .MuiCollapse-root .Mui-selected': {
                            bgcolor: 'white',
                            '& .MuiListItemIcon-root': {
                                color: palette.primary.dark,
                            },
                        },
                        '&& .MuiCollapse-root .Mui-selected:hover': {
                            bgcolor: palette.grey.A100
                        },

                    }}

                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            <Typography component="div" variant="h7" sx={{
                                lineHeight: 2
                            }}>
                                {data.group}
                            </Typography>
                        </ListSubheader>
                    }
                >
                    {listApps}
                </List>

                {menuItems.items.length === indexGroup + 1 ? null : <Divider sx={{my: 1.5}}/>}

            </React.Fragment>
        )
    })

    return (
        <React.Fragment>
            <Grid container spacing={2} style={{
                padding: 20
            }}>
                <Grid item xs={12}>
                    {listGroups}
                </Grid>
                <Grid item xs={12}>
                    {props.children}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

AppMenu.propTypes = {};