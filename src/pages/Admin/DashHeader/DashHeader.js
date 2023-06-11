import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Menu, MenuItem } from '../../../../node_modules/@mui/material/index';
import HeaderUser from '../../../assets/images/header_user.svg';
import Notify from '../../../assets/images/notification.svg';
import Round from '../../../assets/images/round3.jpg';
import profileNotify from '../../../assets/images/profileNotify.svg';
import { MdOutlineNotifications } from 'react-icons/md';
import settingNotify from '../../../assets/images/settingNotify.svg';
import logOutNotify from '../../../assets/images/logOutNotify.svg';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Humberger from '../../../assets/images/mobilehumberger.svg';
import styles from '../DashHeader/styles.module.scss';
import axios from '../../../../node_modules/axios/index';
import moment from 'moment';
const DashHeader = (props) => {
    const style = {
        width: '290px',
        overflow: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            height: '3.5px',
            marginLeft: '5px'
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
            marginLeft: '5px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgb(238, 238, 238)',
            borderRadius: '20px',
            border: '1px solid white',
            marginLeft: '5px'
        }
    };
    const items = JSON.parse(localStorage.getItem('admin'));
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [pic, setPic] = useState();
    const open1 = Boolean(toggle1);
    const open2 = Boolean(toggle2);
    const navigate = useNavigate();
    const [menuNotify, setMenuNotify] = useState([]);
    const MenuNotification = async (id) => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/notifications/${id}?limit=20`);
        setMenuNotify(res.data);
        // if (res.status === 200) {
        //     setLoading(false);
        //     setPosts(res.data.data.data);
        // }
    };
    const DeleteNotification = async (id) => {
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/user/seeOneNotifications/${id}`);
        if (res.status === 200) {
            // userType === 'admin' ? navigate('/admin/notifications') : navigate('/user/notifications');
        }
    };
    const goToPreview = (data) => {
        handleClose();
        DeleteNotification(data?.notificationId);
        navigate('/admin/preview', { state: { id: data?.receiptId } });
    };
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('admin'));
        if (items) {
            setPic(items.profileImage);
        }
        MenuNotification(items._id);
    }, [goToPreview]);
    const logOut = () => {
        localStorage.removeItem('admin');
        navigate('/login');
    };
    const Toggel1 = (event) => {
        setToggle1(event.currentTarget);
    };
    const Toggel2 = (event) => {
        setToggle2(event.currentTarget);
    };
    const handleClose = () => {
        setToggle1(null);
        setToggle2(null);
    };
    const MobileToggel = () => {
        props.setOpenRight(true);
    };
    return (
        <Box className={styles.wrapper}>
            <Box className={styles.mainHeader}>
                <Box
                    onClick={() => {
                        props.setOpenLeft(true);
                    }}
                    sx={{ display: { xs: 'block', sm: 'none' }, pl: 2.5, cursor: 'pointer' }}
                >
                    <img src={Humberger} alt="" />
                </Box>
                <Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant="h2">
                    Friday, November 9, 2022
                </Typography>
                <Box className={styles.headerPopup} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box className={styles.notifyWrapper} sx={{ cursor: 'pointer' }} onClick={Toggel2}>
                        {/* <img src={Notify} alt="notification" /> */}
                        <MdOutlineNotifications className={styles.notifyIcon} />
                        <Box className={styles.notifyCount}>
                            <Typography variant="h3">{menuNotify.length <= 4 ? menuNotify.length : '4+'}</Typography>
                        </Box>
                    </Box>
                    <Box
                        id="basic-button"
                        onClick={Toggel1}
                        className={styles.roundWrapper}
                        sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'block' } }}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        {props.data.profileImageUrl ? (
                            <img src={props.data.profileImageUrl} alt="user" />
                        ) : pic ? (
                            <img src={pic} alt="user" />
                        ) : (
                            <img src={HeaderUser} alt="user" />
                        )}
                    </Box>
                    <Menu
                        sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'block' } }}
                        id="basic-menu"
                        toggle1={toggle1}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        PaperProps={{
                            style: {
                                marginTop: '65px',
                                width: '230px'
                            }
                        }}
                        open={open1}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                    >
                        <MenuItem onClick={handleClose} component={Link} to="/admin/profile">
                            <Box sx={{ display: 'flex', alignItems: 'center', pt: 1.5, pl: 1.2 }}>
                                <img src={profileNotify} alt="" />
                                <Typography
                                    sx={{ paddingLeft: '7px', fontWeight: '400', fontFamily: 'poppins', color: '#344054' }}
                                    variant="h5"
                                >
                                    Profile
                                </Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/admin/setting">
                            <Box sx={{ display: 'flex', alignItems: 'center', pt: 1, pl: 1 }}>
                                <img src={settingNotify} alt="" />

                                <Typography
                                    sx={{ paddingLeft: '7px', fontWeight: '400', fontFamily: 'poppins', color: '#344054' }}
                                    variant="h5"
                                >
                                    Settings
                                </Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem sx={{ p: 0 }} onClick={handleClose}>
                            <Box
                                onClick={logOut}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 1,
                                    py: 1,
                                    width: '100%',
                                    borderTop: '1px solid #F2F4F7'
                                }}
                            >
                                <img style={{ marginLeft: '27px' }} src={logOutNotify} alt="" />

                                <Typography
                                    sx={{ paddingLeft: '7px', fontWeight: '400', fontFamily: 'poppins', color: '#344054' }}
                                    variant="h5"
                                >
                                    Log Out
                                </Typography>
                            </Box>
                        </MenuItem>
                    </Menu>
                    <Menu
                        sx={{ cursor: 'pointer' }}
                        id="basic-menu"
                        toggle2={toggle2}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        PaperProps={{
                            style: {
                                marginTop: '65px',
                                width: '402px',
                                paddingBottom: '2px',
                                maxHeight: '418px'
                            }
                        }}
                        open={open2}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                    >
                        <MenuItem onClick={handleClose} sx={{ p: 0 }} component={Link} to="/admin/notifications">
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    borderBottom: '1px solid #F2F4F7',
                                    pb: 1.5,
                                    pt: 1
                                }}
                            >
                                <Typography
                                    sx={{ paddingLeft: '16px', fontWeight: '400', fontFamily: 'poppins', color: '#344054' }}
                                    variant="h5"
                                >
                                    Notifications
                                </Typography>
                                <Typography
                                    sx={{ paddingRight: '20px', fontWeight: '400', fontFamily: 'poppins', color: '#344054' }}
                                    variant="h5"
                                >
                                    View All
                                </Typography>
                            </Box>
                        </MenuItem>
                        {menuNotify.map((popup) => (
                            <MenuItem sx={{ p: 0, mt: 1 }}>
                                <Box
                                    onClick={() => goToPreview({ receiptId: popup?.receipt?._id, notificationId: popup?.notificationId })}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
                                        padding: '8px 12px 8px 18px'
                                    }}
                                >
                                    <Box sx={{ width: '55px', height: '55px', borderRadius: '50%' }}>
                                        <img
                                            style={{
                                                width: '55px',
                                                height: '55px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }}
                                            src={popup.profileImage}
                                            alt=""
                                        />
                                    </Box>
                                    <Box sx={{ paddingLeft: '3px' }}>
                                        <Box sx={style}>
                                            <Typography
                                                sx={{ paddingLeft: '7px', fontWeight: '500', fontFamily: 'poppins', color: '#101828' }}
                                                variant="h5"
                                            >
                                                {popup.username}
                                            </Typography>
                                        </Box>
                                        <Box sx={style}>
                                            <Typography
                                                sx={{
                                                    paddingLeft: '7px',
                                                    fontWeight: '400',
                                                    fontSize: '12px',
                                                    fontFamily: 'poppins',
                                                    color: '#000000'
                                                }}
                                                variant="h5"
                                            >
                                                {popup.message}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography
                                                sx={{
                                                    paddingLeft: '7px',
                                                    paddingTop: '4px',
                                                    fontWeight: '400',
                                                    fontSize: '10px',
                                                    fontFamily: 'poppins',
                                                    color: '#6C6C6C'
                                                }}
                                                variant="h5"
                                            >
                                                {moment(popup.read_at).fromNow()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </MenuItem>
                        ))}
                    </Menu>
                    <Box
                        onClick={MobileToggel}
                        className={styles.roundWrapper}
                        sx={{ cursor: 'pointer', display: { xs: 'block', sm: 'none' } }}
                    >
                        {props.data.profileImageUrl ? (
                            <img src={props.data.profileImageUrl} alt="user" />
                        ) : pic ? (
                            <img src={pic} alt="user" />
                        ) : (
                            <img src={HeaderUser} alt="user" />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DashHeader;
