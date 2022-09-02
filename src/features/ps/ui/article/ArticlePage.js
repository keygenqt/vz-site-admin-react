import * as React from 'react';
import {useContext, useEffect} from 'react';
import {
    Box,
    CircularProgress,
    FormControlLabel,
    FormGroup,
    Grid,
    MenuItem,
    Stack,
    Switch,
    Tab,
    Tabs,
    TextField,
    useTheme
} from "@mui/material";
import {
    AlertError,
    AlertInfo,
    AlertSuccess,
    AppCard,
    MarkdownEditorFilled,
    SnackbarError,
    SplitButton,
    TabPanel
} from "../../../../components";
import {Done, ViewListOutlined} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import {Formik, useFormikContext} from "formik";
import * as Yup from 'yup';
import {ConstantAuth, MethodsRequest, NavigateContext, useRequest} from "../../../../base";
import {MultipleFiles} from "../../../../components/dropzone/MultipleFiles";

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
    const {loading, data, error} = useRequest(MethodsRequest.ps.article, false, id);

    useEffect(() => {
        if (data) {
            setValues({
                ...values,
                title: data.title,
                description: data.description,
                content: data.content,
                titleRu: data.titleRu ?? '',
                descriptionRu: data.descriptionRu ?? '',
                contentRu: data.contentRu ?? '',
                category: data.category,
                listImage: data.listImage,
                viewImage: data.viewImage,
                isPublished: data.isPublished,
                uploads: data.uploads,
            });
        }
        setTimeout(function () {
            onError(error)
            onLoading(loading)
        }, 50);

    }, [loading, data, error]);

    return null;
};

export function ArticlePage() {

    const theme = useTheme()
    const {route, conf} = useContext(NavigateContext)

    let {id} = useParams();

    const [modelId, setModelId] = React.useState(id);
    const [submitLoader, setSubmitLoader] = React.useState(false);
    const [loading, setLoading] = React.useState(id !== undefined);
    const [filesUpload, setFilesUpload] = React.useState(false);
    const [errorPage, setErrorPage] = React.useState(null);
    const [valueTab, setValueTab] = React.useState(0);

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
                        title={modelId ? 'Here you can edit the article' : 'Here you can create a new article'}
                    >
                        <Formik
                            initialValues={{
                                title: '',
                                description: '',
                                content: '',
                                titleRu: '',
                                descriptionRu: '',
                                contentRu: '',
                                category: '',
                                listImage: '',
                                viewImage: '',
                                isPublished: false,
                                uploads: [],
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                category: Yup.string().required('Category is required'),
                                listImage: Yup.string().required('Image is required'),
                                viewImage: Yup.string().required('Image is required'),
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

                                    const response = modelId ?
                                        (
                                            await MethodsRequest.ps.articleUpdate(modelId, {
                                                title: values.title,
                                                description: values.description,
                                                content: values.content,
                                                category: values.category,
                                                listImage: values.listImage,
                                                viewImage: values.viewImage,
                                                isPublished: values.isPublished,
                                                uploads: values.uploads.map((file) => file.id),
                                                ...values.titleRu.length > 0 ? {
                                                    titleRu: values.titleRu,
                                                } : {},
                                                ...values.descriptionRu.length > 0 ? {
                                                    descriptionRu: values.descriptionRu,
                                                } : {},
                                                ...values.contentRu.length > 0 ? {
                                                    contentRu: values.contentRu,
                                                } : {}
                                            })
                                        ) : (
                                            await MethodsRequest.ps.articleCreate({
                                                title: values.title,
                                                description: values.description,
                                                content: values.content,
                                                titleRu: values.titleRu,
                                                descriptionRu: values.descriptionRu,
                                                contentRu: values.contentRu,
                                                category: values.category,
                                                listImage: values.listImage,
                                                viewImage: values.viewImage,
                                                isPublished: values.isPublished,
                                                uploads: values.uploads.map((file) => file.id),
                                                ...values.titleRu.length > 0 ? {
                                                    titleRu: values.titleRu,
                                                } : {},
                                                ...values.descriptionRu.length > 0 ? {
                                                    descriptionRu: values.descriptionRu,
                                                } : {},
                                                ...values.contentRu.length > 0 ? {
                                                    contentRu: values.contentRu,
                                                } : {}
                                            })
                                        )

                                    setModelId(response.id)

                                    if (!modelId) {
                                        route.toLocationPush(route.createLink(conf.routes.ps.blogUpdate, response.id))
                                    }

                                    setStatus({success: true});
                                    setSubmitLoader(false);
                                    setSubmitting(false);

                                } catch (error) {

                                    const errors = {
                                        title: error.findError('title'),
                                        description: error.findError('description'),
                                        content: error.findError('content'),
                                        titleRu: error.findError('titleRu'),
                                        descriptionRu: error.findError('descriptionRu'),
                                        contentRu: error.findError('contentRu'),
                                        category: error.findError('category'),
                                        listImage: error.findError('listImage'),
                                        viewImage: error.findError('viewImage'),
                                        isPublished: error.findError('isPublished'),
                                        submit: error.message
                                    }

                                    setErrors(errors);

                                    if (errors.titleRu || errors.descriptionRu || errors.contentRu) {
                                        setValueTab(1)
                                    }

                                    if (errors.title || errors.description || errors.content) {
                                        setValueTab(0)
                                    }

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

                                    {modelId ? <BusinessLogic
                                        id={modelId}
                                        onError={(error) => {
                                            setErrorPage(error)
                                        }}
                                        onLoading={(state) => {
                                            setLoading(state)
                                        }}
                                    /> : null}

                                    {ConstantAuth.isGuest() && (
                                        <AlertInfo>
                                            {modelId ? "This is demo mode. Guest cannot update article" : "This is demo mode. Guest cannot create article"}
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
                                                    name={'listImage'}
                                                    value={values.listImage}
                                                    helperText={touched.listImage ? errors.listImage : ''}
                                                    error={Boolean(touched.listImage && errors.listImage)}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    label="Image for list articles"
                                                    variant="filled"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    disabled={isSubmitting}
                                                    type={'text'}
                                                    name={'viewImage'}
                                                    value={values.viewImage}
                                                    helperText={touched.viewImage ? errors.viewImage : ''}
                                                    error={Boolean(touched.viewImage && errors.viewImage)}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    label="Image for view article"
                                                    variant="filled"
                                                />
                                            </Grid>

                                            <Grid item xs={12}>

                                                <Box sx={{
                                                    borderBottom: 1,
                                                    borderColor: 'divider',
                                                    '& .MuiButtonBase-root': {
                                                        borderTopLeftRadius: 4,
                                                        borderTopRightRadius: 4
                                                    }
                                                }}>
                                                    <Tabs
                                                        value={valueTab}
                                                        onChange={(event, newValue) => {
                                                            setValueTab(newValue);
                                                        }}
                                                        aria-label="basic tabs example"
                                                    >
                                                        <Tab label="Locale Default"/>
                                                        <Tab label="Locale Ru"/>
                                                    </Tabs>
                                                </Box>

                                                <TabPanel value={valueTab} index={0}>
                                                    <Stack spacing={2}>

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

                                                    </Stack>
                                                </TabPanel>
                                                <TabPanel value={valueTab} index={1}>
                                                    <Stack spacing={2}>

                                                        <TextField
                                                            disabled={isSubmitting}
                                                            type={'text'}
                                                            name={'titleRu'}
                                                            value={values.titleRu}
                                                            helperText={touched.titleRu ? errors.titleRu : ''}
                                                            error={Boolean(touched.titleRu && errors.titleRu)}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            fullWidth
                                                            label="Title"
                                                            variant="filled"
                                                        />

                                                        <TextField
                                                            disabled={isSubmitting}
                                                            type={'text'}
                                                            name={'descriptionRu'}
                                                            value={values.descriptionRu}
                                                            helperText={touched.descriptionRu ? errors.descriptionRu : ''}
                                                            error={Boolean(touched.descriptionRu && errors.descriptionRu)}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            fullWidth
                                                            multiline
                                                            minRows={4}
                                                            maxRows={10}
                                                            label="Description"
                                                            variant="filled"
                                                        />

                                                        <MarkdownEditorFilled
                                                            disabled={isSubmitting}
                                                            loading={loading}
                                                            name={'contentRu'}
                                                            value={values.contentRu}
                                                            helperText={touched.contentRu ? errors.contentRu : ''}
                                                            error={Boolean(touched.contentRu && errors.contentRu)}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            label="Post content"
                                                        />

                                                    </Stack>

                                                </TabPanel>

                                            </Grid>
                                            <Grid item xs={12}>
                                                <MultipleFiles
                                                    disabled={isSubmitting}
                                                    value={values.uploads}
                                                    onChange={(files) => setFieldValue('uploads', files)}
                                                    onLoading={(state) => setFilesUpload((state))}
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
                                                    disabled={isSubmitting || filesUpload}
                                                    type="submit"
                                                    color={theme.palette.success.main}
                                                    size={'medium'}
                                                    endIcon={<Done/>}
                                                    onClick={() => {
                                                        if (errors.title || errors.description || errors.content) {
                                                            setValueTab(0)
                                                        }
                                                        route.scrollToTop()
                                                    }}
                                                >
                                                    {modelId ? 'Update' : 'Add'}
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

ArticlePage.propTypes = {};