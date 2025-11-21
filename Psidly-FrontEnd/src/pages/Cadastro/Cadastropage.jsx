import CadastroBox from "../../components/Cadastro/CadastroBox"
import SideImg from "../../components/Login/SideImg"
import Title from "../../components/Titles/Title"

export default function Cadastropage(){
    return(
        <>
            <div className=" flex lg:hidden">
                <div className="w-full h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
                    <Title Style={'w-[25%] lg:w-[20%]'}/>
                    <CadastroBox/>
                </div>

            </div>
            <div className="hidden lg:flex">
                <div className="w-[50%] h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
                    <Title Style={'w-[25%] lg:w-[20%]'}/>
                    <CadastroBox/>
                </div>
                <SideImg BgImg={"bg-sideimglogin"} LexendFrase={"Cadastre-se"} AboretoFrase={"Gratuitamente"}/>
            </div>
        </>
    )
}