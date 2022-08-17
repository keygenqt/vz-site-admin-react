import React, {createContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import RouteCore from "../route/RouteCore";
import {RouteConf} from "../route/RouteConf";
import {ConstantAuth} from "../constants/ConstantAuth";

export const NavigateContext = createContext({})

export default function NavigateContextProvider(props) {

    const location = useLocation()
    const navigate = useNavigate()

    const conf = RouteConf

    const [route] = useState(new RouteCore(location, navigate, conf));

    route.updateLocation(location)
    route.updateNavigate(navigate)

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