// material-ui
import { useMediaQuery, Box, Container, Link, Typography, Stack } from '@mui/material';
import styles from '../AuthFooter/styles.module.scss';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box className={styles.footer}>
            <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box>
                    <Typography
                        variant="h2"
                        sx={{ color: '#ffffff', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '400' }}
                        component={Link}
                        // href="https://material-ui.com/store/contributors/codedthemes/"
                        target="_blank"
                        underline="hover"
                    >
                        © 2022 NFT.com
                    </Typography>
                    <Typography
                        className={styles.terms}
                        variant="h2"
                        sx={{ color: '#ffffff', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '400', pl: 2 }}
                        component={Link}
                        // href="https://codedthemes.com"
                        target="_blank"
                        underline="hover"
                    >
                        Terms & Conditions
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default AuthFooter;
