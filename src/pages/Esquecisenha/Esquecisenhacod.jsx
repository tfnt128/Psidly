import Title from "../../components/Titles/Title"
import SideImg from "../../components/Login/SideImg"
import BoxCodigo from "../../components/Esqueciasenha/BoxCodigo"
import OkayNotf from "../../components/General/OkayNotf";
import { useState } from "react";

export default function Esquecisenhacod(){

    const [responseEmail, setResponseEmail] = useState("");
    const [bgOkay, setBgOkay] = useState("");


    return(
            <div>
                
                <div className=" flex lg:hidden">
                    <div className="w-full h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
                        <Title Style={'w-[25%] lg:w-[20%]'}/>
                        <OkayNotf bgColor={bgOkay} Mnsg={responseEmail}/>
                        
                        <BoxCodigo setResponseEmail={setResponseEmail} setBgOkay={setBgOkay}/>
                    </div>
    
                </div>
                <div className="hidden lg:flex">
                    <div className="w-[50%] h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
                        <Title Style={'w-[25%] lg:w-[20%]'}/>
                        <OkayNotf bgColor={bgOkay} Mnsg={responseEmail}/>

                        <BoxCodigo setResponseEmail={setResponseEmail} setBgOkay={setBgOkay}/>
                    </div>
                    <SideImg BgImg={"bg-sideimgesq"} LexendFrase={"Leve mais produtividade"} AboretoFrase={"para suas consultas"}/>
                </div>
            </div>
    )
}