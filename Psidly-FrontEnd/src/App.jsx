import './index.css';
import Login from './pages/LoginPages/Login';
import LoadingPage from './pages/LoadingPages/LoadingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastropage from './pages/Cadastro/Cadastropage';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoadingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/cadastro" element={<Cadastropage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
