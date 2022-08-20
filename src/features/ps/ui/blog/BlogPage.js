import * as React from 'react';
import {useContext, useEffect} from 'react';
import {
    CircularProgress,
    FormControlLabel,
    FormGroup,
    Grid,
    MenuItem,
    Switch,
    TextField,
    useTheme
} from "@mui/material";
import {
    AlertError,
    AlertSuccess,
    AppCard,
    MarkdownEditorFilled,
    SnackbarError,
    SplitButton
} from "../../../../components";
import {Done, ViewListOutlined} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import {Formik, useFormikContext} from "formik";
import * as Yup from 'yup';
import {MethodsRequest, NavigateContext, useRequest} from "../../../../base";

const categories = [
    {
        value: 'OTHER',
        label: 'Other',
    },
    {
        value: 'ANDROID',
        label: 'Android',
    },
    {
        value: 'PC',
        label: 'PC',
    },
    {
        value: 'WEB',
        label: 'Web',
    },
    {
        value: 'IOS',
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
                category: data.category,
                title: data.title,
                description: data.description,
                content: data.content,
                isPublished: data.isPublished,
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
    const {route, conf} = useContext(NavigateContext)

    let {id} = useParams();

    const [submitLoader, setSubmitLoader] = React.useState(false);
    const [loading, setLoading] = React.useState(id !== undefined);
    const [errorPage, setErrorPage] = React.useState(null);

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
                        icon={submitLoader ? <CircularProgress color="primary" size={20} sx={{
                            padding: '3px'
                        }}/> : <ViewListOutlined/>}
                        title={id ? 'Here you can edit the article' : 'Here you can create a new article'}
                    >
                        <Formik
                            initialValues={{
                                category: '',
                                title: '',
                                description: '',
                                content: '',
                                isPublished: false,
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                category: Yup.string().required('Category is required'),
                                title: Yup.string().required('Title is required'),
                                description: Yup.string().required('Description is required'),
                                content: Yup.string().required('Content is required'),
                            })}
                            onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {

                                setSubmitLoader(true);
                                setStatus({success: null});
                                setErrors({submit: null});

                                try {

                                    await new Promise(r => setTimeout(r, 1000));

                                    const response = id ?
                                        (
                                            await MethodsRequest.ps.articleUpdate(id, {
                                                category: values.category,
                                                title: values.title,
                                                description: values.description,
                                                content: values.content,
                                                isPublished: values.isPublished,
                                            })
                                        ) : (
                                            await MethodsRequest.ps.articleCreate({
                                                category: values.category,
                                                title: values.title,
                                                description: values.description,
                                                content: values.content,
                                                isPublished: values.isPublished,
                                            })
                                        )

                                    if (!id) {
                                        route.toLocation(route.createLink(conf.routes.ps.blogUpdate, response.id))
                                    }

                                    setStatus({success: true});
                                    setSubmitLoader(false);
                                    setSubmitting(false);
                                } catch (error) {

                                    setErrors({
                                        category: error.findError('category'),
                                        title: error.findError('title'),
                                        description: error.findError('description'),
                                        content: error.findError('content'),
                                        isPublished: error.findError('isPublished'),
                                        submit: error.message
                                    });

                                    setStatus({success: false});
                                    setSubmitLoader(false);
                                    setSubmitting(false);
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
                                  values,
                                  setFieldValue
                              }) => (
                                <form noValidate onSubmit={handleSubmit}>

                                    {id ? <BusinessLogic
                                        id={id}
                                        onError={(error) => {
                                            setErrorPage(error)
                                        }}
                                        onLoading={(state) => {
                                            setLoading(state)
                                        }}
                                    /> : null}

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
                                                    disabled={isSubmitting}
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
                                                    disabled={isSubmitting}
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
                                                    disabled={isSubmitting}
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
                                                    maxRows={10}
                                                    label="Description"
                                                    variant="filled"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MarkdownEditorFilled
                                                    disabled={isSubmitting}
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
                                                    sx={{
                                                        color: errors.isPublished ? '#d32f2f' : 'auto'
                                                    }}
                                                    control={<Switch
                                                        disabled={isSubmitting}
                                                        checked={values.isPublished}
                                                        onChange={(event, checked) => setFieldValue('isPublished', checked)}
                                                    />}
                                                    label={"Post published" + (errors.isPublished ? ` (${errors.isPublished})` : '')}
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