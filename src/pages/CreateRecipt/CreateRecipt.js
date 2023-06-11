import { React, useState, useEffect, useRef } from 'react';
import { Box, Typography, Button } from '../../../node_modules/@mui/material/index';
import { FiUpload } from 'react-icons/fi';
import axios from '../../../node_modules/axios/index';
import { ThreeDots } from '../../../node_modules/react-loader-spinner/dist/index';
import { ValidationRecipt } from 'schema/index';
import { useFormik } from 'formik';
import styles from '../CreateRecipt/styles.module.scss';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    walletAddress: '',
    receiptId: '',
    receipt: ''
};
const CreateRecipt = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState();
    const [email, setEmail] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [receipt, setReceipt] = useState();
    const [termAndCondition, setTermAndCondition] = useState('');
    const [fileName, setFileName] = useState(
        'The specified file nft-receipt.txt could not be uploaded.Only files are allowed: png, gif, jpg, jpeg'
    );
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setEmail(items.email);
            setUserId(items._id);
        }
        async function fetchTermAndCondition() {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/getData/63a5b462a0334aa84088bd41`);
            response = await response.json();
            console.log(response.data.termsAndCondition);
            if (response) {
                setTermAndCondition(response.data.doc.termsAndCondition);
            }
        }
        fetchTermAndCondition();
    }, []);
    const hiddenFileInput = useRef(null);
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        setReceipt(file);
        setFileName(file.name);
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: ValidationRecipt,
        onSubmit: async (values, action) => {
            let option = {
                user: userId,
                email: email,
                receipt: receipt,
                fileName: fileName,
                receiptId: values.receiptId,
                walletAddress: values.walletAddress
            };
            const formData = new FormData();
            for (var key in option) {
                formData.append(key, option[key]);
            }
            setLoading(true);
            action.resetForm();
            await axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/api/receipt/uploadReceipt`, formData)
                .then((res) => {
                    console.log(res, 'updated data');
                    if (res.status === 200 || res.status === 201) {
                        setLoading(false);
                        setAlert(true);
                        setTimeout(() => {
                            setAlert(false);
                        }, 5000);
                        navigate('/user');
                    }
                })
                .catch((e) => {
                    setLoading(false);
                    setErrorMessage('Duplicate Receipt Id');
                    setErrorAlert(true);
                    setTimeout(() => {
                        setErrorAlert(false);
                    }, 5000);
                    console.warn();
                });
        }
    });
    return (
        <Box className={styles.mainReceipt}>
            {alert ? (
                <Box className={`${styles.alert} ${styles.show}`}>
                    <Typography variant="h1">Success!</Typography>
                    <Typography variant="h2">Your Receipt Upload Successfully! </Typography>
                </Box>
            ) : (
                <Box className={`${styles.alert} ${styles.hide}`}>
                    <Typography variant="h1">Success!</Typography>
                    <Typography variant="h2">Your Receipt Upload Successfully! </Typography>
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
            {loading ? (
                <Box className={styles.bars}>
                    <ThreeDots color="#E6007C" width={50} height={50} />
                </Box>
            ) : (
                <Box sx={{ pl: { xs: 2, sm: 1.6 }, pt: 1.5, pr: 2 }}>
                    <Typography variant="h2">Create a new Receipt</Typography>
                    <Box sx={{ mt: 2, pl: 2 }} className={styles.reciept}>
                        <Box className={styles.receiptFrom}>
                            <Box>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="email">Email Address</label>
                                    <br />
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter Your Email"
                                        value={email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </form>
                                {errors.email && touched.email ? <p className={styles.passErrors}>{errors.email}</p> : null}
                            </Box>
                            <br></br>
                            <Box>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="walletAddress">Wallet Address</label>
                                    <br />
                                    <input
                                        type="walletAddress"
                                        name="walletAddress"
                                        id="walletAddress"
                                        placeholder="Enter Your Wallet Address"
                                        value={values.walletAddress}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </form>
                            </Box>
                            {errors.walletAddress && touched.walletAddress ? (
                                <p className={styles.passErrors}>{errors.walletAddress}</p>
                            ) : null}
                            <br></br>
                            <Box>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="receiptId">Receipt ID</label>
                                    <br />
                                    <input
                                        type="receiptId"
                                        name="receiptId"
                                        id="receiptId"
                                        placeholder="Enter Your Receipt Id"
                                        value={values.receiptId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </form>
                            </Box>
                            {errors.receiptId && touched.receiptId ? <p className={styles.passErrors}>{errors.receiptId}</p> : null}
                            <Box>
                                <form onSubmit={handleSubmit}>
                                    <Button className={styles.uploadBtn} onClick={handleClick}>
                                        <FiUpload />
                                        <input
                                            style={{ display: 'none' }}
                                            ref={hiddenFileInput}
                                            type="file"
                                            size="600"
                                            onChange={(e) => handleFileUpload(e)}
                                        />
                                        <span style={{ paddingLeft: '15px' }}>Upload your Receipt</span>
                                    </Button>
                                </form>
                            </Box>
                            {errors.receipt && touched.receipt ? <p className={styles.passErrors}>{errors.receipt}</p> : null}
                            <Typography variant="h3">{fileName}</Typography>
                            <Box className={styles.termAndConditions} sx={{ pt: 3 }}>
                                <Typography variant="h4">Terms & Conditions</Typography>
                                <div
                                    style={{
                                        border: '1px solid #e5e8eb',
                                        padding: '15px',
                                        maxHeight: '200px',
                                        overflow: 'auto',
                                        marginTop: '15px',
                                        borderRadius: '4px',
                                        background: '#f5f5f5'
                                    }}
                                >
                                    <label htmlFor="bio">{termAndCondition}</label>
                                </div>
                            </Box>
                            <Box sx={{ mt: 3 }}>
                                <form onSubmit={handleSubmit}>
                                    <Button type="submit" className={styles.recieptButton}>
                                        Submit
                                    </Button>
                                </form>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default CreateRecipt;
