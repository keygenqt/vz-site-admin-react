import {Route} from "react-router-dom";
import {BaseLayout} from "../../../layouts";
import {BlogPage, BlogsPage, DashboardPage, ProjectPage, ProjectsPage} from "../../../features/web/mypsite";
import * as React from "react";
import {RouteType} from "../RouteType";

export const routePS = {
    dashboard: {
        title: 'Adminka | PS',
        path: '/',
        render: function (key, path, title) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <DashboardPage title={title}/>
                    </BaseLayout>
                }
            />
        }
    },
    blogCreate: {
        title: 'Adminka | PS',
        path: '/ps/blog/add',
        render: function (key, path, title) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <BlogPage title={title}/>
                    </BaseLayout>
                }
            />
        }
    },
    blogUpdate: {
        title: 'Adminka | PS',
        path: '/ps/blog/:id',
        match: {
            id: RouteType.integer,
        },
        render: function (key, path, title) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <BlogPage title={title}/>
                    </BaseLayout>
                }
            />
        }
    },
    blogs: {
        title: 'Adminka | PS',
        path: '/ps/blog',
        render: function (key, path, title) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <BlogsPage title={title}/>
                    </BaseLayout>
                }
            />
        }
    },
    project: {
        title: 'Adminka | PS',
        path: '/ps/project/:id',
        render: function (key, path, title) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <ProjectPage title={title}/>
                    </BaseLayout>
                }
            />
        }
    },
    projects: {
        title: 'Adminka | PS',
        path: '/ps/projects',
        render: function (key, path, title) {
            return <Route
                key={key}
                exact
                path={path}
                element={
                    <BaseLayout>
                        <ProjectsPage title={title}/>
                    </BaseLayout>
                }
            />
        }
    },
}