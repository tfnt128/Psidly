import { useNavigate } from "react-router-dom";
import Homeheader from "../../components/Homepage/Homeheader";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";
import Boxoption from "../../components/Profilepage/Boxoption";
import Profilebox from "../../components/Profilepage/Profilebox";
import Enger from "../../assets/animations/settinganim.json"
import Book from "../../assets/animations/Book.json"
import Talk from "../../assets/animations/Talk.json"
import Bigeye from "../../assets/animations/Bigeye.json"
import Locker from "../../assets/animations/locker.json"
import Write from "../../assets/animations/Write.json"
import Share from "../../components/Profilepage/Share";
import { useState } from "react";
import { useEffect } from "react";
import MessagePad from "../../components/General/MessagePad";
import { useTranslation } from "react-i18next";

export default function Profilepage(){
    const { t } = useTranslation();

    const navigator = useNavigate();

    const [messageOk, setMessageOk] = useState(false)
    const [textMessagePad, setTextMessagePad] = useState()
    const [textBtnMessagePad, setTextBtnMessagePad] = useState()

    const[slide, setSlide] = useState()

    function goToConfig(){
        navigator("/configs");
    }

    function goToOcult(){
        navigator("/pacientesocultos")
    }

    function goToEmail(){
        window.location.href = "mailto:suporte@psidly.com?subject=Contato Psidly"
    }

    function goToSobre(){
        navigator("/sobre")
    }

    function goToTermos(){
        navigator("/termos")
    }

    return(
        <div className="min-h-screen ">
            {
                messageOk &&
                    <div className="absolute h-full w-full inset-0 bg-black/80 z-10 flex flex-col items-center">
                        <MessagePad Text={textMessagePad} textButton={textBtnMessagePad} OnClickFunction={closeMsgPad} Slide={slide}/>
                    </div>
            }
            
            <div className="fixed lg:hidden bottom-0 left-0 w-full z-50">
                <Homemenu BgSelectPerfil={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%] z-50">
                <Homemenuaside BgSelectPerfil={"bg-quarternario"} />
            </div>

            <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-30">
                <Profilebox 
                messageOk={messageOk} 
                setMessageOk={setMessageOk} 
                setTextMessagePad={setTextMessagePad}
                setTextBtnOk={setTextBtnMessagePad}/>
                <div className="grid grid-cols-2 mb-[100px] lg:grid-cols-2 lg:w-[2100px] w-[85%] gap-4 content-start lg:mt-[230px] lg:gap-60">
                    <Boxoption tituloOpt={t('pacientesOcultos')} onClickWay={goToOcult} AnimationOption={Bigeye} />
                    <Boxoption tituloOpt={t('configuracoes')} AnimationOption={Enger} onClickWay={goToConfig}/>
                    <Boxoption tituloOpt={t('sobreApp')} AnimationOption={Book} Style={"lg:mt-[-150px] mt-[3px]"} onClickWay={goToSobre}/>
                    <Boxoption tituloOpt={t('contato')} AnimationOption={Talk} Style={"lg:mt-[-150px]  mt-[3px]"} onClickWay={goToEmail}/>
                    <Boxoption tituloOpt={t('privacidade')} AnimationOption={Locker} Style={"lg:mt-[-150px] mt-[3px]"}/>
                    <Boxoption tituloOpt={t('termos')} AnimationOption={Write} Style={"lg:mt-[-150px] mt-[3px]"} onClickWay={goToTermos}/>


                    <Share Style={"lg:w-[2280px] lg:h-[800px] w-[340px] lg:rounded-[50px] rounded-[20px] bg-secundario lg:mt-[-120px] hover:transition hover:transform hover:scale-105 duration-300"}/>
                </div>
            </div>
        </div>
    )
}