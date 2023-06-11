import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../../node_modules/axios/index';
import { Box, Button, Typography, Modal } from '../../../node_modules/@mui/material/index';
import { ThreeDots } from '../../../node_modules/react-loader-spinner/dist/index';
import { AiFillCloseCircle } from 'react-icons/ai';
import backArrow from '../../assets/images/backArrow.svg';
import Close from '../../assets/images/close.svg';
import styles from '../UserPreview/styles.module.scss';
const Preview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state;
    const style1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 521,
        '@media (max-width:600px)': {
            width: '400px'
        },
        '@media (max-width:485px)': {
            width: '300px'
        },
        height: 257,
        bgcolor: '#ffffff',
        boxShadow: 24,
        padding: '25px 25px',
        borderRadius: '7.5px'
    };
    const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 498,
        '@media (max-width:600px)': {
            width: '400px'
        },
        '@media (max-width:485px)': {
            width: '300px'
        },
        height: 150,
        bgcolor: '#ffffff',
        boxShadow: 24,
        padding: '25px 25px',
        borderRadius: '20px'
    };
    const ModalAcceptBtn = {
        width: '100%',
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
    const ModalText = {
        color: ' #000000',
        fontSize: '26px',
        fontWeight: '500',
        '@media (max-width:600px)': {
            textAlign: 'center',
            fontSize: '20px'
        },
        fontFamily: 'poppins'
    };
    const center = {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
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
    const [open1, setOpen1] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [isReceipt, setIsReceipt] = useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleOpen2 = () => {
        setOpen2(true);
        setOpen1(false);
    };
    const handleOpen3 = () => setOpen3(true);
    const handleClose = () => {
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
    };

    const [receipt, setReceipt] = useState([]);
    const loadReceiptData = async () => {
        setLoading(true);
        const res = await axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/receipt/getSingleReceipt/${id}`)
            .then((res) => {
                console.log('doneRes', res);
                if (res.status === 200) {
                    setLoading(false);
                    setReceipt(res.data.data.doc);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log('err', err.response.data);
                setIsReceipt(true);
            });
    };
    useEffect(() => {
        loadReceiptData();
    }, []);
    const goBack = () => {
        navigate(-1);
    };
    return (
        <Box className={styles.preview}>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 2.3, pt: 2.5 }}>
                <Box sx={{ pt: 0.7 }}>
                    <Box onClick={goBack}>
                        <img loading="lazy" src={backArrow} alt="backArrowAvatar" />
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
                        {isReceipt ? (
                            <Box className={styles.noDataFound}>
                                <Typography variant="h4">No Receipt found!</Typography>
                            </Box>
                        ) : (
                            <>
                                <Box
                                    onClick={handleOpen3}
                                    sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, pt: { xs: 3, md: 0 } }}
                                >
                                    <img
                                        loading="lazy"
                                        style={{ width: '290px', maxHeight: '300px', objectFit: 'contain' }}
                                        src={receipt?.receipt}
                                        alt=""
                                    />
                                </Box>
                                <Box className={styles.recieptContent} sx={{ pl: { xs: 0.5, md: 3 }, pt: { xs: 5, md: 0 } }}>
                                    <Typography variant="h3">
                                        Receipt drop causes glitch in The Matrix, FTX.US adds Ethereum Receipts
                                    </Typography>
                                    <Typography variant="h5">Total NFT Received: 10</Typography>
                                    <Typography variant="h4">
                                        Earlier this month, the film studio announced it would be dropping 100,000 unique Matrix-inspired
                                        avatar NFTs for $50 each as part of a promotional campaign for the new Matrix Resurrections film set
                                        to hit cinemas in the U.S on Dec. 22.
                                    </Typography>
                                    {receipt?.status === 'reject' ? (
                                        ''
                                    ) : (
                                        <Box sx={{ display: 'flex', mt: { xs: 6, md: 5, lg: 7 } }} className={styles.recieptBtn}>
                                            <Button onClick={handleOpen1} className={styles.recieptAccept}>
                                                Transfer to your Wallet
                                            </Button>
                                        </Box>
                                    )}
                                    <Modal
                                        open={open1}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style1}>
                                            <Box
                                                onClick={handleClose}
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
                                                    Enter your Wallet address
                                                </Typography>
                                                <form>
                                                    <input className={styles.modalForm} type="text" />
                                                </form>
                                                <Box sx={{ mt: 3 }}>
                                                    <Button onClick={handleOpen2} sx={ModalAcceptBtn}>
                                                        Transfer
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Modal>
                                    <Modal
                                        open={open2}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style2}>
                                            <Box
                                                onClick={handleClose}
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
                                            <Box sx={center}>
                                                <Typography sx={ModalText} id="modal-modal-title" variant="h6" component="h2">
                                                    Your NFT has been Transfered
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Modal>
                                </Box>
                            </>
                        )}
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
