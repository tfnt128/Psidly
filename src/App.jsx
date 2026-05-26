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
import Sobre from "./pages/Sobre/Sobre";
import Termos from "./pages/Termos/Termos";
import Languages from './pages/Configuracoes/Languages';
import ProtectRouteGeral from './components/General/ProtectRouteGeral';

import SobrePat from "./pages/Sobre/SobrePat";
import TermosPat from "./pages/Termos/TermosPat";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoadingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/cadastro" element={<Cadastropage/>}/>
          <Route path="/esqueceuasenha" element={<Esquecisenha/>}/>
          <Route path="/esqueceuasenhacodigo" element={<Esquecisenhacod/>}/>
          <Route path="/esqueceuasenhatempoesgotado" element={<Esqueciasenhatempoesg/>}/>
          <Route path="/esqueceuasenhaconfirmar" element={<Esquecisenhaconfirmar/>}/>
          <Route path="/sobre" element={
            <ProtectRoutePsi>
              <Sobre />
            </ProtectRoutePsi>} />
          <Route path="/termos" element={
            <ProtectRoutePsi>
              <Termos/>
            </ProtectRoutePsi>
          } />
          <Route path="/sobrePat" element={
            <ProtectRoutePat>
              <SobrePat />
            </ProtectRoutePat>} />
          <Route path="/termosPat" element={
            <ProtectRoutePat>
              <TermosPat/>
            </ProtectRoutePat>
          } />


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

          <Route path="/excluirconta" element={
            <ProtectRouteGeral>
              <ExcluirConta/>
            </ProtectRouteGeral>
          }/>
          <Route path="/pacientesocultos" element={
            <ProtectRoutePsi>
              <OcultoPage/>
            </ProtectRoutePsi>
          }/>
          <Route path="/configs" element={
            <ProtectRouteGeral>
              <Configuracoes/>
            </ProtectRouteGeral>
          }/>

          <Route path="/languages" element={
            <ProtectRouteGeral>
              <Languages/>

            </ProtectRouteGeral>
          }/>
          <Route path="/homepagepatient" element={
            <ProtectRoutePat>
              <HomepagePat/>
            </ProtectRoutePat>
          }/>
          
          <Route path="/profilepagepat" element={
            <ProtectRoutePat>
              <Profilepagepat/>
            </ProtectRoutePat>
          }/>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
