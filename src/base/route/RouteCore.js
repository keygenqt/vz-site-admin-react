import * as React from "react";
import {ScrollToTop} from "../../components";
import {Route, Routes} from "react-router-dom";
import {GuestLayout} from "../../layouts";
import {ErrorPage} from "../../features/common/ui/error/ErrorPage";
import {SplashPage} from "../../features/common/ui/splash/SplashPage";
import {RouteType} from "./RouteType";
import {ConstantAuth} from "../constants/ConstantAuth";

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
        this.isRunStart = true;
        this.pathLogin = conf.routes.common.signIn.path
    }

    updateLocation(location) {
        this.location = location;
    }

    updateNavigate(navigate) {
        this.navigate = navigate;
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
     */
    toLocation(route, ...arg) {
        const path = this.getPathFromObject(route)
        this.navigate(this.createLink(path, arg));
    }

    /**
     * Open page with replace
     *
     * @param route {String | Object}
     * @param arg
     */
    toLocationReplace(route, ...arg) {
        const path = this.getPathFromObject(route)
        this.navigate(this.createLink(path, arg), {replace: true});
    }

    /**
     * Open page with replace
     *
     * @param route {String | Object}
     * @param arg
     */
    toLocationPush(route, ...arg) {
        const path = this.getPathFromObject(route)
        this.navigate(this.createLink(path, arg), {push: true});
    }

    /**
     * Open page with new stack
     *
     * @param route {String | Object}
     * @param arg
     */
    toLocationReset(route, ...arg) {
        const path = this.getPathFromObject(route)
        this.navigate(this.createLink(path, arg), {reset: true});
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
        const regexLoc = /(\d+)|(\w+-\w+)/ig;

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

        if (path.includes('http')) {
            return path + (arg.length === 0 ? '' : '/' + arg.join('/'));
        }

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
     * @returns {JSX.Element}
     */
    render() {

        const userRole = ConstantAuth.getRole()
        const pages = []

        Object.keys(this.conf.routes).forEach((group, groupIndex) => {
            Object.keys(this.conf.routes[group]).forEach((page, pageIndex) => {

                const {path, render, match, role} = this.conf.routes[group][page]

                if (role && role !== userRole) {
                    return
                }

                if (render !== undefined) {
                    if (this.isRunStart || !ConstantAuth.isAuth() && this.location.pathname !== this.pathLogin) {
                        pages.push(
                            <Route
                                key={groupIndex + pageIndex}
                                path={path}
                                element={
                                    <GuestLayout>
                                        <SplashPage done={() => {
                                            this.isRunStart = false
                                        }}/>
                                    </GuestLayout>
                                }
                            />
                        )
                    } else if (match) {
                        const clearPath = path.slice(0, path.indexOf(':'))
                        const paramsUrl = this.location.pathname.replace(clearPath, '').split("/")
                        const paramsPath = path.replace(clearPath, '').split("/").map((e) => e.replace(':', ''))
                        const validate = []
                        paramsPath.forEach((key, index) => {
                            const type = match[key] ? match[key] : RouteType.string
                            const value = paramsUrl[index]
                            validate.push(RouteType.validate(type, value))
                        })
                        if (validate.includes(false)) {
                            pages.push(
                                <Route
                                    key={groupIndex + pageIndex}
                                    path={path}
                                    element={
                                        <GuestLayout>
                                            <ErrorPage/>
                                        </GuestLayout>
                                    }
                                />
                            )
                        } else {
                            pages.push(render(groupIndex + pageIndex, path))
                        }
                    } else {
                        pages.push(render(groupIndex + pageIndex, path))
                    }
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
                                <ErrorPage/>
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
        const el = document.getElementById("pageSelection")
        el.scrollTo(0, 0);
    }

    /**
     * Scroll to top page with smooth
     */
    scrollToTopSmooth() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    /**
     * Refresh page
     */
    refreshPage() {
        this.navigate(0);
    }

    /**
     * Refresh location
     */
    refreshLocation() {
        this.navigate(this.location);
    }
}