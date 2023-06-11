import { React, useState } from 'react';
import { Box, Typography, Button } from '../../../node_modules/@mui/material/index';
import styles from '../QRScan/styles.module.scss';
import AuthHeader from 'components/common/AuthHeader/AuthHeader';
import AuthFooter from 'components/common/AuthFooter/AuthFooter';
import { ThreeDots } from '../../../node_modules/react-loader-spinner/dist/index';
import EmailIcon from '../../assets/images/icons/login_input.svg';
import QRScanAvatar from '../../assets/images/QRScan.png';
import Upload from '../../assets/images/icons/upload.svg';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { values } from 'lodash';
import { ValidationQRScan } from 'schema/index';

const initialValues = {
    email: ''
};
const QRScan = () => {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: ValidationQRScan,
        onSubmit: (values, action) => {
            setLoading(true);
            console.log(values);
            action.resetForm();
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setLoading(false);
            }, 2000);
        }
    });
    console.log(errors);
    const [passwordType, setPasswordType] = useState('password');
    const [passwordInput, setPasswordInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
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
                            <Typography variant="h1">Congratulations!</Typography>
                            <Typography variant="h2">Your receipt submitted successfully! Please wait for admin approval.</Typography>
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
                            <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <Box className={styles.QRScanPreview} sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                                    <img loading="lazy" src={QRScanAvatar} alt="QRscanAvatar" />
                                </Box>
                            </Box>
                            <Box sx={{ px: 4 }}>
                                <Box pt={2}>
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
                                        <form>
                                            <Button className={styles.uploadBtn}>
                                                <img loading="lazy" src={Upload} alt="Upload" />
                                                <span style={{ paddingLeft: '15px' }}>Upload your Receipt</span>
                                            </Button>
                                        </form>
                                        <form onSubmit={handleSubmit}>
                                            <Button className={styles.submitBtn} type="submit">
                                                Continue
                                            </Button>
                                        </form>
                                    </Box>
                                    <Box
                                        className={styles.SignUp}
                                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}
                                    >
                                        <Typography variant="h5">Don't have an account?</Typography>
                                        <NavLink to="/register" style={{ paddingLeft: '8px', color: '#fedb32', textDecoration: 'none' }}>
                                            Sign Up
                                        </NavLink>
                                    </Box>
                                    <Box
                                        className={styles.LogInEnd}
                                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <Typography variant="h5">Already a user?</Typography>
                                        <NavLink to="/register" style={{ paddingLeft: '8px', color: '#fedb32', textDecoration: 'none' }}>
                                            Log In
                                        </NavLink>
                                    </Box>
                                    <Typography variant="h6">
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                                    </Typography>
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

export default QRScan;
