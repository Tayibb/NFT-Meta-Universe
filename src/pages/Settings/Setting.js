import { React, useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, Button } from '../../../node_modules/@mui/material/index';
import styles from '../Settings/styles.module.scss';
import axios from '../../../node_modules/axios/index';
import UploadAvatar from '../../assets/images/uploadIcon.svg';
import { ThreeDots } from '../../../node_modules/react-loader-spinner/dist/index';
import PlusIcon from '../../assets/images/CTA.svg';
import NftAvatar from '../../assets/images/nftImg.svg';
import bgNFT from '../../assets/images/bgNft.png';

const Setting = (props) => {
    const [logo, setLogo] = useState('');
    const [urlLogo, setUrlLogo] = useState();
    const [banner, setBanner] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [termsAndCondition, setTermsAndCondition] = useState('');
    const hiddenFileInput = useRef(null);

    useEffect(() => {
        async function fetchTermAndCondition() {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/getData/63a5b462a0334aa84088bd41`);
            response = await response.json();
            console.log(response.data.termsAndCondition);
            if (response) {
                setTermsAndCondition(response.data.doc.termsAndCondition);
            }
        }
        fetchTermAndCondition();
    }, []);
    useEffect(() => {
        async function fetchlogo() {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/getData/63a5b462a0334aa84088bd41`);
            response = await response.json();
            setLogo(response.data.doc.logo);
            setUrlLogo(response.data.doc.logo);
        }
        fetchlogo();
    }, []);
    console.log('termsAndCondition', termsAndCondition);
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    const handleChange = (event) => {
        setTermsAndCondition(event.target.value);
    };
    const setHeaderLogo = (urlLogo) => {
        props.setLogoHandler(urlLogo);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setUrlLogo(url);
        setLogo(file);
    };
    let option = {
        logo: logo,
        termsAndCondition: termsAndCondition
    };
    const formData = new FormData();
    for (var key in option) {
        formData.append(key, option[key]);
    }
    const uploadData = async () => {
        setLoading(true);
        await axios
            .put(`${process.env.REACT_APP_BACKEND_URL}/api/admin/updateData/63a5b462a0334aa84088bd41`, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setLoading(false);
                    setUrlLogo(res.data.data.doc.logo);
                    setAlert(true);
                    setTimeout(() => {
                        setAlert(false);
                    }, 2500);
                    setHeaderLogo(urlLogo);
                }
            })
            .catch((e) => {
                setLoading(false);
                setErrorMessage('Something went wrong');
                setErrorAlert(true);
                setTimeout(() => {
                    setErrorAlert(false);
                }, 2500);
            });
    };
    return (
        <Box className={styles.mainSetting}>
            {alert ? (
                <Box className={`${styles.alert} ${styles.show}`}>
                    <Typography variant="h1">Success!</Typography>
                    <Typography variant="h2">Settings has been updated successfully! </Typography>
                </Box>
            ) : (
                <Box className={`${styles.alert} ${styles.hide}`}>
                    <Typography variant="h1">Success!</Typography>
                    <Typography variant="h2">Settings has been updated successfully! </Typography>
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
            <Box sx={{ pl: { xs: 2, sm: 1.6 }, pt: 1.5, pr: 2 }}>
                <Typography variant="h2">Settings</Typography>
                {loading ? (
                    <Box className={styles.bars}>
                        <ThreeDots color="#E6007C" width={50} height={50} />
                    </Box>
                ) : (
                    <Box sx={{ mt: 2, pl: 2 }} className={styles.setting}>
                        <Box sx={{ pl: 1.8, pt: { xs: 4, sm: 4.5 } }}>
                            <Typography variant="h3">Upload Logo</Typography>
                            <Grid spacing={{ xs: 0, md: 6 }} container pt={2}>
                                <Grid item xs={10} md={5} lg={3.5}>
                                    <Box sx={{ mt: { xs: 1, md: 0 } }} className={styles.Upload} onClick={handleClick}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
                                            <img loading="lazy" src={UploadAvatar} alt="upload_icon" />
                                        </Box>
                                        <form>
                                            <input
                                                style={{ display: 'none' }}
                                                ref={hiddenFileInput}
                                                type="file"
                                                size="600"
                                                onChange={(e) => handleFileUpload(e)}
                                            />
                                        </form>
                                        <Typography variant="h4">Upload Logo</Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <img loading="lazy" src={PlusIcon} alt="plus_icon" />
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={10} md={5} lg={3.5}>
                                    {urlLogo ? (
                                        <Box sx={{ pt: { xs: 3, md: 0 } }}>
                                            <img loading="lazy" className={styles.NftAvatar1} src={urlLogo} alt="logo" />
                                        </Box>
                                    ) : (
                                        <Box sx={{ pt: { xs: 3, md: 0 } }}>
                                            {/* <img loading="lazy" className={styles.NftAvatar1} src={logo} alt="logo" /> */}
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ pl: 1.8, pt: 5 }}>
                            <form>
                                <label htmlFor="bio">Terms & Conditions</label>
                                <br />
                                <input style={{ display: 'none' }} type="file" size="600" />
                                <textarea
                                    name="bio"
                                    id="bio"
                                    value={termsAndCondition}
                                    placeholder="Enter Terms & Conditions"
                                    onChange={handleChange}
                                />
                            </form>
                        </Box>
                        <Box sx={{ mt: 3, ml: 1.8 }}>
                            <Button className={styles.settingBtn} onClick={uploadData}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Setting;
