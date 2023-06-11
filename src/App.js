// project import
import { lazy } from 'react';
import Loadable from 'components/third-party/Loadable';
const ForgotPassword = Loadable(lazy(() => import('pages/ForgotPassword/ForgotPassword')));
import ThemeCustomization from 'themes';
const Login = Loadable(lazy(() => import('pages/Login/Login')));
const QRScan = Loadable(lazy(() => import('pages/QRScan/QRScan')));
const Register = Loadable(lazy(() => import('pages/Register/Register')));
const ResetPassword = Loadable(lazy(() => import('pages/ResetPassword/ResetPassword')));
import { Routes, Route } from 'react-router-dom';
import PrivateComponent from 'pages/Login/PrivateComponent';
const AdminDash = Loadable(lazy(() => import('pages/Admin/AdminDash')));
const UserDash = Loadable(lazy(() => import('pages/User/UserDash')));
import LoginWithReddit from 'pages/RedditSocialLogin/RedditSocialLogin';
import HomeContainer from 'containers/HomeContainer';
import { BrowserRouter } from 'react-router-dom';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <>
        {/* <HomeContainer /> */}
        <ThemeCustomization>
            <BrowserRouter>
                <Routes>
                    <Route element={<PrivateComponent />}>
                        <Route path="/*" element={<UserDash />} />
                        <Route path="/admin/*" element={<AdminDash />} />
                        <Route path="/user/*" element={<UserDash />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/resetpassword=:token" element={<ResetPassword />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/QRScan" element={<QRScan />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login/callback" element={<LoginWithReddit />} />
                </Routes>
            </BrowserRouter>
        </ThemeCustomization>
    </>
);

export default App;
