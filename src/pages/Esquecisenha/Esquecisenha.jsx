import Title from "../../components/Titles/Title"
import SideImg from "../../components/Login/SideImg"
import BoxEmail from "../../components/Esqueciasenha/BoxEmail"
import { useState } from "react"
import OkayNotf from "../../components/General/OkayNotf";

export default function Esquecisenha(){
    


    const [responseEmail, setResponseEmail] = useState("");
    const [bgOkay, setBgOkay] = useState("");

    return(
        <div>
            <>

                <div className=" flex lg:hidden">
                    <div className="w-full h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
                        <Title Style={'w-[25%] lg:w-[20%]'}/>
                        <OkayNotf bgColor={bgOkay} Mnsg={responseEmail}/>
                        <BoxEmail setResponseEmail={setResponseEmail} setBgOkay={setBgOkay}/>
                    </div>
    
                </div>
                <div className="hidden lg:flex">
                    <div className="w-[50%] h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
                        <Title Style={'w-[25%] lg:w-[20%]'}/>
                        <OkayNotf bgColor={bgOkay} Mnsg={responseEmail}/>

                        <BoxEmail setResponseEmail={setResponseEmail} setBgOkay={setBgOkay}/>
                    </div>
                    <SideImg BgImg={"bg-sideimgesq"} LexendFrase={"Leve mais produtividade"} AboretoFrase={"para suas consultas"}/>
                </div>
            </>
        </div>
    )
}