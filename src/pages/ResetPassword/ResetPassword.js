import { React, useState } from 'react';
import { Box, Typography, Link, Button } from '../../../node_modules/@mui/material/index';
import styles from '../ResetPassword/styles.module.scss';
import AuthHeader from 'components/common/AuthHeader/AuthHeader';
import AuthFooter from 'components/common/AuthFooter/AuthFooter';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useFormik } from 'formik';
import { values } from 'lodash';
import { ValidationResetPass } from 'schema/index';
import { useLocation } from 'react-router-dom';
import axios from '../../../node_modules/axios/index';
import { useNavigate } from 'react-router-dom';
const initialValues = {
    password: '',
    confirmPassword: ''
};
const ResetPassword = () => {
    const [passwordType, setPasswordType] = useState('password');
    const [passwordTypeConfirm, setPasswordTypeConfirm] = useState('password');
    const [passwordInput, setPasswordInput] = useState('');
    const [alert, setAlert] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: ValidationResetPass,
        onSubmit: async (values, action) => {
            const token = location.pathname.split('=')[1];
            const password = values.password;
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/updateForgetPassword`, { password, token });
            action.resetForm();
            setAlert(true);
            setTimeout(() => {
                navigate('/login');
            }, 5000);
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
    const toggleConfirmPassword = () => {
        if (passwordTypeConfirm === 'password') {
            setPasswordTypeConfirm('text');
            return;
        }
        setPasswordTypeConfirm('password');
    };
    return (
        <Box className={styles.login}>
            {/* ---Header---- */}
            <Box className={styles.header}>
                <AuthHeader />
            </Box>
            {/* ---alert--- */}
            {alert ? (
                <Box className={`${styles.alert} ${styles.show}`}>
                    <Typography variant="h1">Success!</Typography>
                    <Typography variant="h2">Password resest request submitted successfully. </Typography>
                </Box>
            ) : (
                <Box className={`${styles.alert} ${styles.hide}`}>
                    <Typography variant="h1">Success!</Typography>
                    <Typography variant="h2">You have been successfully logged into NFT </Typography>
                </Box>
            )}
            {/* ---login_Body */}
            <Box className={styles.loginBody}>
                <Box className={styles.loginCard}>
                    <Box sx={{ px: 4 }}>
                        <Typography variant="h1">Reset Password</Typography>
                        <Typography variant="h2">
                            Enter the email address associated with your account and we’ll send you a link to reset your password.
                        </Typography>
                        <Box className={styles.formContent} pt={5}>
                            <Box pt={2.2}>
                                <label htmlFor="password">
                                    Password<span>*</span>
                                </label>
                                <br />
                                {errors.password && touched.password ? (
                                    <Box className={`${styles.loginInput} ${styles.passInput} ${styles.goldenBorder}`}>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type={passwordType}
                                                id="password"
                                                name="password"
                                                placeholder="Enter your Password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </form>
                                        <Box onClick={togglePassword} sx={{ pr: 2, cursor: 'pointer' }}>
                                            {passwordType === 'password' ? (
                                                <AiOutlineEye style={{ color: '#E1E1E1', marginTop: '5px', fontSize: '18px' }} />
                                            ) : (
                                                <AiOutlineEyeInvisible style={{ color: '#E1E1E1', marginTop: '5px', fontSize: '18px' }} />
                                            )}
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box className={`${styles.loginInput} ${styles.passInput}`}>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type={passwordType}
                                                id="password"
                                                name="password"
                                                placeholder="Enter your Password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </form>
                                        <Box onClick={togglePassword} sx={{ pr: 2, cursor: 'pointer' }}>
                                            {passwordType === 'password' ? (
                                                <AiOutlineEye style={{ color: '#E1E1E1', marginTop: '5px', fontSize: '18px' }} />
                                            ) : (
                                                <AiOutlineEyeInvisible style={{ color: '#E1E1E1', marginTop: '5px', fontSize: '18px' }} />
                                            )}
                                        </Box>
                                    </Box>
                                )}
                                {errors.password && touched.password ? <p className={styles.formErrors}>{errors.password}</p> : null}
                            </Box>
                            <Box pt={2.2}>
                                <label htmlFor="confirmPassword">
                                    Confirm Password<span>*</span>
                                </label>
                                <br />
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <Box className={`${styles.loginInput} ${styles.passInput} ${styles.goldenBorder}`}>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type={passwordTypeConfirm}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                placeholder="Enter your Password here"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </form>
                                        <Box onClick={toggleConfirmPassword} sx={{ pr: 2, cursor: 'pointer' }}>
                                            {passwordTypeConfirm === 'password' ? (
                                                <AiOutlineEye style={{ color: '#E1E1E1', marginTop: '5px', fontSize: '18px' }} />
                                            ) : (
                                                <AiOutlineEyeInvisible style={{ color: '#E1E1E1', marginTop: '5px', fontSize: '18px' }} />
                                            )}
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box className={`${styles.loginInput} ${styles.passInput}`}>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type={passwordTypeConfirm}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                placeholder="Enter your Password"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </form>
                                        <Box onClick={toggleConfirmPassword} sx={{ pr: 2, cursor: 'pointer' }}>
                                            {passwordTypeConfirm === 'password' ? (
                                                <AiOutlineEye style={{ color: '#E1E1E1', marginTop: '5px', fontSize: '18px' }} />
                                            ) : (
                                                <AiOutlineEyeInvisible style={{ color: '#E1E1E1', marginTop: '5px', fontSize: '18px' }} />
                                            )}
                                        </Box>
                                    </Box>
                                )}
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <p className={styles.formErrors}>{errors.confirmPassword}</p>
                                ) : null}
                            </Box>
                            <Box className={styles.loginBtn}>
                                <form onSubmit={handleSubmit}>
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Box>
                            <Box className={styles.SignUp} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="h5">Don't have an account?</Typography>
                                <Link href="/register" sx={{ pl: 1 }}>
                                    Sign Up
                                </Link>
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
    );
};

export default ResetPassword;
