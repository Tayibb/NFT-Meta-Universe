import * as React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../UserHome/styles.module.scss';
import { ThreeDots } from '../../../../node_modules/react-loader-spinner/dist/index';
import { AiOutlineEye } from 'react-icons/ai';
import Box from '@mui/material/Box';
import HeaderUser from '../../../assets/images/header_user.svg';
import axios from '../../../../node_modules/axios/index';
import { useNavigate } from 'react-router-dom';

export default function UserHome() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [posts, setPosts] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getAllReceipt = async (id) => {
        setLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/receipt/getAllReceiptOfSingleUser/${id}?page=${page}`);
        if (res.status === 200) {
            setLoading(false);
            setPosts(res.data.data.data);
            setPageCount(res.data.data.count);
        }
    };
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            getAllReceipt(items._id);
        }
    }, [page]);
    const theme = createTheme({
        palette: {
            primary: {
                main: '#e6007c'
            }
        }
    });
    const goToPreview = (id) => {
        navigate('/user/preview', { state: { id: id } });
    };
    return (
        <ThemeProvider theme={theme}>
            <Box className={styles.mainHome} sx={{ width: '100%' }}>
                <Box sx={{ pl: { xs: 2, sm: 1.6 }, pt: 3, mr: 2 }}>
                    <Typography variant="h2">List of Receipts</Typography>
                    <Box sx={{ pt: 2 }}>
                        {loading ? (
                            <Box className={styles.bars}>
                                <ThreeDots color="#E6007C" width={50} height={50} />
                            </Box>
                        ) : (
                            <Box className={styles.AllRecipt} value={value} index={0}>
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
                                                <p style={{ paddingLeft: '27px' }}>Status</p>
                                            </th>
                                            <th width="10%">
                                                <p>Preview</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    {posts && posts.length === 0 ? (
                                        <Box className={styles.noDataFound}>
                                            <Typography variant="h4">No Receipt found!</Typography>
                                        </Box>
                                    ) : (
                                        posts.map((post) => (
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
                                                            {post?.status === 'accept' ? (
                                                                <button style={{ marginLeft: '22px' }} className={styles.tableAccept_First}>
                                                                    Accepted
                                                                </button>
                                                            ) : post?.status === 'reject' ? (
                                                                <button style={{ marginLeft: '22px' }} className={styles.tableReject}>
                                                                    Rejected
                                                                </button>
                                                            ) : (
                                                                <button style={{ marginLeft: '22px' }} className={styles.tablePending}>
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
                                                                marginTop: '5px',
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
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
