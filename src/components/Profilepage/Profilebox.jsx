import { useEffect, useState } from "react"
import ProfileImg from "../../assets/icons/simbperfil.png"
import {getNomeProfile, getEmailProfile} from "../../services/api";
import ShowPut from "../General/ShowPut";

export default function Profilebox(){

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const emailLocal = localStorage.getItem('resetPasswordEmail');
        
        if(emailLocal) {
            getNomeProfile(emailLocal).then(nome => setNome(nome));
            getEmailProfile(emailLocal).then(email => setEmail(email));
        }
    }, [])


    return(
        <div className="w-[85%] lg:w-[2100px] h-[530px] lg:h-[2500px]  hover:bg-blue-400 duration-300 hover:transform lg:ml-[850px] lg:mt-[3%] mt-[7%] flex flex-col lg:flex-col items-center bg-secundario rounded-[20px] lg:rounded-[100px]">
            <div className=" flex flex-col items-center">
                <img src={ProfileImg} className="w-[100px] lg:w-[400px]"/>
            </div>
            <div className="w-[60%] lg:flex lg:flex-col items-center gap-15">
                    <ShowPut BorderBg={"border-blue-800"} TextColor={"text-blue-800"} Label={"Nome"} />
                    <ShowPut BorderBg={"border-blue-800"} TextColor={"text-blue-800"} Label={"CRP"} />
                    <ShowPut BorderBg={"border-blue-800"} TextColor={"text-blue-800"} Label={"E-mail"} />
                    <ShowPut BorderBg={"border-blue-800"} TextColor={"text-blue-800"} Label={"Data de Nascimento"} />
                    <ShowPut BorderBg={"border-blue-800"} TextColor={"text-blue-800"} Label={"Convênios"} />
            </div>
            <div>

            </div>
        </div>
    )
}