import './index.css';
import Login from './pages/LoginPages/Login';
import LoadingPage from './pages/LoadingPages/LoadingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastropage from './pages/Cadastro/Cadastropage';
import Esquecisenha from './pages/Esquecisenha/Esquecisenha';
import Esquecisenhacod from './pages/Esquecisenha/Esquecisenhacod';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoadingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/cadastro" element={<Cadastropage/>}/>
          <Route path="/esqueceuasenha" element={<Esquecisenha/>}/>
          <Route path="/esqueceuasenhacodigo" element={<Esquecisenhacod/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
