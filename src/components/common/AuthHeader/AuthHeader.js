import { React, useState, useEffect } from 'react';
import { Box, Container } from '../../../../node_modules/@mui/material/index';
import { NavLink } from 'react-router-dom';
import styles from '../AuthHeader/styles.module.scss';

const AuthHeader = () => {
    const [logo, setLogo] = useState();
    useEffect(() => {
        async function fetchlogo() {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/getData/63a5b462a0334aa84088bd41`);
            response = await response.json();
            setLogo(response.data.doc.logo);
        }
        fetchlogo();
    }, []);
    return (
        <Box className={styles.header}>
            <Container>
                <Box className={styles.headerContent} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {logo ? (
                            <img loading="lazy" style={{ width: '90px', height: '60px', objectFit: 'contain' }} src={logo} alt="logo" />
                        ) : (
                            <></>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <NavLink to="/login" className={styles.HeaderLogIn}>
                            Log In
                        </NavLink>
                        <NavLink to="/register" className={styles.HeaderSignUp}>
                            Sign up
                        </NavLink>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default AuthHeader;
