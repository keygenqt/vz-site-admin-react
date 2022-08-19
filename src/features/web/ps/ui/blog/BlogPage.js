import * as React from 'react';
import {useContext, useEffect} from 'react';
import {FormControlLabel, FormGroup, Grid, MenuItem, Switch, TextField, useTheme} from "@mui/material";
import {
    AlertError,
    AlertSuccess,
    AppCard,
    MarkdownEditorFilled,
    SnackbarError,
    SplitButton
} from "../../../../../components";
import {Done, ViewListOutlined} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import {Formik, useFormikContext} from "formik";
import * as Yup from 'yup';
import {MethodsRequest, NavigateContext, useRequest} from "../../../../../base";

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

const BusinessLogic = ({id, onError, onLoading}) => {

    const {values, setValues} = useFormikContext();
    const {loading, data, error} = useRequest(MethodsRequest.ps.article, {id: id});

    useEffect(() => {
        if (data) {
            setValues({
                ...values,
                title: data.title,
                description: data.description,
                content: data.content,
            });
        }
        setTimeout(function () {
            onError(error)
            onLoading(loading)
        }, 50);

    }, [loading, data, error]);

    return null;
};

export function BlogPage() {

    const theme = useTheme()
    const {route} = useContext(NavigateContext)

    const [loading, setLoading] = React.useState(true);
    const [errorPage, setErrorPage] = React.useState(null);

    let {id} = useParams();

    return (
        <>
            <SnackbarError error={errorPage}/>

            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <AppCard
                        backdrop={loading}
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
                                content: '',
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                category: Yup.string().required('Title is required'),
                                title: Yup.string().required('Title is required'),
                                description: Yup.string().required('Description is required'),
                                content: Yup.string().required('Content is required'),
                            })}
                            onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {

                                setStatus({success: null});
                                setErrors({submit: null});

                                await new Promise(r => setTimeout(r, 1000));

                                try {

                                    if (Math.random() < 0.5) {
                                        throw 'Error update data!';
                                    }

                                    setStatus({success: true});
                                    setSubmitting(false);
                                } catch (err) {
                                    setStatus({success: false});
                                    setErrors({submit: err});
                                    setSubmitting(false);
                                    console.error(err);
                                }
                            }}
                        >
                            {({
                                  status,
                                  errors,
                                  handleBlur,
                                  handleChange,
                                  handleSubmit,
                                  isSubmitting,
                                  touched,
                                  values
                              }) => (
                                <form noValidate onSubmit={handleSubmit}>

                                    <BusinessLogic
                                        id={id}
                                        onError={(error) => {
                                            setErrorPage(error)
                                        }}
                                        onLoading={(state) => {
                                            setLoading(state)
                                        }}
                                    />

                                    {errors.submit && (
                                        <AlertError>
                                            {errors.submit}
                                        </AlertError>
                                    )}

                                    {status && status.success && (
                                        <AlertSuccess>
                                            Success submit form!
                                        </AlertSuccess>
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
                                                    loading={loading}
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
                                                    onClick={() => {
                                                        route.scrollToTop()
                                                    }}
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
        </>
    );
}

BlogPage.propTypes = {};