import { React, useState, useEffect } from 'react';
import { Box } from '../../../node_modules/@mui/material/index';
import styles from '../RedditSocialLogin/styles.module.scss';
import { ThreeDots } from '../../../node_modules/react-loader-spinner/dist/index';
import { Flex, CircularProgress } from '@chakra-ui/react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function LoginWithReddit({ location }) {
    const [loading, setLoading] = useState(true);
    let { search } = useLocation();
    const navigate = useNavigate();
    const redditLogin = async () => {
        const res = JSON.parse(localStorage.getItem('user'));
        console.log('resfunc', res);
        const email = `${res.data.userData.name}@gmail.com`;
        let checkUser = axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/getSocialAppUserData/${email}`)
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
                            socialLogin: 'User is Login with Reddit',
                            token: res.data.data.token,
                            profileImage: res.data.data.doc.profileImage
                        })
                    );
                    if (res.data.data.doc.role === 'admin') {
                        setLoading(false);
                        navigate('/admin');
                    } else {
                        res.data.data.doc.role === 'user';
                        {
                            setLoading(false);
                            navigate('/user');
                        }
                    }
                }
            })
            .catch(async (e) => {
                if (e.response.data === 'User Not found.') {
                    const givenValues = {
                        username: res.data.userData.name,
                        email: email,
                        profileImage: res.data.userData.snoovatar_img
                    };
                    console.log('givenValues', givenValues);
                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/register`, givenValues).then((res) => {
                        console.log('res', res);
                        if (res.status === 200 || res.status === 201) {
                            localStorage.setItem(
                                'user',
                                JSON.stringify({
                                    _id: res.data.data.user._id,
                                    username: res.data.data.user.username,
                                    email: res.data.data.user.email,
                                    role: res.data.data.user.role,
                                    socialLogin: 'User is Login with Reddit',
                                    token: res.data.token,
                                    profileImage: res.data.data.user.profileImage
                                })
                            );
                            setLoading(false);
                            navigate('/user');
                        }
                    });
                }
            });
    };
    useEffect(() => {
        const query = new URLSearchParams(search);
        const code = query.get('code');
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/login_reddit?code=${query.get('code')}`, code).then((res) => {
            console.log('myres', res);
            if (res.data.redditUser === 200) {
                console.log('useffect', res);
                localStorage.setItem('user', JSON.stringify(res));
                setTimeout(() => {
                    redditLogin();
                }, 2500);
            }
        });
    }, []);
    return loading ? (
        <Box className={styles.bars}>
            <ThreeDots color="#E6007C" width={50} height={50} />
        </Box>
    ) : (
        navigate('/login')
    );
}
export default LoginWithReddit;
