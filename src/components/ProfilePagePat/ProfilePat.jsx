import ProfilePhoto from "../../assets/icons/simbperfil.png"
import ShowPut from "../General/ShowPut"
import { useTranslation } from "react-i18next"

export default function ProfilePat({}){
    const {t} = useTranslation()
    const nome = localStorage.getItem("nome")
    const email = localStorage.getItem("email")

    return(
        <div className="w-[125%] lg:w-[2100px] h-[260px] lg:h-[960px] lg:ml-[850px] lg:mt-[3%] mt-[7%] flex flex-col lg:flex-col items-center bg-quarternario rounded-[20px] lg:rounded-[100px]">
            <h1 className="font-aboreto lg:text-[70px] mt-5 color-quarternario lg:mt-20 lg:mb-20 mb-5 ">{t('meuPerfil')}</h1>

            
            <ShowPut Text={nome} BorderBg={"border-blue-300"} TextColor={"text-blue-300"} Style={"w-[300px] h-[65px] lg:w-[1400px] lg:h-[230px] hover:transform hover:scale-110 hover:duration-300"}  Label={t('nome')} />
            <ShowPut Text={email} BorderBg={"border-blue-300"} TextColor={"text-blue-300"} Style={"w-[300px] lg:mt-20 mt-5 h-[65px] lg:w-[1400px] lg:h-[230px] hover:transform hover:scale-110 hover:duration-300"}  Label={t('email')} />
        </div>
    )
}