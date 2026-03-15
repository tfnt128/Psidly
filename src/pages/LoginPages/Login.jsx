import OkayNotf from "../../components/General/OkayNotf";
import LoginBox from "../../components/Login/LoginBox"
import SideImg from "../../components/Login/SideImg"
import Title from "../../components/Titles/Title"
import { useState } from "react";
import DownloadButton from "../../components/Login/DownloadButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login(){
    
    const [okayNotifInfo, setOkayNotifInfo] = useState("");
    const [responseLogin, setResponseLogin] = useState("");
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [canInstall, setCanInstall] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setCanInstall(true);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);

    const handleInstallPWA = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            console.log("PWA instalado");
        }

        setDeferredPrompt(null);
        setCanInstall(false);

        const navigate = useNavigate()
        navigate("/")
    };

    return(
        <>
            <div className="flex lg:hidden">
                <div className="w-full h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
                    <Title Style={'w-[25%] lg:w-[20%]'}/>
                    {okayNotifInfo == "invalido" && <OkayNotf bgColor={"bg-alertbox"} Mnsg={responseLogin}/>}
                    {okayNotifInfo == "valido" && <OkayNotf bgColor={"bg-terciario"} Mnsg={responseLogin}/>}

                    <LoginBox setOkayNotifInfo={setOkayNotifInfo} setResponseLogin={setResponseLogin}/>
                    <DownloadButton Style="w-[75%] h-[75px] text-white mt-[40px] bg-terciario rounded-[35px] mb-[100px] font-aboreto text-[23px]  transition-all duration-300 hover:shadow-[0_0_30px_rgba(154,200,255,0.8)] hover:scale-105" 
                            Text="Download APP"
                            onClickFunction={handleInstallPWA}/>
                </div>
            </div>
            <div className="hidden lg:flex">
                <div className="w-[40%] h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
                    <Title Style={'w-[25%] lg:w-[20%]'}/>
                    {okayNotifInfo == "invalido" && <OkayNotf bgColor={"bg-alertbox"} Mnsg={responseLogin}/>}
                    {okayNotifInfo == "valido" && <OkayNotf bgColor={"bg-terciario"} Mnsg={responseLogin}/>}
                    <LoginBox setOkayNotifInfo={setOkayNotifInfo} setResponseLogin={setResponseLogin}/>
                    <DownloadButton Style="w-[75%] h-[10%] text-white mt-[40px] bg-terciario rounded-[65px] mb-[100px] font-aboreto text-[43px]  transition-all duration-300 hover:shadow-[0_0_30px_rgba(154,200,255,0.8)] hover:scale-105" 
                            Text="Download APP"
                            onClickFunction={handleInstallPWA}/>
                    
                </div>
                <SideImg BgImg={"bg-sideimglogin"} LexendFrase={"Melhore seu"} AboretoFrase={"Atendimento psicológico."}
                    SubFrase={"Deseja ter maior agilidade e praticidade em suas consultas e oferecer melhor acompanhamento para seu paciente? Conte com Psidly!"}/>
            </div>
        </>
    )
}