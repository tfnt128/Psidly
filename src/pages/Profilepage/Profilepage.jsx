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


export default function Profilepage(){

    const navigator = useNavigate();
    function goToConfig(){
        navigator("/configuracoes");
    }

    return(
        <div className="min-h-screen ">
            
            <div className="fixed lg:hidden bottom-0 left-0 w-full z-50">
                <Homemenu BgSelectPerfil={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%] z-50">
                <Homemenuaside BgSelectPerfil={"bg-quarternario"} />
            </div>

            <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-30">
                    <Profilebox/>
                <div className="grid grid-cols-2 mb-[100px] lg:grid-cols-2 lg:w-[2100px] w-[85%] gap-4 content-start lg:mt-[-1100px] lg:gap-60">
                    <Boxoption tituloOpt={"Pac. Ocultos"} onClickWay={goToConfig} AnimationOption={Bigeye} />
                    <Boxoption tituloOpt={"Configurações"} AnimationOption={Enger}/>
                    <Boxoption tituloOpt={"Sobre o App"} AnimationOption={Book} Style={"lg:mt-[-150px]"}/>
                    <Boxoption tituloOpt={"Contato"} AnimationOption={Talk} Style={"lg:mt-[-150px]"}/>
                </div>
            </div>

        </div>
    )
}