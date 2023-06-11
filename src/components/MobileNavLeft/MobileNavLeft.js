import { React, useState, useEffect } from 'react';
import { Drawer, Box, Typography } from '../../../node_modules/@mui/material/index';
import styles from '../../components/MobileNavLeft/styles.module.scss';
import SideBarAvatar from '../../assets/images/sidebar_logo.svg';
import LogOut from '../../assets/images/logOut.svg';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';
import { FiSidebar } from 'react-icons/fi';

const MobileNavLeft = (props) => {
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
        localStorage.removeItem('user');
        navigate('/login');
    };
    return (
        <Box>
            <Drawer open={props.openLeft} aria-label="muiDrawer" anchor="left" onClose={() => props.setOpenLeft(false)}>
                <Box className={styles.drawer}>
                    <Box className={styles.sidebar}>
                        <NavLink to="/admin" onClick={() => props.setOpenLeft(false)}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 3 }}>
                                {props.data.HeaderLogo ? (
                                    <img
                                        loading="lazy"
                                        style={{ width: '90px', height: '60px', objectFit: 'contain' }}
                                        src={props.data.HeaderLogo}
                                        alt="logo"
                                    />
                                ) : logo ? (
                                    <img
                                        loading="lazy"
                                        style={{ width: '90px', height: '60px', objectFit: 'contain' }}
                                        src={logo}
                                        alt="logo"
                                    />
                                ) : (
                                    <></>
                                )}
                            </Box>
                        </NavLink>
                        <Box className={styles.sideBarNavigation} sx={{ mt: 5, pl: 1 }}>
                            <NavLink to="/admin" end onClick={() => props.setOpenLeft(false)}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FiSidebar className={styles.sidebarIcons} />
                                    <Typography variant="h2">Dashboard</Typography>
                                </Box>
                            </NavLink>
                            <NavLink to="/admin/profile" onClick={() => props.setOpenLeft(false)}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FiUser className={styles.sidebarIcons} />
                                    <Typography sx={{ ml: 0.5 }} variant="h2">
                                        Profile
                                    </Typography>
                                </Box>
                            </NavLink>
                            <NavLink to="/admin/setting" onClick={() => props.setOpenLeft(false)}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FiSettings className={styles.sidebarIcons} />
                                    <Typography variant="h2">Settings</Typography>
                                </Box>
                            </NavLink>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }} onClick={logOut}>
                            <Box className={styles.LogOut}>
                                <img loading="lazy" src={LogOut} alt="logOUT" />
                                <Typography variant="h3">Log Out</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default MobileNavLeft;
