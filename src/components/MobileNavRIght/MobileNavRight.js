import { React, useState, useEffect } from 'react';
import { Drawer, Box, Typography } from '../../../node_modules/@mui/material/index';
import HeaderUser from '../../assets/images/header_user.svg';
import styles from '../../components/MobileNavRIght/styles.module.scss';
import Round from '../../assets/images/round3.jpg';
import { NavLink } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';

const MobileNavRight = (props) => {
    const [pic, setPic] = useState();
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('admin'));
        if (items) {
            setPic(items.profileImage);
        }
    }, []);
    return (
        <Box>
            <Drawer
                sx={{
                    display: { xs: 'block', sm: 'none' }
                }}
                open={props.openRight}
                aria-label="muiDrawer"
                anchor="right"
                onClose={() => props.setOpenRight(false)}
            >
                <Box className={styles.drawer}>
                    <Box className={styles.sidebar}>
                        <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', pt: 4, pl: 2 }}>
                            <Box className={styles.roundWrapper}>
                                {props.data.profileImageUrl ? (
                                    <img loading="lazy" src={props.data.profileImageUrl} alt="user" />
                                ) : pic ? (
                                    <img loading="lazy" src={pic} alt="user" />
                                ) : (
                                    <img loading="lazy" src={HeaderUser} alt="user" />
                                )}
                            </Box>
                            <Typography variant="h3">Olivia Rhye</Typography>
                        </Box>
                        <Box sx={{ mt: 5, pl: 1 }}>
                            <NavLink to="/admin/profile" onClick={() => props.setOpenRight(false)}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FiUser className={styles.sidebarIcons} />
                                    <Typography variant="h2">Profile</Typography>
                                </Box>
                            </NavLink>
                            <NavLink to="/admin/setting" onClick={() => props.setOpenRight(false)}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FiSettings className={styles.sidebarIcons} />
                                    <Typography sx={{ ml: 0.5 }} variant="h2">
                                        Settings
                                    </Typography>
                                </Box>
                            </NavLink>
                            <NavLink to="/admin/login" end onClick={() => props.setOpenRight(false)}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FiLogOut className={styles.sidebarIcons} />
                                    <Typography variant="h2">LogOut</Typography>
                                </Box>
                            </NavLink>
                        </Box>
                        {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box className={styles.LogOut}>
                                <img loading="lazy" src={LogOut} alt="logOUT" />
                                <Typography variant="h3">Log Out</Typography>
                            </Box>
                        </Box> */}
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default MobileNavRight;
