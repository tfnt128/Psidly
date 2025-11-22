import { useNavigate } from "react-router-dom";
import Homeheader from "../../components/Homepage/Homeheader";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";
import Boxoption from "../../components/Profilepage/Boxoption";
import Profilebox from "../../components/Profilepage/Profilebox";

export default function Configuracoes(){
    return(
            <div className="min-h-screen flex flex-col">
                <Homeheader/>
    
                <div className="fixed lg:hidden bottom-0 left-0 w-full ">
                    <Homemenu BgSelectPsi={"bg-quarternario"} />
                </div>
                <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-[calc(100vh-300px)] w-[10%] ">
                    <Homemenuaside BgSelectPsi={"bg-quarternario"} />
                </div>

                <div className="flex flex-col  ">
                    <h1 className="font-aboreto mt-10 ml-10 lg:ml-[15%] lg:mt-30 lg:text-[80px]">Configurações</h1>
                    <div className=" w-[85%] lg:w-[80%] h-[830px]  lg:h-[804px] lg:ml-[850px] mt-[7%] lg:mt-[7%] ml-[8%] grid grid-cols-1 items-start justify-items-center
                    lg:grid-cols-3 lg:grid-rows-3">
                        <Boxoption tituloOpt={"Exclusão da conta"} />
                    </div>
                </div>
            </div>
    )
}