import {Route} from "react-router-dom";
import {BaseLayout, GuestLayout} from "../../../layouts";
import {BlogPage, BlogsPage, DashboardPage, ProjectPage, ProjectsPage} from "../../../features/web/mypsite";
import * as React from "react";
import {RouteType} from "../RouteType";
import {SignInPage} from "../../../features/common/signIn/SignInPage";

export const routeCommon = {
    signIn: {
        title: 'Adminka | SignIn',
        path: '/login',
        render: function (key, path, title) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <GuestLayout>
                        <SignInPage title={title}/>
                    </GuestLayout>
                }
            />
        }
    }
}