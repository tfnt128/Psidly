import { Navigate } from "react-router-dom";

export default function ProtectRoutePsi({ children }) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    console.log(role) //debug

    if(!token || role != "psi") {
        return <Navigate to="/login" />;
    }
    
    return children;
}