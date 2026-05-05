import { useNavigate } from "react-router-dom";
import Homeheader from "../../components/Homepage/Homeheader";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";
import Boxoption from "../../components/Profilepage/Boxoption";
import Profilebox from "../../components/Profilepage/Profilebox";
import i18n from "../../services/i18n";
import { useTranslation } from "react-i18next";

export default function Languages(){

    const {t} = useTranslation()

    function trocarIdioma(lang) {
        i18n.changeLanguage(lang);
        localStorage.setItem('idioma', lang);
    }

    return(
            <div className="min-h-screen flex flex-col">
    
                <div className="fixed lg:hidden bottom-0 left-0 w-full ">
                    <Homemenu BgSelectPerfil={"bg-quarternario"} />
                </div>
                <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%] ">
                    <Homemenuaside BgSelectPerfil={"bg-quarternario"} />
                </div>

                <div className="flex flex-col  ">
                    <h1 className="font-aboreto mt-10 ml-10 lg:ml-[15%] lg:mt-30 lg:text-[80px]">{t('configuracoes')}</h1>
                    <div className=" w-[85%] lg:w-[67%] h-[760px]  lg:h-[1804px] lg:ml-[850px] mt-[7%] lg:mt-[7%] ml-[8%] grid grid-cols-1 items-start justify-items-center
                    lg:grid-cols-3 lg:grid-rows-3">
                        <Boxoption tituloOpt={t('portugues')} onClickWay={() => trocarIdioma('pt')} />
                        <Boxoption tituloOpt={t('ingles')} onClickWay={() => trocarIdioma('en')} />
                        <Boxoption tituloOpt={t('espanhol')} onClickWay={() => trocarIdioma('es')}/>
                        <Boxoption tituloOpt={t('mandarim')} onClickWay={() => trocarIdioma('zh')}/>
                        <Boxoption tituloOpt={t('arabe')} onClickWay={() => trocarIdioma('ar')}/>
                        <Boxoption tituloOpt={t('russo')} onClickWay={() => trocarIdioma('ru')}/>
                        <Boxoption tituloOpt={t('frances')} onClickWay={() => trocarIdioma('fr')}/>
                    </div>
                </div>
            </div>
    )
}