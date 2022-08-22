import * as React from 'react';
import {useContext, useEffect} from 'react';
import {
    CircularProgress,
    FilledInput,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem, Select,
    Switch,
    TextField,
    useTheme
} from "@mui/material";
import {AlertError, AlertInfo, AlertSuccess, AppCard, SnackbarError, SplitButton} from "../../../../components";
import {Done, ViewListOutlined} from "@mui/icons-material";
import {ConstantAuth, MethodsRequest, NavigateContext, useRequest} from "../../../../base";
import {useParams} from "react-router-dom";
import {Formik, useFormikContext} from "formik";
import * as Yup from "yup";

const categories = [
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
    {
        value: 'OTHER',
        label: 'Other',
    },
];

const languages = [
    {
        value: 'KOTLIN',
        label: 'Kotlin',
    },
    {
        value: 'JAVASCRIPT',
        label: 'Java Script',
    },
    {
        value: 'SWIFT',
        label: 'Swift',
    },
    {
        value: 'PHP',
        label: 'PHP',
    },
    {
        value: 'PYTHON',
        label: 'Python',
    },
    {
        value: 'BASH',
        label: 'Bash',
    },
    {
        value: 'OTHER',
        label: 'Other',
    },
];

const BusinessLogic = ({id, onError, onLoading}) => {

    const {values, setValues} = useFormikContext();
    const {loading, data, error} = useRequest(MethodsRequest.ps.project, false, id);

    useEffect(() => {
        if (data) {
            setValues({
                ...values,
                category: data.category,
                language: data.language,
                title: data.title,
                url: data.url,
                description: data.description,
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

export function ProjectPage() {

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
                        title={id ? 'Here you can edit the project' : 'Here you can create a new project'}
                    >
                        <Formik
                            initialValues={{
                                category: '',
                                language: '',
                                title: '',
                                url: '',
                                description: '',
                                isPublished: false,
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                category: Yup.string().required('Category is required'),
                                language: Yup.string().required('Language is required'),
                                title: Yup.string().required('Title is required'),
                                url: Yup.string().url("Doesn't look like link"),
                                description: Yup.string().required('Description is required'),
                            })}
                            onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {

                                setSubmitLoader(true);
                                setStatus({success: null});
                                setErrors({submit: null});

                                try {

                                    await new Promise(r => setTimeout(r, 1000));

                                    const response = id ?
                                        (
                                            await MethodsRequest.ps.projectUpdate(id, {
                                                category: values.category,
                                                language: values.language,
                                                title: values.title,
                                                url: values.url,
                                                description: values.description,
                                                isPublished: values.isPublished,
                                            })
                                        ) : (
                                            await MethodsRequest.ps.projectCreate({
                                                category: values.category,
                                                language: values.language,
                                                title: values.title,
                                                url: values.url,
                                                description: values.description,
                                                isPublished: values.isPublished,
                                            })
                                        )

                                    if (!id) {
                                        route.toLocationReplace(route.createLink(conf.routes.ps.projectUpdate, response.id))
                                    }

                                    setStatus({success: true});
                                    setSubmitLoader(false);
                                    setSubmitting(false);
                                } catch (error) {

                                    setErrors({
                                        category: error.findError('category'),
                                        language: error.findError('language'),
                                        title: error.findError('title'),
                                        url: error.findError('url'),
                                        description: error.findError('description'),
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

                                    {ConstantAuth.isGuest() && (
                                        <AlertInfo>
                                            {id ? "This is demo mode. Guest cannot update project" : "This is demo mode. Guest cannot create project"}
                                        </AlertInfo>
                                    )}

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
                                                <FormControl
                                                    error={Boolean(touched.category && errors.category)}
                                                    fullWidth
                                                    variant="filled"
                                                >
                                                    <InputLabel htmlFor="filled-category">Category</InputLabel>
                                                    <Select
                                                        id="filled-category"
                                                        disabled={isSubmitting}
                                                        name={'category'}
                                                        value={values.category}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        fullWidth
                                                        variant="filled"
                                                    >
                                                        {categories.map((option) => (
                                                            <MenuItem key={`cat-${option.value}`} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                    </Select>
                                                    {touched.category && errors.category && (
                                                        <FormHelperText error>
                                                            {errors.category}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <FormControl
                                                    error={Boolean(touched.language && errors.language)}
                                                    fullWidth
                                                    variant="filled"
                                                >
                                                    <InputLabel htmlFor="filled-language">Base language</InputLabel>
                                                    <Select
                                                        id="filled-language"
                                                        disabled={isSubmitting}
                                                        name={'language'}
                                                        value={values.language}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        fullWidth
                                                        variant="filled"
                                                    >
                                                        {languages.map((option) => (
                                                            <MenuItem key={`lang-${option.value}`} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                    </Select>
                                                    {touched.language && errors.language && (
                                                        <FormHelperText error>
                                                            {errors.language}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
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
                                                    name={'url'}
                                                    value={values.url}
                                                    helperText={touched.url ? errors.url : ''}
                                                    error={Boolean(touched.url && errors.url)}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    label="Project link (optional)"
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

ProjectPage.propTypes = {};