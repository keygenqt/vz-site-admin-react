import * as React from "react";
import {Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import PropTypes from "prop-types";
import md5 from "md5";
import {ConstantConf} from "../../../ConstantConf";
import {FilePresent} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {AppUtils} from "../../../base/utils/AppUtils";
import {FileDialog} from "../../dialogs/FileDialog";

export function ChipDropzone(props) {

    const {
        disabled = false,
        response,
        onDeleteFile
    } = props

    const [open, setOpen] = React.useState(false);

    const key = md5(response.fileName)
    const isImage = AppUtils.isImage(response.fileMime)
    const url = AppUtils.getUrl(response.fileName)
    const urlOriginal = AppUtils.getUrlPretty(response.originalFileName)

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Chip
                disabled={disabled}
                key={'chip' + key}
                avatar={<Avatar alt={response.originalFileName} src={url} sx={{
                    border: '1px solid #bfbfbf',
                    backgroundColor: 'white'
                }}>
                    <FilePresent sx={{
                        fontSize: '17px',
                    }}/>
                </Avatar>}
                label={response.originalFileName}
                variant="outlined"
                onClick={() => {
                    setOpen(true);
                }}
                onDelete={() => {
                    if (onDeleteFile) {
                        onDeleteFile(response)
                    }
                }}
            />

            <FileDialog
                open={open}
                response={response}
                onClose={handleClose}
            />
        </>
    );
}

ChipDropzone.propTypes = {
    disabled: PropTypes.bool.isRequired,
    response: PropTypes.object.isRequired,
    onDeleteFile: PropTypes.func.isRequired
};