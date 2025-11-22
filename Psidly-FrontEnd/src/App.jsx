import './index.css';
import Login from './pages/LoginPages/Login';
import LoadingPage from './pages/LoadingPages/LoadingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastropage from './pages/Cadastro/Cadastropage';
import Esquecisenha from './pages/Esquecisenha/Esquecisenha';
import Esquecisenhacod from './pages/Esquecisenha/Esquecisenhacod';
import Esqueciasenhatempoesg from './pages/Esquecisenha/Esquecisenhatempoesg';
import Esquecisenhaconfirmar from './pages/Esquecisenha/Esquecisenhaconfirmar';


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
          <Route path="/esqueceuasenhatempoesgotado" element={<Esqueciasenhatempoesg/>}/>
          <Route path="/esqueceuasenhaconfirmar" element={<Esquecisenhaconfirmar/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
