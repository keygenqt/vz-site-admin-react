import * as React from "react";
import {Route} from "react-router-dom";
import {HomePage} from "../../pages";

export const RouteConf = {
    delay: 200,
    routes: {
        home: {
            index: {
                title: 'Admin Panel',
                route: '/',
                render: function (key, route, title) {
                    return <Route
                        key={key}
                        exact
                        path={route}
                        element={<HomePage title={title}/>}
                    />
                }
            }
        },
    },
}