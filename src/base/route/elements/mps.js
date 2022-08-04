import {Route} from "react-router-dom";
import {BaseLayout} from "../../../layouts";
import {BlogPage, BlogsPage, DashboardPage, ProjectPage, ProjectsPage} from "../../../features/web/mypsite";
import * as React from "react";

export const mps = {
    dashboard: {
        title: 'Adminka | MPS',
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
    blog: {
        title: 'Adminka | MPS',
        path: '/mps/blog/:id',
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
        title: 'Adminka | MPS',
        path: '/mps/blog',
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
        title: 'Adminka | MPS',
        path: '/mps/project/:id',
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
        title: 'Adminka | MPS',
        path: '/mps/projects',
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