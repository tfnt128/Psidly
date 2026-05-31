import { useTranslation } from "react-i18next"
import ProfilePhoto from "../../assets/icons/simbperfil.png"
import ShowPut from "../General/ShowPut"
import { findPsi } from "../../services/api"
import { useState } from "react"
import { useEffect } from "react"

export default function ProfilePsi({}){
    const {t} = useTranslation()
    const id = localStorage.getItem("id")

    const [email, setEmail] = useState()
    const [nome, setNome] = useState(0)
    useEffect(()=>{
        async function findMyPsi() {
            const response = await findPsi(id)
            console.log(response)
            setNome(response.name)
            setEmail(response.email)
        }

        findMyPsi()
    }, [])
    return(
        <div className="w-[125%] lg:w-[2100px] h-[260px] lg:h-[960px] lg:ml-[850px] lg:mt-[3%] mt-[7%] flex flex-col lg:flex-col items-center bg-quarternario rounded-[20px] lg:rounded-[100px]">
            <h1 className="font-aboreto lg:text-[70px] mt-6 color-quarternario lg:mt-20 lg:mb-20 mb-5">{t('meuPsicologo')}</h1>
                         
            <ShowPut Text={nome} ReadOnly={true} BorderBg={"border-blue-300"} TextColor={"text-blue-300"} Style={"w-[300px] h-[65px] lg:w-[1400px] lg:h-[230px] hover:transform hover:scale-110 hover:duration-300"}  Label={t('nome')} />
            <ShowPut Text={email} ReadOnly={true} BorderBg={"border-blue-300"} TextColor={"text-blue-300"} Style={"w-[300px] mt-5 lg:mt-20 h-[65px] lg:w-[1400px] lg:h-[230px] hover:transform hover:scale-110 hover:duration-300"}  Label={t('email')} />
        </div>
    )
}