import { React, useState, useEffect } from 'react';
import { Box, Typography } from '../../../../node_modules/@mui/material/index';
import LogOut from '../../../assets/images/logOut.svg';
import styles from '../UserSidebar/styles.module.scss';
import { NavLink } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { FiFileText } from 'react-icons/fi';
import { FiSidebar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const UserSideBar = () => {
    const navigate = useNavigate();
    const [logo, setLogo] = useState();

    useEffect(() => {
        async function fetchlogo() {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/getData/63a5b462a0334aa84088bd41`);
            response = await response.json();
            setLogo(response.data.doc.logo);
        }
        fetchlogo();
    }, []);
    const logOut = () => {
        localStorage.removeItem('admin');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <Box className={styles.sidebar}>
            <NavLink to="/user">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 3 }}>
                    {logo ? (
                        <img loading="lazy" style={{ width: '90px', height: '60px', objectFit: 'contain' }} src={logo} alt="logo" />
                    ) : (
                        <></>
                    )}
                </Box>
            </NavLink>
            <Box className={styles.sideBarNavigation} sx={{ mt: 5, pl: 1 }}>
                <NavLink to="/user" end>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FiSidebar className={styles.sidebarIcons} />
                        <Typography variant="h2">Dashboard</Typography>
                    </Box>
                </NavLink>
                <NavLink to="/user/createReciept">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FiFileText className={styles.sidebarIcons} />
                        <Typography sx={{ ml: 0.5 }} variant="h2">
                            Create Receipt
                        </Typography>
                    </Box>
                </NavLink>
                <NavLink to="/user/profile">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FiUser className={styles.sidebarIcons} />
                        <Typography variant="h2">Profile</Typography>
                    </Box>
                </NavLink>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box className={styles.LogOut} onClick={logOut}>
                    <img loading="lazy" src={LogOut} alt="logOUT" />
                    <Typography variant="h3">Log Out</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default UserSideBar;
