// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import backgroundImage from './../../images/background-image.png';
// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                position: 'absolute',
                //filter: 'blur(18px)',
                zIndex: -1,
                bottom: 0
            }}
        >
            {/* <div style={{ width: '100%', height: '100%' }}>
                <img loading="lazy" style={{ width: '100%', height: '100%' }} src={backgroundImage} alt="Logo" />
            </div> */}
        </Box>
    );
};

export default AuthBackground;
