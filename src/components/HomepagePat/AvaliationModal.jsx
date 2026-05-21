import { useState } from "react"
import StarAvaliation from "./StarsAvaliation"
import Button from "../General/Button";
import LoadingCircle from "../Animations/LoadingCircle";
import { useTranslation } from "react-i18next";
import { createAvaliation } from "../../services/api";

export default function AvaliationModal({Style, setBlur, messageOk, setMessageOk, setTextMessagePad, setTextBtnMessagePad, setSlide}){
    const {t} = useTranslation()
    const hoje = new Date().toLocaleDateString('pt-BR');

    const [alegria, setAlegria] = useState(0)
    const [tristeza, setTristeza] = useState(0)
    const [raiva, setRaiva] = useState(0)
    const [ansiedade, setAnsiedade] = useState(0)
    const [estresse, setEstresse] = useState(0)
    const [obs, setObs] = useState()

    function cancel(){
        setBlur(false)
    }

    const [standState, setStandState] = useState(false)
    async function handleAvaliation(){

        try {
            const hora = new Date().toLocaleTimeString()
            const id = localStorage.getItem("id")
            const response = await createAvaliation(id, alegria, tristeza, raiva, estresse, ansiedade, obs, hoje, hora) 
            console.log(response)
            if(window.innerWidth >= 1024){
                setSlide("animate-slide-left")
            }
            else{
                setSlide("animate-slide-up")
            }
            // setStandState(true)
            setBlur(false)
            setMessageOk(true)
            setTextMessagePad("Avaliação enviada com sucesso.")
            setTextBtnMessagePad("Ok")
        
        } catch (err) {
            console.log(err)
        }

    }


    return(
        <div className={`relative mt-40 lg:mt-20 bg-quarternario h-auto mb-15 lg:mb-0 py-10 lg:py-20 lg:p-50 lg:w-[2500px] w-[350px] flex flex-col lg:flex-row items-center lg:rounded-[150px] rounded-[30px] ${Style}`}>
            {
                standState &&
                    <div className="absolute h-full justify-center w-full inset-0 bg-black/90 rounded-[30px] lg:rounded-[150px] z-10 flex flex-col items-center">
                        <LoadingCircle/>
                    </div>
            }

            <div className="flex flex-col items-center lg:mr-10 ">
                <h1 className="font-aboreto text-[17px] color-quarternario lg:text-[57px] lg:ml-30 pl-15 w-[120%] lg:mt-[-80px] ">{t('avaliacaoDoDia')} {hoje}</h1>

                <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[58px] mt-10 lg:mt-30 mb-[-15px] lg:mb-[-65px]">{t('alegria')}</h1>
                <StarAvaliation value={alegria} onChange={setAlegria} />

                <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[58px] mt-5 mb-[-15px] lg:mb-[-65px]">{t('tristeza')}</h1>
                <StarAvaliation value={tristeza} onChange={setTristeza} />

                <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[58px] mt-5 mb-[-15px] lg:mb-[-65px]">{t('raiva')}</h1>
                <StarAvaliation value={raiva} onChange={setRaiva} />

                <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[58px] mt-5 mb-[-15px] lg:mb-[-65px]">{t('ansiedade')}</h1>
                <StarAvaliation value={ansiedade} onChange={setAnsiedade} />

                <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[58px] mt-5 mb-[-15px] lg:mb-[-65px]">{t('estresse')}</h1>
                <StarAvaliation value={estresse} onChange={setEstresse} />
            </div>
            <div className="w-[300px] lg:w-[4px] h-[2px] shrink-0 mt-10 lg:ml-30 lg:mt-0 lg:h-[2000px] lg:ml-10 bg-white/40 mx-4 lg:mx-20 rounded-full"/>

            <div className="flex flex-col items-center lg:ml-35 lg:mr-[-30px]">
                <h1 className="font-aboreto color-quarternario text-[18px] lg:text-[58px] mt-10 lg:mb-10 lg:mt-[-20px] mb-[-15px] ">{t('observacoes')}</h1>
                <textarea className="w-[300px] lg:h-[1400px] lg:mt-10 lg:w-[900px] h-[300px] lg:text-[40px] lg:p-5 text-[15px] bg-white rounded-[20px] lg:rounded-[50px] mt-10 outline-none font-lexenddeca p-3 " maxLength={300}
                    placeholder={t('minhasObservacoes')}
                    value={obs}
                    onChange={(e) => setObs(e.target.value)}/> 
                <div className="flex flex-row gap-4 mt-10 ">
                    <Button Style={"w-[140px] lg:w-[370px] h-[50px] lg:h-[160px] bg-terciario text-[12px] lg:text-[40px] font-aboreto color-secundario lg:mt-5 rounded-[10px] lg:rounded-[30px] hover:bg-white hover:text-black  hover:transition-all duration-400 ease-in-out"} Text={t('enviar')} OnClickFunction={handleAvaliation}/>
                    <Button Style={"w-[140px] lg:w-[370px] lg:h-[160px] h-[50px] bg-alertbox text-[12px] lg:text-[40px] font-aboreto color-secundario lg:mt-5 rounded-[10px] lg:rounded-[30px] hover:bg-white hover:text-black  hover:transition-all duration-400 ease-in-out"} Text={t('cancelar')} OnClickFunction={cancel}/>

                </div>               
            </div>


            
        </div>
    )

}