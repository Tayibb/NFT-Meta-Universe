import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../../node_modules/axios/index';
import { Box, Button, Typography, Modal } from '../../../node_modules/@mui/material/index';
import backArrow from '../../assets/images/backArrow.svg';
import { AiFillCloseCircle } from 'react-icons/ai';
import { ThreeDots } from '../../../node_modules/react-loader-spinner/dist/index';
import styles from '../AdminPreview/styles.module.scss';
const Preview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state;
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [receipt, setReceipt] = useState([]);
    const loadReceiptData = async () => {
        setLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/receipt/getSingleReceipt/${id}`);
        if (res.status === 200) {
            setLoading(false);
            setReceipt(res.data.data.doc);
        }
    };
    const callAcceptReceiptApi = async () => {
        setLoading(true);
        const items = JSON.parse(localStorage.getItem('admin'));
        console.log(items, 'ddkk');
        let status = {
            status: 'accept',
            admin_id: items._id
        };
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/receipt/updateStatus/${id}`, status);
        if (res.status === 200) {
            setLoading(false);
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 5000);
            loadReceiptData();
        }
    };
    const callRejectReceiptApi = async () => {
        setLoading(true);
        const items = JSON.parse(localStorage.getItem('admin'));
        let status = {
            status: 'reject',
            admin_id: items._id
        };
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/receipt/updateStatus/${id}`, status);
        if (res.status === 200) {
            setLoading(false);
            setErrorAlert(true);
            setTimeout(() => {
                setErrorAlert(false);
            }, 5000);
            loadReceiptData();
        }
    };
    useEffect(() => {
        loadReceiptData();
    }, []);
    const goBack = () => {
        navigate(-1);
    };
    const style3 = {
        width: '70%',
        '@media (max-width:600px)': {
            width: '400px'
        },
        '@media (max-width:485px)': {
            width: '300px'
        },
        backdropFilter: 'blur(10px)',
        boxShadow: 24,
        border: 'none',
        borderRadius: '20px'
    };
    const center2 = {
        maxWidth: '1920px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        overflow: 'auto'
    };
    const handleOpen3 = () => setOpen3(true);
    const handleClose = () => {
        setOpen3(false);
    };
    return (
        <Box className={styles.preview}>
            {alert ? (
                <Box className={`${styles.alert} ${styles.show}`}>
                    <Typography variant="h1">Accepted</Typography>
                    <Typography variant="h2">Your Receipt Accepted Successfully! </Typography>
                </Box>
            ) : (
                <Box className={`${styles.alert} ${styles.hide}`}>
                    <Typography variant="h1">Accepted</Typography>
                    <Typography variant="h2">Your Receipt Accepted Successfully! </Typography>
                </Box>
            )}
            {errorAlert ? (
                <Box className={`${styles.errorAlert} ${styles.show}`}>
                    <Typography variant="h1">Rejected</Typography>
                    <Typography variant="h2">Your Receipt Rejected Successfully!</Typography>
                </Box>
            ) : (
                <Box className={`${styles.errorAlert} ${styles.hide}`}>
                    <Typography variant="h1">Rejected</Typography>
                    <Typography variant="h2">Your Receipt Rejected Successfully!</Typography>
                </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 2.3, pt: 2.5 }}>
                <Box sx={{ pt: 0.7 }}>
                    <Box onClick={goBack}>
                        <img src={backArrow} alt="backArrowAvatar" />
                    </Box>
                </Box>
                <Typography variant="h2">Preview Receipt</Typography>
            </Box>
            <Box className={styles.reciept} sx={{ pl: 2.3, pt: 2.5, pb: { xs: 4, md: 2 } }}>
                {loading ? (
                    <Box className={styles.bars}>
                        <ThreeDots color="#E6007C" width={50} height={50} />
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                        <Box
                            onClick={handleOpen3}
                            sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, pt: { xs: 3, md: 0 } }}
                        >
                            <img style={{ width: '290px', maxHeight: '300px', objectFit: 'contain' }} src={receipt?.receipt} alt="" />
                        </Box>
                        <Box className={styles.recieptContent} sx={{ pl: { xs: 0.5, md: 3 }, pt: { xs: 5, md: 0 } }}>
                            <Typography variant="h3">Receipt drop causes glitch in The Matrix, FTX.US adds Ethereum Receipts</Typography>
                            <Typography variant="h4">
                                Earlier this month, the film studio announced it would be dropping 100,000 unique Matrix-inspired avatar
                                NFTs for $50 each as part of a promotional campaign for the new Matrix Resurrections film set to hit cinemas
                                in the U.S. on Dec. 22.
                            </Typography>
                            {receipt?.status === 'pending' ? (
                                <Box sx={{ display: 'flex', mt: { xs: 6, md: 5, lg: 7 } }} className={styles.recieptBtn}>
                                    <Button onClick={callAcceptReceiptApi} className={styles.recieptAccept}>
                                        Accept
                                    </Button>
                                    <Button onClick={callRejectReceiptApi} className={styles.recieptReject}>
                                        Reject
                                    </Button>
                                </Box>
                            ) : receipt?.status === 'accept' ? (
                                <Box sx={{ display: 'flex', mt: { xs: 6, md: 5, lg: 7 } }} className={styles.recieptBtn}>
                                    <Button className={styles.recieptAccepted}>Accepted</Button>
                                    <Button onClick={callRejectReceiptApi} className={styles.recieptReject}>
                                        Reject
                                    </Button>
                                </Box>
                            ) : (
                                <Box sx={{ display: 'flex', mt: { xs: 6, md: 5, lg: 7 } }} className={styles.recieptBtn}>
                                    <Button onClick={callAcceptReceiptApi} className={styles.recieptAccept}>
                                        Accept
                                    </Button>
                                    <Button className={styles.recieptRejected}>Rejected</Button>
                                </Box>
                            )}
                        </Box>
                    </Box>
                )}
            </Box>
            <Modal
                sx={center2}
                open={open3}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style3}>
                    <AiFillCloseCircle
                        onClick={handleClose}
                        style={{
                            color: '#f5f5f5',
                            fontSize: '26px',
                            margin: '12px 0 0 12px',
                            zIndex: '1000',
                            cursor: 'pointer'
                        }}
                    />
                    <Box className={styles.receiptModal} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img loading="lazy" src={receipt?.receipt} alt="receipt_avatar" />
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default Preview;
