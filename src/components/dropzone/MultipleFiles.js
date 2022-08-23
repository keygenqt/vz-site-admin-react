import * as React from "react";
import {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Box, CircularProgress, Stack, useTheme} from "@mui/material";
import {ChipDropzone} from "./elements/ChipDropzone";

export function MultipleFiles(props) {

    const {palette} = useTheme();

    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)

    const onDrop = useCallback(acceptedFiles => {
        setLoading(true)
        setTimeout(function () {
            setFiles(acceptedFiles)
            setLoading(false)
        }, 2000);
    }, [])

    const onDeleteFile = (file) => {
        setFiles(files.filter(function (value) {
            return value.path !== file.path;
        }))
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {
            'image/*': []
        },
        disabled: loading,
        onDrop: onDrop,
        noClick: true
    })

    return (
        <Stack spacing={2}>
            <Box {...getRootProps()} sx={{
                position: 'relative',
                textAlign: 'center',
                padding: '30px 10px 30px 10px',
                borderTopRightRadius: '4px',
                borderTopLeftRadius: '4px',
                background: '#0000000f',
                border: '1px dotted ' + (loading || isDragActive ? palette.primary.main : '#808080'),
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -1,
                    margin: '0 auto',
                    left: 0,
                    right: 0,
                    width: '100%',
                    borderBottom: loading || isDragActive ? '2px solid ' + palette.primary.main : '1px solid #808080'
                }
            }}>
                <input {...getInputProps()} />
                {
                    loading ? <CircularProgress color="primary" size={31}/> : (
                        <div style={{padding: 8}}>{isDragActive ? "Drop the images here ..." : "Drag 'n' drop some images here"}</div>
                    )
                }
            </Box>

            {files.length !== 0 ? <Stack direction={'row'} spacing={1} className={'section'} sx={{
                padding: '8px 0'
            }}>
                {files.map((file) => (
                    <ChipDropzone
                        key={file.path}
                        file={file}
                        onDeleteFile={onDeleteFile}
                    />
                ))}
            </Stack> : null}


        </Stack>
    );
}

MultipleFiles.propTypes = {};