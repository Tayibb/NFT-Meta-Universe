import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminDash from 'pages/Admin/AdminDash';
import UserDash from 'pages/User/UserDash';

function PrivateComponent() {
    const auth = localStorage.getItem('user');
    const adminAuth = localStorage.getItem('admin');
    return auth ? <UserDash /> : adminAuth ? <AdminDash /> : <Navigate to="/login" />;
}

export default PrivateComponent;
