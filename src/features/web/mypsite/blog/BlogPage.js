import * as React from 'react';
import {useEffect, useState} from 'react';
import {Alert, FormControlLabel, FormGroup, Grid, MenuItem, Switch, TextField, useTheme} from "@mui/material";
import PropTypes from "prop-types";
import {AppCard, MarkdownEditorFilled, SplitButton} from "../../../../components";
import {Done, ViewListOutlined} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from 'yup';

const categories = [
    {
        value: 'android',
        label: 'Android',
    },
    {
        value: 'pc',
        label: 'PC',
    },
    {
        value: 'web',
        label: 'Web',
    },
    {
        value: 'ios',
        label: 'iOS',
    },
];

const markdown = `
Adminka
===================

![alt text](https://raw.githubusercontent.com/keygenqt/vz-site-admin-react/main/data/logo160.png)

Well, what site can exist without an admin panel? 
This is the admin panel for [my personal website](https://github.com/keygenqt/vz-site-react) and open source
projects.

**Used:** [React](https://reactjs.org/) + [MUI](https://mui.com/) :heart:

### Demo

[https://adminka.keygenqt.com](https://adminka.keygenqt.com/)

### Preview

![alt text](https://raw.githubusercontent.com/keygenqt/vz-site-admin-react/main/data/preview.png)

# License

\`\`\`
Copyright 2022 Vitaliy Zarubin

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\`\`\`
`;


export function BlogPage({title}) {

    const theme = useTheme()

    let {id} = useParams();

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        document.title = title;
    });

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <AppCard
                    backdrop={isLoading}
                    type={'page'}
                    color={'blueLight'}
                    variant={'circles4'}
                    icon={<ViewListOutlined/>}
                    title={id ? 'Here you can edit the post' : 'Here you can create a new post'}
                >
                    <Formik
                        initialValues={{
                            category: 'android',
                            title: '',
                            description: '',
                            content: markdown,
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            category: Yup.string().required('Title is required'),
                            title: Yup.string().required('Title is required'),
                            description: Yup.string().required('Description is required'),
                            content: Yup.string().required('Content is required'),
                        })}
                        onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {

                            setLoading(true)
                            setStatus({success: null});
                            setErrors({submit: null});

                            await new Promise(r => setTimeout(r, 1000));

                            try {

                                if (Math.random() < 0.5) {
                                    throw 'Error update data!';
                                }

                                setStatus({success: true});
                                setSubmitting(false);
                                setLoading(false);
                            } catch (err) {
                                setStatus({success: false});
                                setErrors({submit: err});
                                setSubmitting(false);
                                setLoading(false);
                                console.error(err);
                            }
                        }}
                    >
                        {({status, errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
                            <form noValidate onSubmit={handleSubmit}>

                                {errors.submit && (
                                    <Alert severity="error" sx={{
                                        backgroundColor: '#ffadad',
                                        color: '#2e0000',
                                        borderRadius: 2,
                                        marginBottom: 2,
                                        '& svg': {
                                            color: '#2e0000',
                                        }
                                    }}>
                                        {errors.submit}
                                    </Alert>
                                )}

                                {status && status.success && (
                                    <Alert severity="success" sx={{
                                        backgroundColor: '#bdffad',
                                        color: '#002e04',
                                        borderRadius: 2,
                                        marginBottom: 2,
                                        '& svg': {
                                            color: '#002e04',
                                        }
                                    }}>
                                        Success update data!
                                    </Alert>
                                )}

                                <FormGroup>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                type={'text'}
                                                name={'category'}
                                                value={values.category}
                                                helperText={touched.category ? errors.category : ''}
                                                error={Boolean(touched.category && errors.category)}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                select
                                                fullWidth
                                                label='Category'
                                                variant="filled"
                                            >
                                                {categories.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type={'text'}
                                                name={'title'}
                                                value={values.title}
                                                helperText={touched.title ? errors.title : ''}
                                                error={Boolean(touched.title && errors.title)}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                fullWidth
                                                label="Title"
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type={'text'}
                                                name={'description'}
                                                value={values.description}
                                                helperText={touched.description ? errors.description : ''}
                                                error={Boolean(touched.description && errors.description)}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                fullWidth
                                                multiline
                                                minRows={4}
                                                label="Description"
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <MarkdownEditorFilled
                                                name={'content'}
                                                value={values.content}
                                                helperText={touched.content ? errors.content : ''}
                                                error={Boolean(touched.content && errors.content)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                label="Post content"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Switch defaultChecked/>}
                                                label="Post published"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{
                                            textAlign: 'end'
                                        }}>
                                            <SplitButton
                                                disabled={isSubmitting}
                                                type="submit"
                                                color={theme.palette.success.main}
                                                size={'medium'}
                                                endIcon={<Done/>}
                                            >
                                                {id ? 'Update' : 'Add'}
                                            </SplitButton>
                                        </Grid>
                                    </Grid>
                                </FormGroup>
                            </form>
                        )}
                    </Formik>

                </AppCard>
            </Grid>
        </Grid>
    );
}

BlogPage.propTypes = {
    title: PropTypes.string,
};