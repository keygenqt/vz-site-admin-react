import {Route} from "react-router-dom";
import {GuestLayout} from "../../../layouts";
import * as React from "react";
import {SignInPage} from "../../../features/common/ui/signIn/SignInPage";

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