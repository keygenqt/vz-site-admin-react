import * as React from "react";
import {Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import PropTypes from "prop-types";
import md5 from "md5";
import {ConstantConf} from "../../../ConstantConf";
import {FilePresent} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

export function ChipDropzone(props) {

    const {
        disabled = false,
        response,
        onDeleteFile
    } = props

    const [open, setOpen] = React.useState(false);

    const key = md5(response.fileName)
    const isImage = response.fileMime.includes('image')
    const url = `${ConstantConf.apiPath}/api/ps/file/${response.fileName}`
    const urlOriginal = `${ConstantConf.apiPath}/api/ps/file/${response.originalFileName}`

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
                        {isImage ? (
                            <img alt={response.originalFileName} src={url} style={{
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
                                    File, mime: {response.fileMime}
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
                            handleClose()
                        }}>
                        Copy Link
                    </Button>
                    <Button
                        key={'btn-has-link-' + key}
                        onClick={() => {
                            navigator.clipboard.writeText(url)
                            handleClose()
                        }}>
                        Copy Hash Link
                    </Button>
                    <Button
                        color={'inherit'}
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