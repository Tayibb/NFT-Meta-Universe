import { React, useState, useEffect } from 'react';
import { Drawer, Box, Typography } from '../../../node_modules/@mui/material/index';
import styles from '../../components/UserLeftNav/styles.module.scss';
import SideBarAvatar from '../../assets/images/sidebar_logo.svg';
import { NavLink } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { FiSidebar } from 'react-icons/fi';

const UserLeftNav = (props) => {
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
            <Drawer
                sx={{
                    display: { xs: 'block', sm: 'none' }
                }}
                open={props.openLeft}
                aria-label="muiDrawer"
                anchor="left"
                onClose={() => props.setOpenLeft(false)}
            >
                <Box className={styles.drawer}>
                    <Box className={styles.sidebar}>
                        <NavLink to="/user" onClick={() => props.setOpenLeft(false)}>
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
                            <NavLink to="/user" end onClick={() => props.setOpenLeft(false)}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FiSidebar className={styles.sidebarIcons} />
                                    <Typography variant="h2">Dashboard</Typography>
                                </Box>
                            </NavLink>
                            <NavLink to="/user/createReciept" onClick={() => props.setOpenLeft(false)}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FiUser className={styles.sidebarIcons} />
                                    <Typography variant="h2">Create Reciept</Typography>
                                </Box>
                            </NavLink>
                            <NavLink to="/login" onClick={() => props.setOpenLeft(false)}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FiLogOut className={styles.sidebarIcons} />
                                    <Typography variant="h2">LogOut</Typography>
                                </Box>
                            </NavLink>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default UserLeftNav;
