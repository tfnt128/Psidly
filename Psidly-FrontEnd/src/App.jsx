import './index.css';
import Login from './pages/LoginPages/Login';
import LoadingPage from './pages/LoadingPages/LoadingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastropage from './pages/Cadastro/Cadastropage';
import Esquecisenha from './pages/Esquecisenha/Esquecisenha';
import Esquecisenhacod from './pages/Esquecisenha/Esquecisenhacod';
import Esqueciasenhatempoesg from './pages/Esquecisenha/Esquecisenhatempoesg';
import Esquecisenhaconfirmar from './pages/Esquecisenha/Esquecisenhaconfirmar';
import Homepage from './pages/Homepage/Homepage';
import Graphicspage from './pages/Graphicspage/Graphicspage';
import Profilepage from './pages/Profilepage/Profilepage';
import Configuracoes from './pages/Configuracoes/Configuracoes';
import ExcluirConta from './pages/Configuracoes/ExcluirConta';


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
          <Route path="/homepage" element={<Homepage/>}/>
          <Route path="/graphicspage" element={<Graphicspage/>}/>
          <Route path="/profilepage" element={<Profilepage/>}/>
          <Route path="/configuracoes" element={<Configuracoes/>}/>
          <Route path="/excluirconta" element={<ExcluirConta/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
