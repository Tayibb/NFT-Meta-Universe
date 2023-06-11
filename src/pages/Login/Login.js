import { React, useState, useEffect } from 'react';
import { Box, Typography, Button, Link, FormControlLabel, Checkbox } from '../../../node_modules/@mui/material/index';
import styles from '../Login/styles.module.scss';
import AuthHeader from 'components/common/AuthHeader/AuthHeader';
import AuthFooter from 'components/common/AuthFooter/AuthFooter';
import Google from '../../assets/images/icons/google.svg';
import Facebook from '../../assets/images/icons/fb.svg';
import Git from '../../assets/images/icons/git.svg';
import Twitter from '../../assets/images/icons/twitter.svg';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { ThreeDots } from '../../../node_modules/react-loader-spinner/dist/index';
import { LoginSocialGoogle } from 'reactjs-social-login';
import EmailIcon from '../../assets/images/icons/login_input.svg';
import remBase from '../../assets/images/remBase.svg';
import remChecked from '../../assets/images/CheckedLogin.svg';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useFormik } from 'formik';
import { ValidationLogin } from 'schema/index';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from '../../../node_modules/axios/index';
import CryptoJS from '../../../node_modules/crypto-js/index';

let initialValues = {
    email: '',
    password: ''
};
const Login = () => {
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [callOnClick, setCallOnClick] = useState(true);

    if (localStorage.getItem('adminRememberMe')) {
        const items = JSON.parse(localStorage.getItem('adminRememberMe'));
        const decrypt = CryptoJS.enc.Base64.parse(items.password).toString(CryptoJS.enc.Utf8);
        initialValues = {
            email: items.email,
            password: decrypt
        };
    }

    if (localStorage.getItem('userRememberMe')) {
        const items = JSON.parse(localStorage.getItem('userRememberMe'));
        const decrypt = CryptoJS.enc.Base64.parse(items.password).toString(CryptoJS.enc.Utf8);
        initialValues = {
            email: items.email,
            password: decrypt
        };
    }
    useEffect(() => {
        if (localStorage.getItem('userRememberMe') || localStorage.getItem('adminRememberMe')) {
            setChecked(true);
        }
        if (!localStorage.getItem('userRememberMe') && !localStorage.getItem('adminRememberMe')) {
            initialValues = {
                email: '',
                password: ''
            };
        }
    }, []);
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: ValidationLogin,
        onSubmit: async (values, action) => {
            setLoading(true);
            let result = await axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, values)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        setLoading(false);
                        action.resetForm();
                        setAlert(true);
                        if (res.data.user.role === 'admin') {
                            setLoading(true);
                            localStorage.setItem(
                                'admin',
                                JSON.stringify({
                                    _id: res.data.user._id,
                                    username: res.data.user.username,
                                    email: res.data.user.email,
                                    role: res.data.user.role,
                                    token: res.data.token,
                                    bio: res.data.user.bio,
                                    profileImage: res.data.user.profileImage
                                })
                            );
                            if (checked === true) {
                                if (localStorage.getItem('adminRememberMe')) {
                                    localStorage.removeItem('adminRememberMe');
                                }
                                const passwordText = values.password;
                                const encrypt = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(passwordText));
                                localStorage.setItem(
                                    'adminRememberMe',
                                    JSON.stringify({
                                        email: values.email,
                                        password: encrypt
                                    })
                                );
                            } else {
                                if (localStorage.getItem('adminRememberMe')) {
                                    localStorage.removeItem('adminRememberMe');
                                }
                            }
                            setTimeout(() => {
                                navigate('/admin');
                            }, 500);
                        } else {
                            setLoading(false);
                            localStorage.setItem(
                                'user',
                                JSON.stringify({
                                    _id: res.data.user._id,
                                    username: res.data.user.username,
                                    email: res.data.user.email,
                                    role: res.data.user.role,
                                    token: res.data.token,
                                    bio: res.data.user.bio,
                                    profileImage: res.data.user.profileImage
                                })
                            );
                            if (checked === true) {
                                if (localStorage.getItem('userRememberMe')) {
                                    localStorage.removeItem('userRememberMe');
                                }
                                const passwordText = values.password;
                                const encrypt = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(passwordText));
                                localStorage.setItem(
                                    'userRememberMe',
                                    JSON.stringify({
                                        email: values.email,
                                        password: encrypt
                                    })
                                );
                            } else {
                                if (localStorage.getItem('userRememberMe')) {
                                    localStorage.removeItem('userRememberMe');
                                }
                            }
                            setTimeout(() => {
                                navigate('/user');
                            }, 500);
                        }
                    } else {
                        setLoading(false);
                        setErrorMessage('Enter correct Email or Password');
                        setErrorAlert(true);
                        setTimeout(() => {
                            setErrorAlert(false);
                        }, 2500);
                    }
                })
                .catch(() => {
                    setLoading(false);
                    setErrorMessage('Enter correct Email or Password');
                    setErrorAlert(true);
                    setTimeout(() => {
                        setErrorAlert(false);
                    }, 2500);
                });
        }
    });

    function openRedditLogin() {
        window.open(
            `https://www.reddit.com/api/v1/authorize?client_id=5su-Nf557m83XsxpfmNM_Q&response_type=code&state=yolo&redirect_uri=https://nft-meta.invo.zone/login/callback&duration=permanent&scope=identity,submit,save`,
            '_self'
        );
    }
    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            return;
        }
        setPasswordType('password');
    };

    const openTwitterLogin = () => {
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/twitter`;
    };
    const handleChecked = (event) => {
        setChecked(event.target.checked);
    };
    const marginRightZero = {
        marginRight: '0'
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
                            <Typography variant="h2">You have been successfully logged in ! </Typography>
                        </Box>
                    ) : (
                        <Box className={`${styles.alert} ${styles.hide}`}>
                            <Typography variant="h1">Success!</Typography>
                            <Typography variant="h2">You have been successfully logged in ! </Typography>
                        </Box>
                    )}
                    {errorAlert ? (
                        <Box className={`${styles.errorAlert} ${styles.show}`}>
                            <Typography variant="h1">Invalid!</Typography>
                            <Typography variant="h2">{errorMessage}</Typography>
                        </Box>
                    ) : (
                        <Box className={`${styles.errorAlert} ${styles.hide}`}>
                            <Typography variant="h1">Invalid!</Typography>
                            <Typography variant="h2">{errorMessage}</Typography>
                        </Box>
                    )}
                    {/* ---login_Body */}
                    <Box className={styles.loginBody}>
                        <Box className={styles.loginCard}>
                            <Box sx={{ px: 4 }}>
                                <Typography variant="h1">Login</Typography>
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
                                                        <AiOutlineEyeInvisible
                                                            style={{ color: '#E1E1E1', marginTop: '5px', fontSize: '18px' }}
                                                        />
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
                                                        <AiOutlineEyeInvisible
                                                            style={{ color: '#E1E1E1', marginTop: '5px', fontSize: '18px' }}
                                                        />
                                                    )}
                                                </Box>
                                            </Box>
                                        )}
                                        {errors.password && touched.password ? (
                                            <p className={styles.formErrors}>{errors.password}</p>
                                        ) : null}
                                    </Box>
                                    <Box className={styles.loginCheck}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <FormControlLabel
                                                sx={marginRightZero}
                                                control={
                                                    <Checkbox
                                                        sx={{ ml: 0.5 }}
                                                        style={{ marginTop: '-7px' }}
                                                        checked={checked}
                                                        icon={<img src={remBase} alt="checkboxbase" />}
                                                        onChange={handleChecked}
                                                        checkedIcon={<img src={remChecked} alt="checkedbox" />}
                                                    />
                                                }
                                            />
                                            <Typography variant="h6">Remember me</Typography>
                                        </Box>
                                        <Box className="forgetPass">
                                            <NavLink to="/forgotpassword" style={{ color: '#ffffff', textDecoration: 'none' }}>
                                                Forgot Password?
                                            </NavLink>
                                        </Box>
                                    </Box>
                                    <Box className={styles.loginSocial}>
                                        {/* ---Social-Login with Google */}
                                        {callOnClick ? (
                                            <LoginSocialGoogle
                                                sx={{ pr: 1 }}
                                                client_id={'572728586818-59i3tslhnjfagapo6trb38r0fbda27hb.apps.googleusercontent.com'}
                                                scope="openid profile email"
                                                discoveryDocs="claims_supported"
                                                access_type="offline"
                                                onResolve={async ({ data }) => {
                                                    let checkUser = await axios
                                                        .get(
                                                            `${process.env.REACT_APP_BACKEND_URL}/api/user/getSocialAppUserData/${data.email}`
                                                        )
                                                        .then(async (res) => {
                                                            if (res.status === 200 || res.status === 201) {
                                                                console.log('res', res);
                                                                localStorage.setItem(
                                                                    `${res.data.data.doc.role}`,
                                                                    JSON.stringify({
                                                                        _id: res.data.data.doc._id,
                                                                        username: res.data.data.doc.username,
                                                                        email: res.data.data.doc.email,
                                                                        role: res.data.data.doc.role,
                                                                        socialLogin: 'User is Login with Google',
                                                                        token: res.data.data.token,
                                                                        profileImage: res.data.data.doc.profileImage
                                                                    })
                                                                );
                                                                if (res.data.data.doc.role === 'admin') {
                                                                    navigate('/admin');
                                                                } else {
                                                                    res.data.data.doc.role === 'user';
                                                                    {
                                                                        navigate('/user');
                                                                    }
                                                                }
                                                            }
                                                        })
                                                        .catch(async (e) => {
                                                            if (e.response.data === 'User Not found.') {
                                                                const userName = data.name.replace(/\s/g, '');
                                                                const givenValues = {
                                                                    username: userName,
                                                                    email: data.email,
                                                                    profileImage: data.picture
                                                                };
                                                                await axios
                                                                    .post(
                                                                        `${process.env.REACT_APP_BACKEND_URL}/api/user/registerSocialAppUser`,
                                                                        givenValues
                                                                    )
                                                                    .then((res) => {
                                                                        if (res.status === 200 || res.status === 201) {
                                                                            localStorage.setItem(
                                                                                'user',
                                                                                JSON.stringify({
                                                                                    _id: res.data.data.user._id,
                                                                                    username: res.data.data.user.username,
                                                                                    email: res.data.data.user.email,
                                                                                    role: res.data.data.user.role,
                                                                                    socialLogin: 'User is Login with Google',
                                                                                    token: res.data.data.token,
                                                                                    profileImage: res.data.data.user.profileImage
                                                                                })
                                                                            );
                                                                            setLoading(false);
                                                                            setAlert(true);
                                                                            setTimeout(() => {
                                                                                navigate('/user');
                                                                            }, 1000);
                                                                        }
                                                                    })
                                                                    .catch((e) => {
                                                                        setLoading(false);
                                                                        setErrorMessage('UserName or Email Already Exists');
                                                                        setErrorAlert(true);
                                                                        setTimeout(() => {
                                                                            setErrorAlert(false);
                                                                        }, 2500);
                                                                    });
                                                            }
                                                        });
                                                }}
                                                onReject={(err) => {
                                                    setErrorMessage('Enter correct email to login');
                                                    setErrorAlert(true);
                                                    setTimeout(() => {
                                                        setErrorAlert(false);
                                                    }, 2500);
                                                }}
                                            >
                                                <img loading="lazy" src={Google} alt="google" />
                                            </LoginSocialGoogle>
                                        ) : null}
                                        {/* ---Social-Login with Facebook */}
                                        {callOnClick ? (
                                            <LoginSocialFacebook
                                                sx={{ px: 2 }}
                                                appId="485717770396070"
                                                onResolve={async ({ data }) => {
                                                    console.log('facebook', data);
                                                    let checkUser = await axios
                                                        .get(
                                                            `${process.env.REACT_APP_BACKEND_URL}/api/user/getSocialAppUserData/${data.email}`
                                                        )
                                                        .then(async (res) => {
                                                            if (res.status === 200 || res.status === 201) {
                                                                console.log('res', res);
                                                                localStorage.setItem(
                                                                    `${res.data.data.doc.role}`,
                                                                    JSON.stringify({
                                                                        _id: res.data.data.doc._id,
                                                                        username: res.data.data.doc.username,
                                                                        email: res.data.data.doc.email,
                                                                        role: res.data.data.doc.role,
                                                                        socialLogin: 'User is Login with Facebook',
                                                                        token: res.data.data.token,
                                                                        profileImage: res.data.data.doc.profileImage
                                                                    })
                                                                );
                                                                if (res.data.data.doc.role === 'admin') {
                                                                    navigate('/admin');
                                                                } else {
                                                                    res.data.data.doc.role === 'user';
                                                                    {
                                                                        navigate('/user');
                                                                    }
                                                                }
                                                            }
                                                        })
                                                        .catch(async (e) => {
                                                            if (e.response.data === 'User Not found.') {
                                                                const userName = data.name.replace(/\s/g, '');
                                                                const givenValues = {
                                                                    username: userName,
                                                                    email: data.email,
                                                                    profileImage: data.picture.data.url
                                                                };
                                                                console.log('givenValues', givenValues);
                                                                await axios
                                                                    .post(
                                                                        `${process.env.REACT_APP_BACKEND_URL}/api/user/registerSocialAppUser`,
                                                                        givenValues
                                                                    )
                                                                    .then((res) => {
                                                                        if (res.status === 200 || res.status === 201) {
                                                                            localStorage.setItem(
                                                                                'user',
                                                                                JSON.stringify({
                                                                                    _id: res.data.data.user._id,
                                                                                    username: res.data.data.user.username,
                                                                                    email: res.data.data.user.email,
                                                                                    role: res.data.data.user.role,
                                                                                    socialLogin: 'User is Login with Facebook',
                                                                                    token: res.data.data.token,
                                                                                    profileImage: res.data.data.user.profileImage
                                                                                })
                                                                            );
                                                                            setLoading(false);
                                                                            setAlert(true);
                                                                            setTimeout(() => {
                                                                                navigate('/user');
                                                                            }, 1000);
                                                                        }
                                                                    })
                                                                    .catch((e) => {
                                                                        setLoading(false);
                                                                        setErrorMessage('UserName or Email Already Exists');
                                                                        setErrorAlert(true);
                                                                        setTimeout(() => {
                                                                            setErrorAlert(false);
                                                                        }, 2500);
                                                                    });
                                                            }
                                                        });
                                                }}
                                                // {(res) => {
                                                //     localStorage.setItem('user', JSON.stringify(res.data));
                                                //     navigate('/user');
                                                // }}
                                                onReject={(err) => {}}
                                            >
                                                <img loading="lazy" style={{ paddingLeft: '14px' }} src={Facebook} alt="facebook" />
                                            </LoginSocialFacebook>
                                        ) : null}
                                        {/* ---Social-Login with Reddit */}
                                        <Link
                                            sx={{ px: 2 }}
                                            onClick={() => {
                                                openRedditLogin();
                                            }}
                                        >
                                            <img loading="lazy" src={Git} alt="git" />
                                        </Link>
                                        {/* ---Social-Login with Twitter */}
                                        <Link onClick={openTwitterLogin}>
                                            <img loading="lazy" src={Twitter} alt="twitter" />
                                        </Link>
                                    </Box>
                                    <Box className={styles.loginBtn}>
                                        <form onSubmit={handleSubmit}>
                                            <Button type="submit">Login</Button>
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

export default Login;
