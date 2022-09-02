import * as React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, useTheme} from "@mui/material";
import PropTypes from "prop-types";
import {FilePresent} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {AppUtils} from "../../base/utils/AppUtils";
import {MD5} from "crypto-js";

export function FileDialog(props) {

    const {
        open = false,
        response,
        onClose,
    } = props

    const file = response ? response : {
        fileName: 'null',
        fileMime: 'null',
        originalFileName: 'null',
    }

    const key = MD5(file.fileName)
    const isImage = AppUtils.isImage(file.fileMime)
    const url = AppUtils.getUrl(file.fileName)
    const urlOriginal = AppUtils.getUrlPretty(file.originalFileName)

    return (
        <Dialog
            key={'dialog' + key}
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {file.originalFileName}
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    {isImage ? (
                        <img alt={file.originalFileName} src={url} style={{
                            width: '500px'
                        }}/>
                    ) : (
                        <Stack direction={'row'} spacing={1} sx={{
                            width: '500px'
                        }}>
                            <FilePresent sx={{
                                fontSize: '30px',
                                marginLeft: '-6px'
                            }}/>

                            <Typography variant="body1" sx={{
                                paddingTop: '3px'
                            }}>
                                File, mime: {file.fileMime}
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    key={'btn-link-' + key}
                    onClick={() => {
                        navigator.clipboard.writeText(urlOriginal)
                        onClose()
                    }}>
                    Copy Pretty Link
                </Button>
                <Button
                    key={'btn-has-link-' + key}
                    onClick={() => {
                        navigator.clipboard.writeText(url)
                        onClose()
                    }}>
                    Copy Link
                </Button>
                <Button
                    color={'inherit'}
                    key={'btn-close-' + key}
                    onClick={onClose}
                    autoFocus
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

FileDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    response: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.oneOf([null]).isRequired,
    ])
};