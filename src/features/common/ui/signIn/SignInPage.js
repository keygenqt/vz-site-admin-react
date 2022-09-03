import * as React from 'react';
import {useContext, useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    FilledInput,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Paper,
    Stack,
    Switch,
    useTheme
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ConstantAuth, MethodsRequest, NavigateContext} from "../../../../base";
import {Formik} from "formik";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import {AlertError, AlertSuccess} from "../../../../components";

export function SignInPage() {

    const {route, conf} = useContext(NavigateContext)

    const theme = useTheme()

    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container sx={{
            maxWidth: '500px !important',
            padding: '30px !important'
        }}>
            <Paper elevation={0} sx={{
                padding: 4
            }}>
                <Stack spacing={2} alignItems={'center'}>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        <span style={{color: theme.palette.primary[800]}}>Ad</span>minka
                    </Typography>

                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        color={theme.palette.secondary.main}
                    >
                        Hi, Welcome Back
                    </Typography>

                    <Stack spacing={2} sx={{
                        width: '100%',
                        textAlign: 'center',
                        display: 'none' // TODO: if google login
                    }}>
                        <Typography
                            variant="caption"
                            noWrap
                            component="div"
                            color={theme.palette.grey[600]}
                        >
                            Enter your credentials to continue
                        </Typography>

                        <Button
                            disabled={isLoading}
                            variant={'outlined'}
                            fullWidth
                            size={'large'}
                            sx={{
                                fontSize: 16,
                                fontWeight: 'normal',
                                textTransform: 'none',
                                '& svg': {
                                    color: '#4285F4',
                                },
                                '& span': {
                                    fontSize: 18,
                                    fontWeight: 'bold'
                                }
                            }}
                        >
                            Sign in with&nbsp;
                            <span style={{color: isLoading ? '#BDBDBD' : '#4285F4'}}>G</span>
                            <span style={{color: isLoading ? '#BDBDBD' : '#EA4335'}}>o</span>
                            <span style={{color: isLoading ? '#BDBDBD' : '#FBBC05'}}>o</span>
                            <span style={{color: isLoading ? '#BDBDBD' : '#4285F4'}}>g</span>
                            <span style={{color: isLoading ? '#BDBDBD' : '#34A853'}}>l</span>
                            <span style={{color: isLoading ? '#BDBDBD' : '#EA4335'}}>e</span>
                        </Button>

                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                width: '100%'
                            }}
                        >
                            <Divider sx={{flexGrow: 1}} orientation="horizontal"/>

                            <Button
                                variant="outlined"
                                disabled
                                sx={{
                                    cursor: 'unset',
                                    m: 2,
                                    py: 0.5,
                                    px: 7,
                                    borderColor: `${theme.palette.grey[300]} !important`,
                                    color: `${theme.palette.grey[700]}!important`,
                                    fontWeight: 500,
                                    borderRadius: 2
                                }}
                                disableRipple
                            >
                                OR
                            </Button>

                            <Divider sx={{flexGrow: 1}} orientation="horizontal"/>
                        </Box>
                    </Stack>

                    <Typography
                        variant="caption"
                        noWrap
                        component="div"
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >
                        Sign in with Email address
                    </Typography>

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            password: Yup.string().max(255).required('Password is required')
                        })}
                        onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {

                            setLoading(true)
                            setStatus({success: null});
                            setErrors({submit: null});

                            try {
                                // query
                                const response = await MethodsRequest.common.auth(
                                    values.email,
                                    values.password
                                )

                                await new Promise(r => setTimeout(r, 1000));

                                // set auth
                                ConstantAuth.setData(response)
                                // set result
                                setStatus({success: true});
                                setSubmitting(false);

                                await new Promise(r => setTimeout(r, 1000));

                                route.toLocation(conf.routes.ps.dashboard)

                            } catch (error) {

                                setErrors({
                                    email: error.findError('email'),
                                    password: error.findError('password'),
                                    submit: error.message
                                });

                                setStatus({success: false});
                                setSubmitting(false);
                                setLoading(false);
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

                                {errors.submit && (
                                    <AlertError style={{
                                        maxWidth: 345
                                    }}>
                                        {errors.submit}
                                    </AlertError>
                                )}

                                {status && status.success && (
                                    <AlertSuccess style={{
                                        maxWidth: 345
                                    }}>
                                        Success submit form!
                                    </AlertSuccess>
                                )}

                                <FormGroup>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <FormControl error={Boolean(touched.email && errors.email)}
                                                         fullWidth
                                                         variant="filled">
                                                <InputLabel htmlFor="filled-email-login">Email Address /
                                                    Username</InputLabel>
                                                <FilledInput
                                                    id="filled-email-login"
                                                    type={'text'}
                                                    name={'email'}
                                                    value={values.email}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    disabled={isSubmitting || isLoading}
                                                    fullWidth
                                                    variant="filled"
                                                />
                                                {touched.email && errors.email && (
                                                    <FormHelperText error>
                                                        {errors.email}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl error={Boolean(touched.password && errors.password)}
                                                         fullWidth
                                                         variant="filled">
                                                <InputLabel
                                                    htmlFor="filled-password-login">Password</InputLabel>
                                                <FilledInput
                                                    id="filled-password-login"
                                                    type={showPassword ? 'text' : 'password'}
                                                    name={'password'}
                                                    value={values.password}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    disabled={isSubmitting || isLoading}
                                                    fullWidth
                                                    variant="filled"
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff/> :
                                                                    <Visibility/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                                {touched.password && errors.password && (
                                                    <FormHelperText error>
                                                        {errors.password}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Switch defaultChecked
                                                                 disabled={isSubmitting || isLoading}/>}
                                                label="Remember me"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{
                                            textAlign: 'end'
                                        }}>
                                            <Button
                                                variant={'contained'}
                                                color={'primary'}
                                                disabled={isSubmitting || isLoading}
                                                fullWidth
                                                type={'submit'}
                                                size={'large'}
                                            >
                                                {isSubmitting || isLoading ?
                                                    <CircularProgress color="inherit" size={21} sx={{
                                                        padding: '3px'
                                                    }}/> : 'Sign In'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </FormGroup>
                            </form>
                        )}
                    </Formik>
                </Stack>
            </Paper>
        </Container>
    );
}

SignInPage.propTypes = {};