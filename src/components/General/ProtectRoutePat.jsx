import { Navigate } from "react-router-dom";

export default function ProtectRoutePat({ children }) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')

    console.log(role) //debug
    
    if(!token || role != 'pat') {
        return <Navigate to="*" />;
    }
    
    return children;
}