import Homemenu from "../../components/Homepage/Homemenu";
import HomemenuPat from "../../components/HomepagePat/HomemenuPat";
import HomemenuasidePat from "../../components/HomepagePat/HomemenuasidePat";
import Cereconf from "../../assets/icons/cereconf.png"
import AddButton from "../../components/Homepage/AddButton";
import { useEffect, useState } from "react";
import AvaliationModal from "../../components/HomepagePat/AvaliationModal";
import MessagePad from "../../components/General/MessagePad";
import AvaliationWidget from "../../components/HomepagePat/AvaliationWidget";
import { useTranslation } from "react-i18next";
import { findAvaliation } from "../../services/api";

export default function HomepagePat(){
    const {t} = useTranslation()
    const [blur, setBlur] = useState(false)
    const [animationSpaw, setAnimationSpaw] = useState("")
    function newAvaliation(){
        setBlur(true)
        setAnimationSpaw("animate-fade animate-duration-[300ms]")
    }

    const [textMessagePad, setTextMessagePad] = useState()
    const [textBtnMessagePad, setTextBtnMessagePad] = useState()
    const [slide, setSlide] = useState()
    const [messageOk, setMessageOk] = useState(false)
    function closeMsgPad(){
        setMessageOk(false)
        window.location.reload()
    }

    const [textObs, setTextObs] = useState()
    const [comentPsi, setComentPsi] = useState()

    const hoje = new Date().toLocaleDateString('pt-BR');
    const [patId, setPatId] = useState(localStorage.getItem("id"))
    const [avaliated, setAvaliated] = useState(false)

    useEffect(()=>{
        async function findOwnAvaliation(){ 
            const response = await findAvaliation(hoje, patId)

            if(response.success == true){
                setAvaliated(true)
            }
        }

        findOwnAvaliation()
    }, [])




    return(
        <div className="min-h-screen flex flex-col">
                {blur && (
                    <>
                        <div
                            className="fixed inset-0 backdrop-blur-sm z-40"
                            onClick={() => setBlur(false)}
                        />
    
                        <div className="fixed inset-0 overflow-y-auto z-100 flex flex-col items-center justify-center pointer-events-none">
                            <div className={`pointer-events-auto my-auto lg:mt-0 mt-70 mb-10 flex flex-col items-center ${animationSpaw} justify-center`}>
                                <AvaliationModal onClose={() => setBlur(false)} 
                                setBlur={setBlur}
                                setMessageOk={setMessageOk}
                                setTextMessagePad={setTextMessagePad}
                                setTextBtnMessagePad={setTextBtnMessagePad} 
                                setSlide={setSlide}/>
                            </div>
                        </div>
                    </>
                )}
                {
                    messageOk &&
                        <div className="absolute h-full w-full inset-0 z-103 bg-black/80 z-10 flex flex-col items-center">
                            <MessagePad Text={textMessagePad} textButton={textBtnMessagePad} OnClickFunction={closeMsgPad} Slide={slide}/>
                        </div>
                }
                    <div className="fixed lg:hidden bottom-0 left-0 z-100 w-full ">
                        <HomemenuPat BgSelectPsi={"bg-quarternario"} />
                    </div>
                    <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%]">
                        <HomemenuasidePat BgSelectPsi={"bg-quarternario"} />
                    </div>

                    {
                        avaliated &&
                            <div className="flex flex-col items-center justify-center mt-20">
                                <AvaliationWidget idPat={patId}/>
                            </div> 
                    }

                    {
                        !avaliated &&
                            <div className="flex flex-col items-center lg:mt-170 mt-70">
                                <h1 className="lg:text-[100px] text-[20px] text-gray-400 font-lexenddeca">{t('avaliacaoDiaria')}</h1>
                                <img src={Cereconf} className="lg:h-[600px] h-[100px] grayscale-[50%] opacity-50 lg:mt-40 mt-10"/>
                            </div> 
                    }

                    {
                        !avaliated &&
                            <div className="fixed  bottom-[120px] lg:right-30 right-4 ">
                                <AddButton Label={t('avaliarEmocoes')} Simbol={"+"} onClickFunction={newAvaliation}/>
                            </div>
                    }


        </div>
    )
}