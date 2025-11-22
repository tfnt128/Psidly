import Title from "../../components/Titles/Title"
import SideImg from "../../components/Login/SideImg"
import BoxConfirmar from "../../components/Esqueciasenha/BoxConfirmar"
import { useState } from "react"
import OkayNotf from "../../components/General/OkayNotf";


export default function Esquecisenhaconfirmar(){
    
    const [Okay, setOkay] = useState(false);
    const [Error, setError] = useState(false);
    const [mnsgOkay, setMnsgOkay] = useState("Senha redefinida. Aguarde e você será redirecionado para a tela de inicio."); /*alterar*/
    const [mnsgError, setMnsgError] = useState();

    return(
            <div>
                <div className=" flex lg:hidden">
                    <div className="w-full h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
                        <Title Style={'w-[25%] lg:w-[20%]'}/>
                        {Okay && <OkayNotf Mnsg={mnsgOkay}/>}
                        {Error && <ErrorNotf Mnsg={mnsgError}/>}
                        <BoxConfirmar Okay={Okay} Error={Error} MnsgOkay={mnsgOkay} MnsgError={mnsgError} setOkay={setOkay} setError={setError} />
                    </div>
    
                </div>
                <div className="hidden lg:flex">
                    <div className="w-[50%] h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
                        <Title Style={'w-[25%] lg:w-[20%]'}/>
                        {Okay && <OkayNotf Mnsg={mnsgOkay}/>}
                        {Error && <ErrorNotf Mnsg={mnsgError}/>}
                        <BoxConfirmar Okay={Okay} Error={Error} MnsgOkay={mnsgOkay} MnsgError={mnsgError} setOkay={setOkay} setError={setError} />


                    </div>
                    <SideImg BgImg={"bg-sideimgesq"} LexendFrase={"Leve mais produtividade"} AboretoFrase={"para suas consultas"}/>
                </div>
            </div>
    )
}