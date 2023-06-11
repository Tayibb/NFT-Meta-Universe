import * as React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Pagination, Box, Button, Modal } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../Notifications/styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import Del from '../../assets/images/Del.svg';
// import Checkbase from '../../assets/images/checkbase.svg';
import { ThreeDots } from '../../../node_modules/react-loader-spinner/dist/index';
import Close from '../../assets/images/close.svg';
// import CheckedBox from '../../assets/images/checked.svg';
import axios from '../../../node_modules/axios/index';
import moment from 'moment';
export default function Notifications() {
    const [value, setValue] = useState(0);
    const [userType, setUserType] = useState('');
    // const [page, setPage] = useState(1);
    const navigate = useNavigate();
    // const [checked, setChecked] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [page, setPage] = useState(1);
    const [user_id, setUser_id] = useState('');
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [delAlert, setDelAlert] = useState(false);
    const [delAlertMessage, setDelAlertMessage] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [notifications, setNotifications] = useState([]);
    const handleClose2 = () => {
        setOpen2(false);
    };
    const handleOpen1 = () => {
        setOpen2(true);
    };
    const DeleteAllNotifications = async (id) => {
        handleClose2();
        setLoading(true);
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/user/seeAllNotifications/${id}`);
        if (res.status === 200) {
            setDelAlertMessage(res.data.message);
            setLoading(false);
            setDelAlert(true);
            setTimeout(() => {
                setDelAlert(false);
            }, 5000);
            allnotify(user_id);
            // userType === 'admin' ? navigate('/admin/notifications') : navigate('/user/notifications');
        }
    };

    const DeleteNotification = async (id) => {
        setLoading(true);
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/user/seeOneNotifications/${id}`);
        if (res.status === 200) {
            setDelAlertMessage(res.data.message);
            setLoading(false);
            setDelAlert(true);
            setTimeout(() => {
                setDelAlert(false);
            }, 3000);
            allnotify(user_id);
            // userType === 'admin' ? navigate('/admin/notifications') : navigate('/user/notifications');
        }
    };

    const allnotify = async (ID) => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/allNotifications/${ID}?page=${page}`);
        if (res.status === 200) {
            setLoading(false);
            setNotifications(res.data.data);
            setPageCount(res.data.count);
        }
    };

    const goToPreview = (id) => {
        userType === 'admin' ? navigate('/admin/preview', { state: { id: id } }) : navigate('/user/preview', { state: { id: id } });
    };

    useEffect(() => {
        const adminItems = JSON.parse(localStorage.getItem('admin'));
        let userId;
        if (adminItems) {
            // userId = userItems._id;
            setUserType('admin');
            setUser_id(adminItems._id);
            return;
        }
        const userItems = JSON.parse(localStorage.getItem('user'));
        if (userItems) {
            // userId = adminItems._id;
            setUserType('user');
            setUser_id(userItems._id);
        }
    }, [page]);

    useEffect(() => {
        allnotify(user_id);
    }, [user_id, page]);

    const theme = createTheme({
        palette: {
            secondary: {
                main: '#e6007c'
            }
        }
    });
    // const marginRightZero = {
    //     marginRight: '0'
    // };

    // const handleChange1 = (event) => {
    //     setChecked([event.target.checked, event.target.checked]);
    // };

    // Modal styling Start
    const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 560,
        '@media (max-width:600px)': {
            width: '400px'
        },
        '@media (max-width:485px)': {
            width: '300px'
        },
        height: 230,
        bgcolor: '#ffffff',
        boxShadow: 24,
        padding: '25px 25px',
        borderRadius: '20px'
    };
    const ModalText = {
        color: ' #000000',
        fontSize: '26px',
        paddingTop: '30px',
        textAlign: 'center',
        fontWeight: '500',
        '@media (max-width:600px)': {
            textAlign: 'center',
            fontSize: '20px'
        },
        fontFamily: 'poppins'
    };
    const ModalAcceptBtn = {
        width: '170px',
        '@media (max-width:600px)': {
            width: '140px'
        },
        height: 47,
        bgcolor: '#e6007c',
        '&:hover': {
            bgcolor: '#e6007c',
            color: '#ffffff'
        },

        hoverColor: 'red',
        fontFamily: 'poppins',
        fontWeight: '600',
        color: '#ffffff',
        borderRadius: '8px'
    };
    const ModalRejectBtn = {
        width: '170px',
        '@media (max-width:600px)': {
            width: '140px'
        },
        height: 47,
        bgcolor: '#ffffff',
        border: '1px solid #E6007C',
        hoverColor: 'red',
        fontFamily: 'poppins',
        fontWeight: '600',
        color: '#E6007C',
        borderRadius: '8px',
        marginLeft: '20px'
    };

    return (
        <ThemeProvider theme={theme}>
            <Box className={styles.mainNotify} sx={{ width: '100%' }}>
                {delAlert ? (
                    <Box className={`${styles.alert} ${styles.show}`}>
                        <Typography variant="h1">Notification Deletion</Typography>
                        <Typography variant="h2">{delAlertMessage}</Typography>
                    </Box>
                ) : (
                    <Box className={`${styles.alert} ${styles.hide}`}>
                        <Typography variant="h1">Notification Deletion</Typography>
                        <Typography variant="h2">{delAlertMessage}</Typography>
                    </Box>
                )}
                <Box sx={{ pl: 2, pt: 3 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: { xs: 'column', sm: 'row' }
                        }}
                    >
                        <Typography variant="h2">Notifications</Typography>
                        <Box sx={{ display: 'flex', mr: 3, pt: { xs: 2, sm: 0 } }} className={styles.notfiyBtn}>
                            <Button onClick={handleOpen1} className={styles.clear}>
                                Delete All
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ pt: 2, width: '98%' }}>
                        {loading ? (
                            <Box className={styles.bars}>
                                <ThreeDots color="#E6007C" width={50} height={50} />
                            </Box>
                        ) : (
                            <Box className={styles.AllNotify} value={value} index={0}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th width="25%">
                                                <div style={{ display: 'flex', justifyCOntent: 'flex-start', marginLeft: '12px' }}>
                                                    {/* <FormControlLabel
                                                        sx={marginRightZero}
                                                        control={
                                                            <Checkbox
                                                                checked={checked[0] && checked[1]}
                                                                // indeterminate={checked[0] !== checked[1]}
                                                                onChange={handleChange1}
                                                                icon={<img src={Checkbase} alt="" />}
                                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                                            />
                                                        }
                                                    /> */}
                                                    <p style={{ paddingLeft: '10px' }}>Name</p>
                                                </div>
                                            </th>
                                            <th width="36%"></th>
                                            <th width="15%">
                                                <p>Time</p>
                                            </th>
                                            <th width="14%">
                                                <p>Preview</p>
                                            </th>
                                            <th width="10%">
                                                <p>Remove</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    {notifications && notifications.length === 0 ? (
                                        <Box className={styles.noDataFound}>
                                            <Typography variant="h4">No Notification found !</Typography>
                                        </Box>
                                    ) : (
                                        notifications.map((post) => (
                                            <tbody>
                                                <tr>
                                                    <td maxWidth="100%" style={{ display: 'flex', alignItems: 'center' }}>
                                                        {/* {children} */}
                                                        <div className={styles.tableImg}>
                                                            <img src={post.profileImage} alt="user" />
                                                        </div>
                                                        <div className={styles.scrollerName}>
                                                            <p style={{ paddingLeft: '7px' }}>{post.username}</p>
                                                        </div>
                                                    </td>
                                                    <td width="36%">
                                                        <div className={styles.scroller}>
                                                            <p>{post.message}</p>
                                                        </div>
                                                    </td>
                                                    <td width="15%">
                                                        <p style={{ paddingTop: '3px' }}>{moment(post.read_at).fromNow()}</p>
                                                    </td>
                                                    <td width="14%">
                                                        <AiOutlineEye
                                                            onClick={() => goToPreview(post?.receipt?._id)}
                                                            style={{
                                                                fontSize: '18px',
                                                                marginLeft: '18px',
                                                                color: '#667085',
                                                                cursor: 'pointer',
                                                                marginTop: '10px'
                                                            }}
                                                        />
                                                    </td>
                                                    <td width="10%">
                                                        <Box
                                                            style={{ marginLeft: '18px', cursor: 'pointer', marginTop: '7px' }}
                                                            onClick={() => DeleteNotification(post?.notificationId)}
                                                        >
                                                            <img src={Del} alt="" />
                                                        </Box>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))
                                    )}
                                </table>
                                <Box className={styles.pagination}>
                                    <Pagination
                                        count={pageCount}
                                        shape="rounded"
                                        hideNextButton={true}
                                        color="secondary"
                                        hidePrevButton={true}
                                        defaultPage={page}
                                        onChange={(event, value) => setPage(value)}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
                <Modal open={open2} onClose={handleClose2} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style2}>
                        <Box
                            onClick={handleClose2}
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '15px',
                                width: '26px',
                                height: '26px',
                                cursor: 'pointer'
                            }}
                        >
                            <img style={{ maxWidth: '100%', height: 'auto' }} src={Close} alt="close icon" />
                        </Box>
                        <Box>
                            <Typography sx={ModalText} id="modal-modal-title" variant="h6" component="h2">
                                Do you want to delete notifications?
                            </Typography>
                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                <Button onClick={() => DeleteAllNotifications(user_id)} sx={ModalAcceptBtn}>
                                    Yes
                                </Button>
                                <Button onClick={handleClose2} sx={ModalRejectBtn}>
                                    No
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </ThemeProvider>
    );
}
