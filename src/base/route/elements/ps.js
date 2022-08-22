import {Route} from "react-router-dom";
import {BaseLayout} from "../../../layouts";
import {BlogPage, BlogsPage, DashboardPage, ProjectPage, ProjectsPage} from "../../../features/ps/ui";
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
        path: '/ps/blog/add',
        render: function (key, path) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <BlogPage/>
                    </BaseLayout>
                }
            />
        }
    },
    blogUpdate: {
        path: '/ps/blog/:id',
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
                        <BlogPage/>
                    </BaseLayout>
                }
            />
        }
    },
    blogs: {
        path: '/ps/blog',
        render: function (key, path) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <BlogsPage/>
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
}