import React, {createContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import RouteCore from "../route/RouteCore";
import {RouteConf} from "../route/RouteConf";

export const AppContext = createContext({})

export default function AppContextProvider(props) {

    const location = useLocation()
    const navigate = useNavigate()

    const conf = RouteConf
    const route = new RouteCore(location, navigate, conf)

    return (
        <AppContext.Provider
            value={{
                location,
                navigate,
                route,
                conf,
            }}>
            {props.children}
        </AppContext.Provider>
    )
}