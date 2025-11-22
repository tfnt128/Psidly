import BoxExcluirConta from "../../components/Configuracoes/BoxExcluirConta";
import Homeheader from "../../components/Homepage/Homeheader";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";

export default function ExcluirConta(){
    return(
            <div className="min-h-screen flex flex-col">
                <Homeheader/>
    
                <div className="fixed lg:hidden bottom-0 left-0 w-full ">
                    <Homemenu BgSelectPerfil={"bg-quarternario"} />
                </div>
                <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-[calc(100vh-300px)] w-[10%] ">
                    <Homemenuaside BgSelectPerfil={"bg-quarternario"} />
                </div>

                <div className="flex flex-col items-center">
                    <BoxExcluirConta/>
                </div>
            </div>
    )
}