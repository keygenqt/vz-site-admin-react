import * as React from "react";
import {routePS} from "./elements/ps";
import {routeCommon} from "./elements/common";

export const RouteConf = {
    delay: 200,
    routes: {
        common: routeCommon,
        ps: routePS,
    },
}