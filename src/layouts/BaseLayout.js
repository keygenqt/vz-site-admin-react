import * as React from 'react';
import {AppMenu, AppTopBar} from "../components";
import PropTypes from "prop-types";
import {useWindowResize} from "../base";
import {useMediaQuery, useTheme} from "@mui/material";

export function BaseLayout(props) {

    const {width} = useWindowResize((size) => {
        setIsOpenMenu(size.width > 1400)
    })

    const [isOpenMenu, setIsOpenMenu] = React.useState(width > 1400);

    return (
        <div className={"App AppTable"}>
            <div className={"AppTableRow"}>
                <div className={"AppTableCell"}>
                    <AppTopBar onChangeMenu={() => {
                        setIsOpenMenu(!isOpenMenu)
                    }}/>
                    <div className={"AppTable"} style={{
                        height: 'calc(100% - 64px)'
                    }}>
                        <div className={"AppTableRow"}>
                            <AppMenu
                                isOpen={isOpenMenu}
                            />
                            <div className={"AppTableCell"}>
                                <div className={"Page"}>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

BaseLayout.propTypes = {
    children: PropTypes.element.isRequired
};