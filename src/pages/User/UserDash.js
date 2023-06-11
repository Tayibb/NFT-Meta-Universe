import { React, useState } from 'react';
import { lazy } from 'react';
import Loadable from 'components/third-party/Loadable';
import { Box, Grid } from '../../../node_modules/@mui/material/index';
const UserHome = Loadable(lazy(() => import('./UserHome/UserHome')));
import styles from '../User/styles.module.scss';
const Profile = Loadable(lazy(() => import('pages/Profile/Profile')));
const Setting = Loadable(lazy(() => import('pages/Settings/Setting')));
import { Routes } from '../../../node_modules/react-router-dom/dist/index';
import { Route } from '../../../node_modules/react-router/dist/index';
import HomeContainer from 'containers/HomeContainer';
import UserHeaderContainer from 'containers/UserHeaderContainer';
const UserPreview = Loadable(lazy(() => import('pages/UserPreview/UserPreview')));
const CreateRecipt = Loadable(lazy(() => import('pages/CreateRecipt/CreateRecipt')));
const UserRightNav = Loadable(lazy(() => import('../../containers/UserRightNav')));
const UserLeftNav = Loadable(lazy(() => import('../../containers/UserLeftNav')));
const UserSideBar = Loadable(lazy(() => import('./UserSidebar/UserSidebar')));
import Notifications from 'pages/Notifications/Notifications';

const UserDash = () => {
    const [openLeft, setOpenLeft] = useState(false);
    const [openRight, setOpenRight] = useState(false);

    return (
        <Box>
            <UserLeftNav openLeft={openLeft} setOpenLeft={setOpenLeft} />
            <UserRightNav openRight={openRight} setOpenRight={setOpenRight} />
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
                            <UserSideBar setOpenLeft={setOpenLeft} setOpenRight={setOpenRight} />
                        </Grid>
                        <Grid sx={{ backgroundColor: '#f5f5f5' }} item xs={12} sm={9} md={9.5} lg={10.1}>
                            <UserHeaderContainer
                                openLeft={openLeft}
                                setOpenLeft={setOpenLeft}
                                openRight={openRight}
                                setOpenRight={setOpenRight}
                            />
                            <Routes path="/user">
                                <Route path="/user" element={<UserHome />} />
                                <Route path="/user/profile" element={<HomeContainer />} />
                                <Route path="/user/setting" element={<Setting />} />
                                <Route path="/user/createReciept" element={<CreateRecipt />} />
                                <Route path="/user/preview" element={<UserPreview />} />
                                <Route path="/user/notifications" element={<Notifications />} />
                            </Routes>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default UserDash;
