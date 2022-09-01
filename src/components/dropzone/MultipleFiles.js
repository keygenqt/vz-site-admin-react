import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Box, CircularProgress, FormHelperText, Stack, useTheme} from "@mui/material";
import {ChipDropzone} from "./elements/ChipDropzone";
import PropTypes from "prop-types";
import {MethodsRequest} from "../../base";

export function MultipleFiles(props) {

    const {
        value = [],
        disabled = false,
        onLoading,
        onChange
    } = props

    const {palette} = useTheme();

    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [helperText, setHelperText] = useState(false)
    const [errorText, setErrorText] = useState(null)

    const onUpload = useCallback(acceptedFiles => {

        const uploadData = async (uploads) => {
            let responses = []
            for (const file of uploads) {
                const formData = new FormData();
                formData.append("file", file);
                try {
                    // clear error
                    setErrorText(null)
                    setIsError(false)

                    // set info
                    setHelperText(`Upload file: '${file.name}'`)

                    await new Promise(r => setTimeout(r, 500));

                    responses.push({
                        response: await MethodsRequest.ps.uploadFile(formData),
                        file: file
                    })
                } catch (e) {
                    setErrorText(`Error upload file: '${file.name}'`)
                    setHelperText(e.message)
                    setIsError(true)
                    await new Promise(r => setTimeout(r, 1000));
                    console.error(e)
                }
            }
            return responses
        }

        setLoading(true)

        let uploadFiles = []

        acceptedFiles.forEach((file) => {
            if (!files.some(function (elem) {
                return elem.path === file.path && elem.lastModified === file.lastModified
            })) {
                uploadFiles.push(file)
            }
        })

        if (uploadFiles.length > 0) {
            uploadData(uploadFiles).then((responses) => {
                const result = files.concat(responses).reverse()

                setHelperText(null)
                setErrorText(null)
                setLoading(false)
                setIsError(false)

                // update data
                setFiles(result)
                onChange(result.map((file) => file.response))
            })
        } else {
            setLoading(false)
        }

    }, [files])

    const onDelete = response => {
        const result = files.filter(function (value) {
            if (value.response.id !== response.id) {
                URL.revokeObjectURL(value.file)
                return true
            } else {
                return false
            }
        })
        setFiles(result)
        onChange(result.map((file) => file.response))
    }

    useEffect(() => {
        setFiles(value.map((file) => {
            return {
                response: file
            }
        }))
    }, [value])

    useEffect((f = onLoading) => {
        f(loading)
    }, [loading])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        // accept: {
        //     'image/*': []
        // },
        disabled: loading || disabled,
        onDrop: onUpload,
        noClick: true
    })

    return (
        <Stack spacing={1}>
            <Box {...getRootProps()} className={(disabled ? 'disabled' : '') + (isError ? 'error' : '')} sx={{
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
                },
                '&.disabled': {
                    color: '#00000061',
                    background: '#E0E0E0'
                },
                '&.disabled:after': {
                    display: 'none'
                },
                '&.error': {
                    color: palette.error.main,
                    border: '1px dotted ' + palette.error.main,
                },
                '&.error:after': {
                    borderBottom: '2px solid ' + palette.error.main
                }
            }}>
                <input id={'input-MultipleFiles'} {...getInputProps()} />

                {
                    loading ? (
                        errorText ?
                            <div style={{padding: 8}}>{errorText}</div> : <CircularProgress color="primary" size={31}/>
                    ) : (
                        <div
                            style={{padding: 8}}>{isDragActive ? "Drop the files here ..." : "Drag 'n' drop some files here"}</div>
                    )
                }
            </Box>

            {helperText ? <FormHelperText error={isError} sx={{
                paddingLeft: 1
            }}>
                {helperText}
            </FormHelperText> : null}

            {files.length !== 0 ? <Stack direction={'row'} spacing={1} id={'chips'} className={'section'} sx={{
                padding: '8px 0'
            }}>
                {files.map((file) => (
                    <ChipDropzone
                        disabled={disabled}
                        key={file.response.id}
                        response={file.response}
                        onDeleteFile={onDelete}
                    />
                ))}
            </Stack> : null}

        </Stack>
    );
}

MultipleFiles.propTypes = {
    value: PropTypes.array,
    disabled: PropTypes.bool,
    onLoading: PropTypes.func,
    onChange: PropTypes.func,
};