import { React, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Button, Tabs, Tab } from '../../../node_modules/@mui/material/index';
import styles from '../Profile/styles.module.scss';
import editIcon from '../../assets/images/editIcon.svg';
import HeaderUser from '../../assets/images/header_user.svg';
import axios from '../../../node_modules/axios/index';
import { ThreeDots } from '../../../node_modules/react-loader-spinner/dist/index';
import { useFormik } from 'formik';
import { ValidationPassword } from 'schema/index';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const initialValues = {
    currentPassword: '',
    confirmPassword: '',
    newPassword: ''
};

const Profile = (props) => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [bio, setBio] = useState('');
    const [pic, setPic] = useState('');
    const [urlImage, setUrlImage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [valueTab, setValueTab] = useState(0);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const [passwordTypeNew, setPasswordTypeNew] = useState('password');
    const [loading, setLoading] = useState(false);
    const [passwordTypeConfirm, setPasswordTypeConfirm] = useState('password');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [value, setValue] = useState({
        currentPassword: '',
        newPassword: ''
    });

    useEffect(() => {
        setLoading(true);
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setItems(items);
            setName(items.username);
            setEmail(items.email);
            if (items.bio) {
                setBio(items.bio);
            }
            if (items.profileImage) {
                setPic(items.profileImage);
            }
            if (items.profileImage) {
                setUrlImage(items.profileImage);
            }
        }
        const adminItems = JSON.parse(localStorage.getItem('admin'));
        if (adminItems) {
            setItems(adminItems);
            setName(adminItems.username);
            setEmail(adminItems.email);
            if (adminItems.bio) {
                setBio(adminItems.bio);
            }
            if (adminItems.profileImage) {
                setPic(adminItems.profileImage);
            }
            if (adminItems.profileImage) {
                setUrlImage(adminItems.profileImage);
            }
        }
        setLoading(false);
    }, []);

    const response = (urlImage) => {
        props.setProfileImageHandler(urlImage);
    };
    const setUserHeaderProfileImage = (urlImage) => {
        props.setUserProfileImageHandler(urlImage);
    };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: ValidationPassword,
        onSubmit: async (values, action) => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 5000);
            action.resetForm();
            let data = {
                email: email,
                newPassword: values.newPassword,
                currentPassword: values.currentPassword
            };
            let result = await axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/resetPassword/${userId}`, data)
                .then((res) => {
                    setAlert(false);
                    if (res.status === 200 || res.status === 201) {
                        setErrorAlert(true);
                        navigate('/login');
                    } else {
                        setErrorMessage('Current Password is not Correct');
                        setTimeout(() => {
                            setErrorAlert(false);
                        }, 5000);
                    }
                })
                .catch((e) => {
                    setErrorMessage(e.response.data.message);
                    setErrorAlert(true);
                    setTimeout(() => {
                        setErrorAlert(false);
                    }, 5000);
                });
        }
    });
    const userId = items?._id;
    const token = items?.token;
    const hiddenFileInput = useRef(null);
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setUrlImage(url);
        setPic(file);
    };
    let option = {
        username: name,
        bio: bio,
        email: email,
        profileImage: pic
    };
    const formData = new FormData();
    for (var key in option) {
        formData.append(key, option[key]);
    }
    const updateProfile = async () => {
        setLoading(true);
        await axios
            .put(`${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}`, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                if ((res.status === 200 || res.status === 201) && res.data.data.doc.role === 'admin') {
                    localStorage.removeItem('admin');
                    localStorage.setItem(
                        'admin',
                        JSON.stringify({
                            token: token,
                            _id: res.data.data.doc._id,
                            username: res.data.data.doc.username,
                            role: res.data.data.doc.role,
                            email: res.data.data.doc.email,
                            bio: res.data.data.doc.bio,
                            profileImage: res.data.data.doc.profileImage
                        })
                    );
                    setLoading(false);
                    setUrlImage(res.data.data.doc.profileImage);
                    setAlert(true);
                    setTimeout(() => {
                        setAlert(false);
                    }, 2500);
                    response(urlImage);
                } else if ((res.status === 200 || res.status === 201) && res.data.data.doc.role === 'user') {
                    localStorage.removeItem('user');
                    localStorage.setItem(
                        'user',
                        JSON.stringify({
                            token: token,
                            _id: res.data.data.doc._id,
                            username: res.data.data.doc.username,
                            role: res.data.data.doc.role,
                            email: res.data.data.doc.email,
                            bio: res.data.data.doc.bio,
                            profileImage: res.data.data.doc.profileImage
                        })
                    );
                    setLoading(false);
                    setUrlImage(res.data.data.doc.profileImage);
                    setAlert(true);
                    setTimeout(() => {
                        setAlert(false);
                    }, 2500);
                    setUserHeaderProfileImage(urlImage);
                } else {
                    setLoading(false);
                    setErrorMessage('Something went wrong');
                    setErrorAlert(true);
                    setTimeout(() => {
                        setErrorAlert(false);
                    }, 5000);
                }
            })
            .catch((e) => {
                setLoading(false);
                setErrorMessage(e.response.data.message || e.response.data);
                setErrorAlert(true);
                setTimeout(() => {
                    setErrorAlert(false);
                }, 5000);
            });
    };
    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            return;
        }
        setPasswordType('password');
    };
    const togglePasswordNew = () => {
        if (passwordTypeNew === 'password') {
            setPasswordTypeNew('text');
            return;
        }
        setPasswordTypeNew('password');
    };
    const togglePasswordConfirm = () => {
        if (passwordTypeConfirm === 'password') {
            setPasswordTypeConfirm('text');
            return;
        }
        setPasswordTypeConfirm('password');
    };
    const handleTabChange = (event, newValue) => {
        setValueTab(newValue);
    };
    return (
        <Box className={styles.mainProfile}>
            {alert ? (
                <Box className={`${styles.alert} ${styles.show}`}>
                    <Typography variant="h1">Success!</Typography>
                    <Typography variant="h2">Profile updated successfully! </Typography>
                </Box>
            ) : (
                <Box className={`${styles.alert} ${styles.hide}`}>
                    <Typography variant="h1">Success!</Typography>
                    <Typography variant="h2">Profile updated successfully! </Typography>
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
            <Box sx={{ pl: { xs: 2, sm: 1.6 }, pt: 1.8, pr: 2 }}>
                <Typography variant="h2">Profile</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: { xs: 3.5, sm: 2.5, md: 0 } }}>
                    <Tabs className={styles.tabbing} value={valueTab} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab className={styles.tab1} sx={{ p: 0, fontFamily: 'poppins' }} label="Personal Information" {...a11yProps(0)} />
                        <Tab className={styles.tab2} sx={{ p: 0, fontFamily: 'poppins' }} label="Change Password" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={valueTab} className={styles.profileTab} index={0}>
                    <Box sx={{ mt: { xs: 1.5, sm: 2 } }} className={styles.profile}>
                        {loading ? (
                            <Box className={styles.bars}>
                                <ThreeDots color="#E6007C" width={50} height={50} />
                            </Box>
                        ) : (
                            <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Grid item sx={12} md={2.5} lg={3.5} xl={4}>
                                    <Box className={styles.RoundedBox}>
                                        <Box sx={{ pt: 6, ml: { xl: 6, lg: 2 } }}>
                                            <Box className={styles.profileImg}>
                                                <form>
                                                    <input
                                                        style={{ display: 'none' }}
                                                        ref={hiddenFileInput}
                                                        type="file"
                                                        size="600"
                                                        onChange={(e) => handleFileUpload(e)}
                                                    />
                                                </form>
                                                {urlImage ? (
                                                    <Box className={styles.RoundedAvatar}>
                                                        <img loading="lazy" src={urlImage} alt="Profile" />
                                                    </Box>
                                                ) : (
                                                    <Box className={styles.RoundedAvatar}>
                                                        <img loading="lazy" src={HeaderUser} alt="Profile" />
                                                    </Box>
                                                )}
                                                <Box onClick={handleClick}>
                                                    <img loading="lazy" className={styles.editIcon} src={editIcon} alt="edit Icon" />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={5}
                                    lg={6}
                                    xl={7.5}
                                    sx={{ pl: { lg: 2, xl: 0 }, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}
                                >
                                    <Box sx={{ px: 3 }} className={styles.profileForm}>
                                        <Box sx={{ display: { xl: 'flex' }, pt: 6 }}>
                                            <form>
                                                <label htmlFor="fname">Full Name</label>
                                                <br />
                                                <input
                                                    type="text"
                                                    name="fname"
                                                    id="fname"
                                                    value={name}
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                    }}
                                                />
                                            </form>
                                            <form>
                                                <label htmlFor="email">Email</label>
                                                <br />
                                                <input
                                                    text="email"
                                                    name="email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                    }}
                                                />
                                            </form>
                                        </Box>
                                        <Box sx={{ pt: 3 }}>
                                            <form>
                                                <label htmlFor="bio">Bio</label>
                                                <br />
                                                <textarea
                                                    name="bio"
                                                    id="bio"
                                                    placeholder="Enter your bio here"
                                                    value={bio}
                                                    onChange={(e) => {
                                                        setBio(e.target.value);
                                                    }}
                                                />
                                            </form>
                                        </Box>
                                        <Box sx={{ mt: 4 }}>
                                            <form>
                                                <Button className={styles.profileBtn} onClick={updateProfile}>
                                                    Save
                                                </Button>
                                            </form>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </TabPanel>
                <TabPanel value={valueTab} className={styles.PassTab} index={1}>
                    <Box className={styles.mainPass} sx={{ display: 'flex', justifyContent: 'center', mt: 2, pt: 6, pb: 9 }}>
                        {loading ? (
                            <Box className={styles.bars}>
                                <ThreeDots color="#E6007C" width={50} height={50} />
                            </Box>
                        ) : (
                            <Box className={styles.passForm} sx={{ pt: 2.6 }}>
                                <Box>
                                    <label htmlFor="currentPassword">Current Password</label>
                                    <Box className={styles.profilePassword}>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type={passwordType}
                                                name="currentPassword"
                                                id="currentPassword"
                                                value={values.currentPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </form>
                                        <Box onClick={togglePassword} sx={{ pr: 2, cursor: 'pointer' }}>
                                            {passwordType === 'password' ? (
                                                <AiOutlineEye style={{ color: '#ababab', marginTop: '5px', fontSize: '18px' }} />
                                            ) : (
                                                <AiOutlineEyeInvisible style={{ color: '#ababab', marginTop: '5px', fontSize: '18px' }} />
                                            )}
                                        </Box>
                                    </Box>
                                    {errors.currentPassword && touched.currentPassword ? (
                                        <p className={styles.passErrors}>{errors.currentPassword}</p>
                                    ) : null}
                                </Box>
                                <Box sx={{ my: 3 }}>
                                    <label htmlFor="newPassword">New Password</label>
                                    <Box className={styles.profilePassword}>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type={passwordTypeNew}
                                                name="newPassword"
                                                id="newPassword"
                                                value={values.newPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </form>
                                        <Box onClick={togglePasswordNew} sx={{ pr: 2, cursor: 'pointer' }}>
                                            {passwordTypeNew === 'password' ? (
                                                <AiOutlineEye style={{ color: '#ababab', marginTop: '5px', fontSize: '18px' }} />
                                            ) : (
                                                <AiOutlineEyeInvisible style={{ color: '#ababab', marginTop: '5px', fontSize: '18px' }} />
                                            )}
                                        </Box>
                                    </Box>
                                    {errors.newPassword && touched.newPassword ? (
                                        <p className={styles.passErrors}>{errors.newPassword}</p>
                                    ) : null}
                                </Box>
                                <Box>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Box className={styles.profilePassword}>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type={passwordTypeConfirm}
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </form>
                                        <Box onClick={togglePasswordConfirm} sx={{ pr: 2, cursor: 'pointer' }}>
                                            {passwordTypeConfirm === 'password' ? (
                                                <AiOutlineEye style={{ color: '#ababab', marginTop: '5px', fontSize: '18px' }} />
                                            ) : (
                                                <AiOutlineEyeInvisible style={{ color: '#ababab', marginTop: '5px', fontSize: '18px' }} />
                                            )}
                                        </Box>
                                    </Box>
                                    {errors.confirmPassword && touched.confirmPassword ? (
                                        <p className={styles.passErrors}>{errors.confirmPassword}</p>
                                    ) : null}
                                </Box>
                                <Box sx={{ mt: 4 }}>
                                    <form onSubmit={handleSubmit}>
                                        <Button type="submit" className={styles.passBtn}>
                                            Save
                                        </Button>
                                    </form>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </TabPanel>
            </Box>
        </Box>
    );
};

export default Profile;
