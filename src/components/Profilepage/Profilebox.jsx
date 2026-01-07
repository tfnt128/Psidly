import { useEffect, useState } from "react"
import ProfileImg from "../../assets/icons/simbperfil.png"
import {getNomeProfile, getEmailProfile} from "../../services/api";

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
        <div className="w-[85%] lg:w-[80%] h-[130px] pl-7 lg:h-[804px] lg:ml-[850px] lg:mt-[3%] mt-[7%] flex flex-row lg:flex-col items-center ml-[8%] bg-secundario rounded-[20px] lg:rounded-[100px]">
            <div className="w-[20%] flex flex-col items-center">
                <img src={ProfileImg} className="w-[150px] lg:w-[400px]"/>
            </div>
            <div className="w-[60%] lg:flex lg:flex-col items-center">
                <h1 className="font-lexenddeca color-primario lg:text-[90px]">{nome}</h1>
                <h2 className="font-lexenddeca color-placeholder text-[15px] lg:text-[60px]">{email}</h2>
            </div>
            <div>

            </div>
        </div>
    )
}