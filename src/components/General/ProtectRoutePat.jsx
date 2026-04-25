import { Navigate } from "react-router-dom";

export default function ProtectRoutePat({ children }) {
    const token = localStorage.getItem('token');
    const cpf = localStorage.getItem('roleCpf')
    
    if(!token && !cpf) {
        return <Navigate to="/login" />;
    }
    
    return children;
}