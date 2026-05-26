import { Navigate } from "react-router-dom";

export default function ProtectRouteGeral({ children }) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')

    console.log(role) //debug
    
    if(!token ) {
        return <Navigate to="*" />;
    }
    
    return children;
}