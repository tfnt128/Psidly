import BoxExcluirConta from "../../components/Configuracoes/BoxExcluirConta";
import Homeheader from "../../components/Homepage/Homeheader";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";
import HomemenuasidePat from "../../components/HomepagePat/HomemenuasidePat";
import HomemenuPat from "../../components/HomepagePat/HomemenuPat";

export default function ExcluirConta(){

    const role = localStorage.getItem('role')
    return(
            <div className="min-h-screen flex flex-col">
    
                <div className="fixed lg:hidden bottom-0 left-0 w-full ">
                    {
                        role == 'pat' ? <HomemenuPat BgSelectPerfil={"bg-quarternario"} /> : <Homemenu BgSelectPerfil={"bg-quarternario"} />
                    }
                </div>
                <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%] ">
                    {
                        role == 'pat' ? <HomemenuPat BgSelectPerfil={"bg-quarternario"} /> : <Homemenu BgSelectPerfil={"bg-quarternario"} />
                    }
                </div>

                <div className="flex flex-col items-center">
                    <BoxExcluirConta/>
                </div>
            </div>
    )
}