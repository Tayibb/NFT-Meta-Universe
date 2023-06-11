import { React, useState, useEffect } from 'react';
import { lazy } from 'react';
import Loadable from 'components/third-party/Loadable';
const Home = Loadable(lazy(() => import('./Home/Home')));
import { Box, Grid } from '../../../node_modules/@mui/material/index';
const DashHeader = Loadable(lazy(() => import('./DashHeader/DashHeader')));
const SideBar = Loadable(lazy(() => import('./SideBar/SideBar')));
import styles from '../Admin/styles.module.scss';
const Profile = Loadable(lazy(() => import('pages/Profile/Profile')));
const Setting = Loadable(lazy(() => import('pages/Settings/Setting')));
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Preview from 'pages/AdminPreview/AdminPreview';
import MobileNavLeft from 'components/MobileNavLeft/MobileNavLeft';
import MobileNavRight from 'components/MobileNavRIght/MobileNavRight';
import HomeContainer from 'containers/HomeContainer';
import HeaderContainer from 'containers/HeaderContainer';
import SettingLogoContainer from 'containers/SettingLogoContainer';
const LogoContainer = Loadable(lazy(() => import('../../containers/LogoContainer')));
import AdminLeftNav from 'containers/AdminLeftNav';
import AdminRightNav from 'containers/AdminRightNav';
import Notifications from 'pages/Notifications/Notifications';

const Dashboard = () => {
    const [openLeft, setOpenLeft] = useState(false);
    const [openRight, setOpenRight] = useState(false);

    return (
        <Box>
            <AdminLeftNav openLeft={openLeft} setOpenLeft={setOpenLeft} />
            <AdminRightNav openRight={openRight} setOpenRight={setOpenRight} />
            <Box className={styles.container}>
                <Box className={styles.mainDashboard}>
                    <Grid sx={{ minHeight: '100vh' }} spacing={0.6} container>
                        <Grid
                            sx={{ backgroundColor: '#ffffff', display: { xs: 'none', sm: 'block' } }}
                            item
                            xs={0}
                            sm={3}
                            md={2.5}
                            lg={1.9}
                        >
                            <LogoContainer setOpenLeft={setOpenLeft} setOpenRight={setOpenRight} />
                        </Grid>
                        <Grid sx={{ backgroundColor: '#f5f5f5' }} item xs={12} sm={9} md={9.5} lg={10.1}>
                            <HeaderContainer
                                openLeft={openLeft}
                                setOpenLeft={setOpenLeft}
                                openRight={openRight}
                                setOpenRight={setOpenRight}
                            />
                            <Routes path="/admin">
                                <Route path="/admin" element={<Home />} />
                                <Route path="/admin/profile" element={<HomeContainer />} />
                                <Route path="/admin/setting" element={<SettingLogoContainer />} />
                                <Route path="/admin/preview" element={<Preview />} />
                                <Route path="/admin/notifications" element={<Notifications />} />
                            </Routes>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
