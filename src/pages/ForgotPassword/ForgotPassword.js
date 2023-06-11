import { React, useState } from 'react';
import { Box, Typography, Button } from '../../../node_modules/@mui/material/index';
import styles from '../ForgotPassword/styles.module.scss';
import AuthHeader from 'components/common/AuthHeader/AuthHeader';
import AuthFooter from 'components/common/AuthFooter/AuthFooter';
import { ThreeDots } from '../../../node_modules/react-loader-spinner/dist/index';
import EmailIcon from '../../assets/images/icons/login_input.svg';
import { useFormik } from 'formik';
import { values } from 'lodash';
import { NavLink } from 'react-router-dom';
import { ValidationForgotPass } from 'schema/index';
import axios from '../../../node_modules/axios/index';
const initialValues = {
    email: ''
};
const ForgotPassword = () => {
    const [passwordType, setPasswordType] = useState('password');
    const [passwordInput, setPasswordInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [alert, setAlert] = useState(false);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: ValidationForgotPass,
        onSubmit: async (values, action) => {
            setLoading(true);
            console.warn(values);
            let result = await axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/sendForgetEmail`, values)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        setLoading(false);
                        action.resetForm();
                        setAlert(true);
                        setTimeout(() => {
                            setAlert(false);
                        }, 5000);
                    } else {
                        setLoading(false);
                        setErrorMessage('Enter correct email to forgot password!');
                        setErrorAlert(true);
                        setTimeout(() => {
                            setErrorAlert(false);
                        }, 5000);
                    }
                })
                .catch(() => {
                    setLoading(false);
                    setErrorMessage('Enter correct email to forgot password!');
                    setErrorAlert(true);
                    setTimeout(() => {
                        setErrorAlert(false);
                    }, 5000);
                });
        }
    });
    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    };
    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            return;
        }
        setPasswordType('password');
    };
    return (
        <>
            {loading ? (
                <Box className={styles.bars}>
                    <ThreeDots color="white" width={50} height={50} />
                </Box>
            ) : (
                <Box className={styles.login}>
                    {/* ---Header---- */}
                    <Box className={styles.header}>
                        <AuthHeader />
                    </Box>
                    {/* ---alert--- */}
                    {alert ? (
                        <Box className={`${styles.alert} ${styles.show}`}>
                            <Typography variant="h1">Success!</Typography>
                            <Typography variant="h2">
                                Password reset request was sent successfully. Please check your email to reset password.
                            </Typography>
                        </Box>
                    ) : (
                        <Box className={`${styles.alert} ${styles.hide}`}>
                            <Typography variant="h1">Success!</Typography>
                            <Typography variant="h2">
                                Password reset request was sent successfully. Please check your email to reset password.{' '}
                            </Typography>
                        </Box>
                    )}
                    {errorAlert ? (
                        <Box className={`${styles.errorAlert} ${styles.show}`}>
                            <Typography variant="h1">Invalid Email!</Typography>
                            <Typography variant="h2">{errorMessage}</Typography>
                        </Box>
                    ) : (
                        <Box className={`${styles.errorAlert} ${styles.hide}`}>
                            <Typography variant="h1">Invalid Email!</Typography>
                            <Typography variant="h2">{errorMessage}</Typography>
                        </Box>
                    )}
                    {/* ---login_Body */}
                    <Box className={styles.loginBody}>
                        <Box className={styles.loginCard}>
                            <Box sx={{ px: 4 }}>
                                <Typography variant="h1">Forget Password</Typography>
                                <Typography variant="h2">
                                    Enter the email address associated with your account and we’ll send you a link to reset your password.
                                </Typography>
                                <Box pt={5}>
                                    <Box>
                                        <label htmlFor="email">
                                            Email Address<span>*</span>
                                        </label>
                                        <br />
                                        {errors.email && touched.email ? (
                                            <Box className={`${styles.loginInput} ${styles.goldenBorder}`}>
                                                <form onSubmit={handleSubmit}>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        placeholder="Enter Your Email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </form>
                                                <Box sx={{ pr: 2 }}>
                                                    <img loading="lazy" src={EmailIcon} alt="emailIcon" />
                                                </Box>
                                            </Box>
                                        ) : (
                                            <Box className={styles.loginInput}>
                                                <form onSubmit={handleSubmit}>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        placeholder="Enter Your Email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </form>
                                                <Box sx={{ pr: 2 }}>
                                                    <img loading="lazy" src={EmailIcon} alt="emailIcon" />
                                                </Box>
                                            </Box>
                                        )}
                                        {errors.email && touched.email ? <p className={styles.formErrors}>{errors.email}</p> : null}
                                    </Box>
                                    <Box className={styles.loginBtn}>
                                        <form onSubmit={handleSubmit}>
                                            <Button type="submit">Continue</Button>
                                        </form>
                                    </Box>
                                    <Box className={styles.SignUp} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography variant="h5">Don't have an account?</Typography>
                                        <NavLink to="/register" style={{ paddingLeft: '8px', color: '#fedb32', textDecoration: 'none' }}>
                                            Sign Up
                                        </NavLink>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {/* ---Footer--- */}
                    <Box className={styles.footer}>
                        <AuthFooter />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default ForgotPassword;
