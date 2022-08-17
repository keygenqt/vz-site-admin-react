import React, {createContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import RouteCore from "../route/RouteCore";
import {RouteConf} from "../route/RouteConf";

export const NavigateContext = createContext({})

export default function NavigateContextProvider(props) {

    const location = useLocation()
    const navigate = useNavigate()

    const conf = RouteConf
    const route = new RouteCore(location, navigate, conf)

    return (
        <NavigateContext.Provider
            value={{
                location,
                navigate,
                route,
                conf,
            }}>
            {props.children}
        </NavigateContext.Provider>
    )
}