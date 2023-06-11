import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../Home/styles.module.scss';
import Del from '../../../assets/images/Del.svg';
import { ThreeDots } from '../../../../node_modules/react-loader-spinner/dist/index';
import { AiOutlineEye } from 'react-icons/ai';
import Box from '@mui/material/Box';
import HeaderUser from '../../../assets/images/header_user.svg';
import axios from '../../../../node_modules/axios/index';
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

export default function Home() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [reject, setReject] = useState([]);
    const [accept, setAccept] = useState([]);
    const [delAlert, setDelAlert] = useState(false);
    const [allloading, setAllLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [rejectPage, setRejectPage] = useState(1);
    const [rejectPageCount, setRejectPageCount] = useState(0);
    const [acceptPage, setAcceptPage] = useState(1);
    const [acceptPageCount, setAcceptPageCount] = useState(0);

    const loadAllPosts = async () => {
        setAllLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/receipt/getAllReceipt?page=${page}`);
        if (res.status === 200) {
            setAllLoading(false);
            setPosts(res.data.data.data);
            setPageCount(res.data.data.count);
        }
    };
    const loadAcceptPosts = async () => {
        setAllLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/receipt/getReceiptStatus/accept?page=${acceptPage}`);
        if (res.status === 200) {
            setAllLoading(false);
            setAccept(res.data.data.doc);
            setAcceptPageCount(res.data.data.pageCount);
        }
    };
    const loadRejectPosts = async () => {
        setAllLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/receipt/getReceiptStatus/reject?page=${rejectPage}`);
        if (res.status === 200) {
            setAllLoading(false);
            setReject(res.data.data.doc);
            setRejectPageCount(res.data.data.pageCount);
        }
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const callDelete1Api = async (id) => {
        setLoading2(true);
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/receipt/deleteReceipt/${id}`);
        if (res.status === 200) {
            setLoading2(false);
            loadAllPosts();
            loadAcceptPosts();
            loadRejectPosts();
            setDelAlert(true);
            setTimeout(() => {
                setDelAlert(false);
            }, 5000);
        }
    };
    const callDelete2Api = async (id) => {
        setLoading3(true);
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/receipt/deleteReceipt/${id}`);
        if (res.status === 200) {
            setLoading3(false);
            loadAllPosts();
            loadAcceptPosts();
            loadRejectPosts();
            setDelAlert(true);
            setTimeout(() => {
                setDelAlert(false);
            }, 5000);
        }
    };
    const theme = createTheme({
        palette: {
            primary: {
                main: '#e6007c'
            }
        }
    });
    const goToPreview = (id) => {
        navigate('/admin/preview', { state: { id: id } });
    };
    useEffect(() => {
        loadAllPosts();
    }, [page]);
    useEffect(() => {
        loadAcceptPosts();
        setLoading3(false);
    }, [acceptPage, loading3]);
    useEffect(() => {
        loadRejectPosts();
        setLoading2(false);
    }, [rejectPage, loading2]);
    return (
        <ThemeProvider theme={theme}>
            <Box className={styles.mainHome} sx={{ width: '100%' }}>
                {delAlert ? (
                    <Box className={`${styles.alert} ${styles.show}`}>
                        <Typography variant="h1">Deleted</Typography>
                        <Typography variant="h2">Your Receipt Deleted Successfully! </Typography>
                    </Box>
                ) : (
                    <Box className={`${styles.alert} ${styles.hide}`}>
                        <Typography variant="h1">Deleted</Typography>
                        <Typography variant="h2">Your Receipt Deleted Successfully! </Typography>
                    </Box>
                )}
                <Box sx={{ pl: { xs: 2, sm: 1.6 }, pt: 3, mr: 2 }}>
                    <Typography variant="h2">All Receipts</Typography>
                    {allloading ? (
                        <Box className={styles.bars}>
                            <ThreeDots color="#E6007C" width={50} height={50} />
                        </Box>
                    ) : (
                        <Box sx={{ pt: 2 }}>
                            <Box sx={{ borderColor: 'divider' }}>
                                <Tabs
                                    className={styles.tabheader}
                                    sx={{ pl: 2 }}
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    TabIndicatorProps={{ style: { backgroundColor: '#1F5BE2', height: '1px' } }}
                                >
                                    <Tab sx={{ p: 0 }} label="All Receipts" {...a11yProps(0)} />
                                    <Tab sx={{ ml: 5, p: 0 }} label="Accepted Receipts" {...a11yProps(1)} />
                                    <Tab sx={{ ml: 5, p: 0 }} label="Rejected Receipts" {...a11yProps(2)} />
                                </Tabs>
                            </Box>

                            <Box>
                                <TabPanel className={styles.AllRecipt} value={value} index={0}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th width="27%">
                                                    <p style={{ paddingLeft: '30px' }}>Name</p>
                                                </th>
                                                <th width="23%">
                                                    <p>Email address</p>
                                                </th>
                                                <th width="21%">
                                                    <p>Reciept Name</p>
                                                </th>
                                                <th width="19%">
                                                    <p style={{ paddingLeft: '20px' }}>Status</p>
                                                </th>
                                                <th width="10%">
                                                    <p>Preview</p>
                                                </th>
                                            </tr>
                                        </thead>
                                        {posts && posts.length === 0 ? (
                                            <Box className={styles.noDataFound}>
                                                <Typography variant="h4">No Receipt!</Typography>
                                            </Box>
                                        ) : (
                                            posts.map((post) => (
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            maxWidth="100%"
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                paddingLeft: '20px'
                                                            }}
                                                        >
                                                            <div className={styles.tableImg}>
                                                                {post?.user?.profileImage ? (
                                                                    <img loading="lazy" src={post?.user?.profileImage} alt="user" />
                                                                ) : (
                                                                    <img loading="lazy" src={HeaderUser} alt="user" />
                                                                )}
                                                            </div>
                                                            <div className={styles.scrollerName}>
                                                                <p style={{ paddingLeft: '7px' }}>{post?.user?.username}</p>
                                                            </div>
                                                        </td>
                                                        <td width="23%">
                                                            <div className={styles.scroller}>
                                                                <p>{post?.user?.email}</p>
                                                            </div>
                                                        </td>
                                                        <td width="21%">
                                                            <div className={styles.scroller}>
                                                                <p>{post?.fileName}</p>
                                                            </div>
                                                        </td>
                                                        <td width="19%">
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                {post?.status === 'accept' ? (
                                                                    <button
                                                                        style={{ marginLeft: '15px' }}
                                                                        className={styles.tableAccept_First}
                                                                    >
                                                                        Accepted
                                                                    </button>
                                                                ) : post?.status === 'reject' ? (
                                                                    <button style={{ marginLeft: '15px' }} className={styles.tableReject}>
                                                                        Rejected
                                                                    </button>
                                                                ) : (
                                                                    <button style={{ marginLeft: '15px' }} className={styles.tablePending}>
                                                                        Pending
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td width="10%">
                                                            <AiOutlineEye
                                                                onClick={() => goToPreview(post?._id)}
                                                                style={{
                                                                    fontSize: '18px',
                                                                    marginLeft: '18px',
                                                                    color: '#667085',
                                                                    marginTop: '8px',
                                                                    cursor: 'pointer'
                                                                }}
                                                            />
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
                                            color="primary"
                                            hidePrevButton={true}
                                            defaultPage={page}
                                            onChange={(event, value) => setPage(value)}
                                        />
                                    </Box>
                                </TabPanel>
                                {loading2 ? (
                                    <Box className={styles.bars}>
                                        <ThreeDots color="#E6007C" width={50} height={50} />
                                    </Box>
                                ) : (
                                    <TabPanel className={styles.AllRecipt} value={value} index={1}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th width="27%">
                                                        <p style={{ paddingLeft: '30px' }}>Name</p>
                                                    </th>
                                                    <th width="23%">
                                                        <p>Email address</p>
                                                    </th>
                                                    <th width="21%">
                                                        <p>Reciept Name</p>
                                                    </th>
                                                    <th width="19%">
                                                        <p style={{ paddingLeft: '23px' }}>Send</p>
                                                    </th>
                                                    <th width="10%">
                                                        <p>Action</p>
                                                    </th>
                                                </tr>
                                            </thead>
                                            {accept && accept.length === 0 ? (
                                                <Box className={styles.noDataFound}>
                                                    <Typography variant="h4">No Accepted Receipt!</Typography>
                                                </Box>
                                            ) : (
                                                accept.map((post) => (
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                maxWidth="100%"
                                                                style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px' }}
                                                            >
                                                                <div className={styles.tableImg}>
                                                                    {post?.user?.profileImage ? (
                                                                        <img loading="lazy" src={post?.user?.profileImage} alt="user" />
                                                                    ) : (
                                                                        <img loading="lazy" src={HeaderUser} alt="user" />
                                                                    )}
                                                                </div>
                                                                <div className={styles.scrollerName}>
                                                                    <p style={{ paddingLeft: '7px' }}>{post?.user?.username}</p>
                                                                </div>
                                                            </td>
                                                            <td width="23%">
                                                                <div className={styles.scroller}>
                                                                    <p>{post?.user?.email}</p>
                                                                </div>
                                                            </td>
                                                            <td width="21%">
                                                                <div className={styles.scroller}>
                                                                    <p>{post?.fileName}</p>
                                                                </div>
                                                            </td>
                                                            <td width="19%">
                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <button className={styles.sendNft}>send Nft</button>
                                                                </div>
                                                            </td>
                                                            <td width="10%">
                                                                <Box
                                                                    style={{ marginLeft: '18px' }}
                                                                    onClick={() => callDelete1Api(post?._id)}
                                                                >
                                                                    <img
                                                                        loading="lazy"
                                                                        style={{ marginTop: '8px' }}
                                                                        src={Del}
                                                                        alt="delete_icon"
                                                                    />
                                                                </Box>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                ))
                                            )}
                                        </table>
                                        <Box className={styles.pagination}>
                                            <Pagination
                                                count={acceptPageCount}
                                                shape="rounded"
                                                hideNextButton={true}
                                                color="primary"
                                                hidePrevButton={true}
                                                defaultPage={acceptPage}
                                                onChange={(event, value) => setAcceptPage(value)}
                                            />
                                        </Box>
                                    </TabPanel>
                                )}
                                {loading3 ? (
                                    <Box className={styles.bars}>
                                        <ThreeDots color="#E6007C" width={50} height={50} />
                                    </Box>
                                ) : (
                                    <TabPanel className={styles.AllRecipt} value={value} index={2}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th width="27%">
                                                        <p style={{ paddingLeft: '30px' }}>Name</p>
                                                    </th>
                                                    <th width="23%">
                                                        <p>Email address</p>
                                                    </th>
                                                    <th width="21%">
                                                        <p>Reciept Name</p>
                                                    </th>
                                                    <th width="19%">
                                                        <p style={{ paddingLeft: '23px' }}>Status</p>
                                                    </th>
                                                    <th width="10%">
                                                        <p>Action</p>
                                                    </th>
                                                </tr>
                                            </thead>
                                            {reject && reject.length === 0 ? (
                                                <Box className={styles.noDataFound}>
                                                    <Typography variant="h4">No Rejected Receipt!</Typography>
                                                </Box>
                                            ) : (
                                                reject.map((post) => (
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                maxWidth="100%"
                                                                style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px' }}
                                                            >
                                                                <div className={styles.tableImg}>
                                                                    {post?.user?.profileImage ? (
                                                                        <img loading="lazy" src={post?.user?.profileImage} alt="user" />
                                                                    ) : (
                                                                        <img loading="lazy" src={HeaderUser} alt="user" />
                                                                    )}
                                                                </div>
                                                                <div className={styles.scrollerName}>
                                                                    <p style={{ paddingLeft: '7px' }}>{post?.user?.username}</p>
                                                                </div>
                                                            </td>
                                                            <td width="23%">
                                                                <div className={styles.scroller}>
                                                                    <p>{post?.user?.email}</p>
                                                                </div>
                                                            </td>
                                                            <td width="21%">
                                                                <div className={styles.scroller}>
                                                                    <p>{post?.fileName}</p>
                                                                </div>
                                                            </td>
                                                            <td width="19%">
                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <button
                                                                        style={{ marginLeft: '15px' }}
                                                                        // onClick={handleRejectOpen}
                                                                        className={styles.tableRejected}
                                                                    >
                                                                        Reject
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td width="10%">
                                                                <div style={{ marginLeft: '18px' }}>
                                                                    <Box onClick={() => callDelete2Api(post?._id)}>
                                                                        <img
                                                                            loading="lazy"
                                                                            style={{ marginTop: '8px' }}
                                                                            src={Del}
                                                                            alt="delete_icon"
                                                                        />
                                                                    </Box>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                ))
                                            )}
                                        </table>
                                        <Box className={styles.pagination}>
                                            <Pagination
                                                count={rejectPageCount}
                                                shape="rounded"
                                                hideNextButton={true}
                                                color="primary"
                                                hidePrevButton={true}
                                                defaultPage={rejectPage}
                                                onChange={(event, value) => setRejectPage(value)}
                                            />
                                        </Box>
                                    </TabPanel>
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
