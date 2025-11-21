import LoginBox from "../../components/Login/LoginBox"
import SideImg from "../../components/Login/SideImg"
import Title from "../../components/Titles/Title"

export default function Login(){
    return(
        <>
            <div className="flex lg:hidden">
                <div className="w-full h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
                    <Title Style={'w-[25%] lg:w-[20%]'}/>
                    <LoginBox/>
                </div>
            </div>
            <div className="hidden lg:flex">
                <div className="w-[40%] h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
                    <Title Style={'w-[25%] lg:w-[20%]'}/>
                    <LoginBox/>
                </div>
                <SideImg BgImg={"bg-sideimglogin"} LexendFrase={"Melhore seu"} AboretoFrase={"Atendimento psicológico."}
                    SubFrase={"Deseja ter maior agilidade e praticidade em suas consultas e oferecer melhor acompanhamento para seu paciente? Conte com Psidly!"}/>
            </div>
        </>
    )
}