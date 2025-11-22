import AddButton from "../../components/Homepage/AddButton";
import Homeheader from "../../components/Homepage/Homeheader";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";
import Boxoption from "../../components/Profilepage/Boxoption";
import Profilebox from "../../components/Profilepage/Profilebox";

export default function Profilepage(){
    return(
        <div className="min-h-screen ">
            <Homeheader/>
            
            <div className="fixed lg:hidden bottom-0 left-0 w-full z-50">
                <Homemenu BgSelectPerfil={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-[calc(100vh-300px)] w-[10%] z-50">
                <Homemenuaside BgSelectPerfil={"bg-quarternario"} />
            </div>

            <div className="flex flex-col ">
                <Profilebox/>
                <div className=" w-[85%] lg:w-[80%] h-[830px]  lg:h-[804px] lg:ml-[850px] lg:mt-[3%] mt-[7%] ml-[8%] grid grid-cols-1 items-start justify-items-center
                lg:grid-cols-3 lg:grid-rows-3">
                    <Boxoption tituloOpt={"Configurações"}/>
                </div>
            </div>

        </div>
    )
}