import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute: React.FC = () => {
  const isAdminAuthenticated = localStorage.getItem('yanet_admin_auth') === 'true';

  if (!isAdminAuthenticated) {
    // Redirect to the admin login page if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render the child routes (AdminLayout)
  return <Outlet />;
};

export default AdminProtectedRoute;
