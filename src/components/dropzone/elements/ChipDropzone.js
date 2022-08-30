import * as React from "react";
import {Avatar, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import PropTypes from "prop-types";
import md5 from "md5";
import {ConstantConf} from "../../../ConstantConf";

export function ChipDropzone(props) {

    const {
        disabled = false,
        response,
        onDeleteFile
    } = props

    const [open, setOpen] = React.useState(false);

    const key = md5(response.fileName)
    const url = `${ConstantConf.apiPath}/api/ps/file/${response.fileName}`

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Chip
                disabled={disabled}
                key={'chip' + key}
                avatar={<Avatar alt={response.originalFileName} src={url} sx={{
                    border: '1px solid #bfbfbf'
                }}/>}
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
            <Dialog
                key={'dialog' + key}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {response.originalFileName}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <img alt={response.originalFileName} src={url} style={{
                            width: '500px'
                        }}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        key={'btn-link-' + key}
                        onClick={() => {
                            navigator.clipboard.writeText(url)
                            handleClose()
                        }}>
                        Copy Link
                    </Button>
                    <Button
                        key={'btn-close-' + key}
                        onClick={handleClose}
                        autoFocus
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

ChipDropzone.propTypes = {
    disabled: PropTypes.bool.isRequired,
    response: PropTypes.object.isRequired,
    onDeleteFile: PropTypes.func.isRequired
};