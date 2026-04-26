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

export default function Profilepage(){

    const navigator = useNavigate();
    function goToConfig(){
        navigator("/configuracoes");
    }

    function goToOcult(){
        navigator("/pacientesocultos")
    }

    function goToEmail(){
        window.location.href = "mailto:suporte@psidly.com?subject=Contato Psidly"
    }

    const [email, setEmail] = useState()
    const [nome, setNome] = useState()
    const varCrp = localStorage.getItem("roleCrp")
    const [crp, setCrp] = useState(varCrp)
    console.log(crp)


    return(
        <div className="min-h-screen ">
            
            <div className="fixed lg:hidden bottom-0 left-0 w-full z-50">
                <Homemenu BgSelectPerfil={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%] z-50">
                <Homemenuaside BgSelectPerfil={"bg-quarternario"} />
            </div>

            <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-30">
                <Profilebox email={email} nome={nome}/>
                <div className="grid grid-cols-2 mb-[100px] lg:grid-cols-2 lg:w-[2100px] w-[85%] gap-4 content-start lg:mt-[230px] lg:gap-60">
                    <Boxoption tituloOpt={"Pac. Ocultos"} onClickWay={goToOcult} AnimationOption={Bigeye} />
                    <Boxoption tituloOpt={"Configurações"} AnimationOption={Enger}/>
                    <Boxoption tituloOpt={"Sobre o App"} AnimationOption={Book} Style={"lg:mt-[-150px] mt-[3px]"}/>
                    <Boxoption tituloOpt={"Contato"} AnimationOption={Talk} Style={"lg:mt-[-150px]  mt-[3px]"} onClickWay={goToEmail}/>
                    <Boxoption tituloOpt={"Privacidade"} AnimationOption={Locker} Style={"lg:mt-[-150px] mt-[3px]"}/>
                    <Boxoption tituloOpt={"Termos"} AnimationOption={Write} Style={"lg:mt-[-150px] mt-[3px]"}/>
                    <Share Style={"lg:w-[2280px] lg:h-[800px] w-[340px] lg:rounded-[50px] rounded-[20px] bg-secundario lg:mt-[-120px] hover:transition hover:transform hover:scale-105 duration-300"}/>
                </div>
                
            </div>

        </div>
    )
}