import * as React from "react";
import {Avatar, Card, CardContent, CardHeader, Fab, Typography, useTheme} from "@mui/material";
import PropTypes from "prop-types";
import {Calculate, MoreVert} from "@mui/icons-material";

Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

export function CardChart({index, color = 'blue'}) {

    const theme = useTheme();

    return (
        <Card variant={"outlined"} className={`CardChart ${color.capitalize()}`} style={{
            height: index === 1 || index === 2 ? 278 : 'inherit'
        }}>
            <CardHeader
                avatar={
                    <Avatar variant="rounded" aria-label="recipe" sx={{
                        backgroundColor: color === 'purple' ? theme.palette.secondary[800] : theme.palette.primary[800],
                    }}>
                        <Calculate/>
                    </Avatar>
                }
                action = {
                    index === 2 ? <Fab size="small" color="secondary" aria-label="add" elevation={0}>
                        <MoreVert/>
                    </Fab> : null
                }
            />
            <CardContent>
                <Typography variant="textCard">
                    {`CARD ${index}`}
                </Typography>
            </CardContent>
        </Card>
    );
}

CardChart.propTypes = {
    index: PropTypes.number,
    color: PropTypes.oneOf(['blue', 'purple', 'blueLite', 'yellow']),
};
