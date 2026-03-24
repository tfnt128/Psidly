import Title from "../../components/Titles/Title"
import SideImg from "../../components/Login/SideImg"
import BoxConfirmar from "../../components/Esqueciasenha/BoxConfirmar"
import { useState } from "react"
import OkayNotf from "../../components/General/OkayNotf";


export default function Esquecisenhaconfirmar(){
    
    const [Okay, setOkay] = useState(false);
    const [Error, setError] = useState(false);

    const [responseEmail, setResponseEmail] = useState("");
    const [bgOkay, setBgOkay] = useState("");


    return(
            <div>
                <div className=" flex lg:hidden">
                    <div className="w-full h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
                        <Title Style={'w-[25%] lg:w-[20%]'}/>
                        <BoxConfirmar Okay={Okay} Error={Error}  setOkay={setOkay} setError={setError} />
                    </div>
    
                </div>
                <div className="hidden lg:flex">
                    <div className="w-[50%] h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
                        <Title Style={'w-[25%] lg:w-[20%]'}/>

                        <BoxConfirmar Okay={Okay} Error={Error}  setOkay={setOkay} setError={setError} />


                    </div>
                    <SideImg BgImg={"bg-sideimgesq"} LexendFrase={"Leve mais produtividade"} AboretoFrase={"para suas consultas"}/>
                </div>
            </div>
    )
}