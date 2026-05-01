import { useNavigate } from "react-router-dom";
import Homeheader from "../../components/Homepage/Homeheader";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";
import Boxoption from "../../components/Profilepage/Boxoption";
import Profilebox from "../../components/Profilepage/Profilebox";
import i18n from "../../services/i18n";

export default function Languages(){



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
                    <h1 className="font-aboreto mt-10 ml-10 lg:ml-[15%] lg:mt-30 lg:text-[80px]">Configurações: Idiomas</h1>
                    <div className=" w-[85%] lg:w-[67%] h-[760px]  lg:h-[1804px] lg:ml-[850px] mt-[7%] lg:mt-[7%] ml-[8%] grid grid-cols-1 items-start justify-items-center
                    lg:grid-cols-3 lg:grid-rows-3">
                        <Boxoption tituloOpt={"Português (BR)"} onClickWay={trocarIdioma('pt')} />
                        <Boxoption tituloOpt={"Inglês (EUA)"} onClickWay={trocarIdioma('en')} />
                        <Boxoption tituloOpt={"Espanhol (ESP)"} onClickWay={trocarIdioma('es')}/>
                        <Boxoption tituloOpt={"Mandarim (CHI)"} onClickWay={trocarIdioma('zh')}/>
                        <Boxoption tituloOpt={"Árabe"} onClickWay={trocarIdioma('ar')}/>
                        <Boxoption tituloOpt={"Russo"} onClickWay={trocarIdioma('ru')}/>
                        <Boxoption tituloOpt={"Francês"} onClickWay={trocarIdioma('fr')}/>
                    </div>
                </div>
            </div>
    )
}