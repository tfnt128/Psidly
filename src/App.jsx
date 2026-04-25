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
import OcultoPage from './pages/OcultoPage/OcultoPage';
import HomepagePat from './pages/HomepagePat/HomepagePat';
import Profilepagepat from './pages/ProfilePagePat/Profilepagepat';
import NotFound from './pages/NotFound/NotFound';
import ProtectRoutePsi from './components/General/ProtectRoutePsi';
import ProtectRoutePat from './components/General/ProtectRoutePat';


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
          <Route path="/homepage" element={
            <ProtectRoutePsi>
              <Homepage/>
            </ProtectRoutePsi>
          }/>
          <Route path="/graphicspage" element={
            <ProtectRoutePsi>
              <Graphicspage/>
            </ProtectRoutePsi>
          }/>
          <Route path="/profilepage" element={
            <ProtectRoutePsi>
              <Profilepage/>
            </ProtectRoutePsi>
          }/>
          <Route path="/configuracoes" element={
            <ProtectRoutePsi>
              <Configuracoes/>
            </ProtectRoutePsi>
          }/>
          <Route path="/excluirconta" element={
            <ProtectRoutePsi>
              <ExcluirConta/>
            </ProtectRoutePsi>
          }/>
          <Route path="/pacientesocultos" element={
            <ProtectRoutePsi>
              <OcultoPage/>
            </ProtectRoutePsi>
          }/>
          {/* <Route path="/homepagepatient" element={
            <ProtectRoutePat>
              <HomepagePat/>
            </ProtectRoutePat>
          }/>
          <Route path="/profilepagepat" element={
            <ProtectRoutePat>
              <Profilepage/>
            </ProtectRoutePat>
          }/> */}
          <Route path="/homepagepatient" element={<HomepagePat/>}/>

          <Route path="/profilepagepat" element={<Profilepagepat/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
