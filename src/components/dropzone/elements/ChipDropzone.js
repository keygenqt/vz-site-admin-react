import * as React from "react";
import {Avatar, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import PropTypes from "prop-types";

export function ChipDropzone(props) {

    const {
        file,
        onDeleteFile
    } = props

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Chip
                avatar={<Avatar alt={file.name} src={URL.createObjectURL(file)} sx={{
                    border: '1px solid #bfbfbf'
                }}/>}
                label={file.name}
                variant="outlined"
                onClick={handleClickOpen}
                onDelete={() => {
                    if (onDeleteFile) {
                        onDeleteFile(file)
                    }
                }}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {file.name}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <img alt={file.name} src={URL.createObjectURL(file)} style={{
                            width: '500px'
                        }}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        navigator.clipboard.writeText(file.name)
                        handleClose()
                    }}>Copy Link</Button>
                    <Button color={''} onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

ChipDropzone.propTypes = {
    file: PropTypes.object.isRequired,
    onDeleteFile: PropTypes.func.isRequired
};