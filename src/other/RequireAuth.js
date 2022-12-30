import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "./useAuth";

const RequireAuth = ({ allowedRoles }) => {

    const auth = localStorage.hasOwnProperty('user') ? (JSON.parse(localStorage.getItem("user"))) : '';
    const location = useLocation();
    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />

    );
}

export default RequireAuth;