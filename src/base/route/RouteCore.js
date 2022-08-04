import * as React from "react";
import {ScrollToTop} from "../../components";
import {Route, Routes} from "react-router-dom";
import {GuestLayout} from "../../layouts";
import {ErrorPage} from "../../features/error/ErrorPage";

export default class RouteCore {

    /**
     * @param location {H.LocationState}
     * @param navigate {NavigateFunction}
     * @param conf route object with params
     */
    constructor(location, navigate, conf) {
        this.location = location;
        this.navigate = navigate;
        this.conf = conf;
    }

    /**
     * Get path with check object or string
     *
     * @param route
     *
     * @return string
     */
    getPathFromObject(route) {
        if (typeof route === 'string' || route instanceof String) {
            return route
        } else {
            if (route === undefined) {
                return ""
            } else if (route.path !== undefined) {
                return route.path
            } else {
                return ""
            }
        }
    }

    /**
     * Open page
     *
     * @param route {String | Object}
     * @param arg
     *
     * @returns {(function(): void)|*}
     */
    toLocation(route, ...arg) {
        const path = this.getPathFromObject(route)
        if (this.isPage(path)) {
            this.navigate(0)
        } else {
            this.navigate(this.createLink(path, arg));
        }
    }

    /**
     * Open page with delay
     *
     * @param route {String | Object}
     * @param arg
     *
     * @returns {(function(): void)|*}
     */
    toLocationDelay(route, ...arg) {
        if (route === undefined) {
            return
        }
        const self = this
        const path = this.getPathFromObject(route)
        setTimeout(function () {
            if (self.isPage(path)) {
                self.navigate(0)
            } else {
                self.navigate(self.createLink(path, arg));
            }
        }, this.conf.delay);
    }

    /**
     * To back navigate
     *
     * @returns {(function(): void)|*}
     */
    toBack() {
        this.navigate(-1)
    }

    /**
     * To back navigate with delay
     *
     * @returns {(function(): void)|*}
     */
    toBackDelay() {
        const nav = this.navigate
        setTimeout(function () {
            nav(-1)
        }, this.conf.delay);
    }

    /**
     * Open page
     *
     * @param route {String | Object}
     * @param arg
     *
     * @returns {(function(): void)|*}
     */
    onClickToLocation(route, ...arg) {
        const path = this.getPathFromObject(route)
        return () => {
            this.toLocation(path, arg)
        }
    }

    /**
     * Open page with delay
     *
     * @param route {String | Object}
     * @param arg
     *
     * @returns {(function(): void)|*}
     */
    onClickToLocationDelay(route, ...arg) {
        const path = this.getPathFromObject(route)
        return () => {
            this.toLocationDelay(path, arg)
        }
    }

    /**
     * To back navigate
     *
     * @returns {(function(): void)|*}
     */
    onClickToBack() {
        return () => {
            this.toBack()
        }
    }

    /**
     * To back navigate with delay
     *
     * @returns {(function(): void)|*}
     */
    onClickToBackDelay() {
        return () => {
            this.toBackDelay()
        }
    }

    /**
     * Check location by routes
     *
     * @returns {boolean}
     */
    isPages(routes) {
        return this.isPage.apply(this, routes)
    }

    /**
     * Check location by path
     *
     * @returns {boolean}
     */
    isPage(...route) {

        const regexPath = /:\w+/ig;
        const regexLoc = /([\d+])|(\w+-\w+)/ig;

        for (let i = 0; i < route.length; i++) {
            const path = this.getPathFromObject(route[i])
            if (this.location.pathname.replaceAll(regexLoc, "__id__") === path.replaceAll(regexPath, "__id__")) {
                return true
            }
        }
        return false
    }

    /**
     * Create link with arguments
     *
     * @returns {String}
     */
    createLink(route, ...arg) {

        const path = this.getPathFromObject(route)

        if (!path.includes(":")) {
            return path
        }

        let result = path
        let linkArgs = []

        path.split("/").forEach((v) => {
            if (v.includes(":")) {
                linkArgs.push(v)
            }
        })

        linkArgs.forEach((linkArg, index) => {
            if (arg[index] !== undefined) {
                result = result.replace(linkArg, arg[index])
            } else {
                result = result.replace(linkArg, 'null')
            }
        })

        return result
    }

    /**
     * Render pages by conf
     *
     * @param onError callback if open page error
     *
     * @returns {JSX.Element}
     */
    render(onError) {

        const pages = []

        Object.keys(this.conf.routes).forEach((group, groupIndex) => {
            Object.keys(this.conf.routes[group]).forEach((page, pageIndex) => {
                const {path, title, render} = this.conf.routes[group][page]
                if (render !== undefined) {
                    pages.push(render(groupIndex + pageIndex, path, title))
                }
            })
        });

        return (
            <React.Fragment>
                <ScrollToTop/>
                <Routes>
                    {pages}
                    <Route
                        path="*"
                        element={
                            <GuestLayout>
                                <ErrorPage onError={onError} title={"Error | 404"}/>
                            </GuestLayout>
                        }
                    />
                </Routes>
            </React.Fragment>
        );
    }

    /**
     * Open outer url
     *
     * @param url
     */
    openUrl(url) {
        window.location.href = url
    }

    /**
     * Open outer url
     *
     * @param url
     */
    openUrlNewTab(url) {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    /**
     * Scroll to top page
     */
    scrollToTop() {
        window.scrollTo(0, 0);
    }

    /**
     * Scroll to top page with smooth
     */
    scrollToTopSmooth() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
}