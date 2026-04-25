import { Navigate } from "react-router-dom";

export default function ProtectRoutePsi({ children }) {
    const token = localStorage.getItem('token');
    const crp = localStorage.getItem('roleCrp');
    
    if(!token && !crp) {
        return <Navigate to="/login" />;
    }
    
    return children;
}