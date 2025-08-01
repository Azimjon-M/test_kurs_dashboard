import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('access_token');
    const roleString = localStorage.getItem('role');
    const userRoles = roleString ? JSON.parse(roleString) : [];

    const isAllowed = allowedRoles.some((role) => userRoles.includes(role));

    if (!token || !isAllowed) {
        return <Navigate to="/not-authorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
