import { useNavigate } from "react-router-dom";
import Homeheader from "../../components/Homepage/Homeheader";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";
import Boxoption from "../../components/Profilepage/Boxoption";
import Profilebox from "../../components/Profilepage/Profilebox";
import { useTranslation } from "react-i18next";
import HomemenuasidePat from "../../components/HomepagePat/HomemenuasidePat";
import HomemenuPat from "../../components/HomepagePat/HomemenuPat";

export default function Configuracoes(){

    const {t} = useTranslation()

    const navigator = useNavigate();
    function goToExcluir(){
        navigator("/excluirconta")
    }

    function goToLang(){
        navigator("/languages")
    }

    function logout(){
        localStorage.clear()
        navigator("/login")
    }

    function goToEsqueciSenha(){
        navigator("/esqueceuasenha")
    }
    const role = localStorage.getItem('role')

    return(
            <div className="min-h-screen flex flex-col">
    
                <div className="fixed lg:hidden bottom-0 left-0 w-full ">
                    {
                        role == 'pat' ? <HomemenuPat BgSelectPerfil={"bg-quarternario"} /> : <Homemenu BgSelectPerfil={"bg-quarternario"} />
                    }
                </div>
                <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%] ">
                    {
                        role == 'pat' ? <HomemenuasidePat BgSelectPerfil={"bg-quarternario"} /> : <Homemenuaside BgSelectPerfil={"bg-quarternario"} />
                    }                
                </div>

                <div className="flex flex-col  ">
                    <h1 className="font-aboreto mt-10 ml-10 lg:ml-[15%] lg:mt-30 lg:text-[80px]">{t('configuracoes')}</h1>
                    <div className=" w-[85%] lg:w-[67%] h-[830px]  lg:h-[804px] lg:ml-[850px] mt-[7%] lg:mt-[7%] ml-[8%] flex flex-col items-center gap-5 lg:grid lg:items-start lg:justify-items-center
                    lg:grid-cols-3 lg:grid-rows-3">
                        <Boxoption tituloOpt={t('exclusaoConta')} onClickWay={goToExcluir} />
                        <Boxoption tituloOpt={t('idiomas')} onClickWay={goToLang}/>
                        <Boxoption tituloOpt={t('Logout')} onClickWay={logout}/>
                        {
                            role == 'pat' &&
                                <Boxoption tituloOpt={t('redefinirSenha')} Style={"lg:mt-90"} onClickWay={goToEsqueciSenha}/>

                        }
                    </div>
                </div>
            </div>
    )
}