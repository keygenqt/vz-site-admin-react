import {Route} from "react-router-dom";
import {BaseLayout} from "../../../layouts";
import {
    ArticlePage,
    ArticlesPage,
    ConnectsPage,
    DashboardPage,
    ProjectPage,
    ProjectsPage,
    UploadsPage
} from "../../../features/ps/ui";
import * as React from "react";
import {RouteType} from "../RouteType";

export const routePS = {
    dashboard: {
        path: '/',
        render: function (key, path) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <DashboardPage/>
                    </BaseLayout>
                }
            />
        }
    },
    blogCreate: {
        path: '/ps/article/add',
        render: function (key, path) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <ArticlePage/>
                    </BaseLayout>
                }
            />
        }
    },
    blogUpdate: {
        path: '/ps/article/:id',
        match: {
            id: RouteType.integer,
        },
        render: function (key, path) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <ArticlePage/>
                    </BaseLayout>
                }
            />
        }
    },
    blogs: {
        path: '/ps/articles',
        render: function (key, path) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <ArticlesPage/>
                    </BaseLayout>
                }
            />
        }
    },
    projectCreate: {
        path: '/ps/project/add',
        render: function (key, path) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <ProjectPage/>
                    </BaseLayout>
                }
            />
        }
    },
    projectUpdate: {
        path: '/ps/project/:id',
        match: {
            id: RouteType.integer,
        },
        render: function (key, path) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <ProjectPage/>
                    </BaseLayout>
                }
            />
        }
    },
    projects: {
        path: '/ps/projects',
        render: function (key, path) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <ProjectsPage/>
                    </BaseLayout>
                }
            />
        }
    },
    uploads: {
        role: 'ADMIN',
        path: '/ps/uploads',
        render: function (key, path) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <UploadsPage/>
                    </BaseLayout>
                }
            />
        }
    },
    connects: {
        role: 'ADMIN',
        path: '/ps/connects',
        render: function (key, path) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <ConnectsPage/>
                    </BaseLayout>
                }
            />
        }
    },
}