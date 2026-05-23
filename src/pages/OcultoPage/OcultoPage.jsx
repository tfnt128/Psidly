import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";
import PatientWidget from "../../components/Homepage/PatientWidget";
import { useEffect, useState } from "react";
import PatientDetails from "../../components/Homepage/PatientDetails";
import OcultPatientDetails from "../../components/OcultoPage/OcultPatientDetails";
import { useTranslation } from "react-i18next";
import { listOcultPat } from "../../services/api";
import MessagePad from "../../components/General/MessagePad";

export default function OcultoPage(){
    const [screenBlurPD, setScreenBlurPD] = useState(false)
    const [animationSpaw, setAnimationSpaw] = useState("")

    const {t} = useTranslation()

    function openPatientDetails(id){
        setScreenBlurPD(true)
        setAnimationSpaw("animate-fade animate-duration-[300ms]")
        setPatientId(id)
    }

    
    const [messageOk, setMessageOk] = useState(false)
    const [textMessagePad, setTextMessagePad] = useState()
    const [textBtnMessagePad, setTextBtnMessagePad] = useState()

    const[slide, setSlide] = useState()

    const[patientName, setPatientName] = useState()

    function closeMsgPad(){
        setMessageOk(false)
        location.reload();
    }

    const [patientId, setPatientId] = useState()

    const [ocultPatients, setOcultPatients] = useState([])
    useEffect(()=>{
        async function listOcultPatients(){
            const response = await listOcultPat()
            console.log(response)
            setOcultPatients(response)

        }

        listOcultPatients()
    }, [])


    return(
        <div className="min-h-screen">
            {screenBlurPD && (
                <>
                    <div
                        className="fixed inset-0 backdrop-blur-sm z-40"
                        onClick={() => setScreenBlurPD(false)}
                    />

                    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
                        <div className={`pointer-events-auto flex flex-col items-center ${animationSpaw} justify-center`}>
                            <OcultPatientDetails
                                Style={"..."}
                                PatientId={patientId}
                                setMessageOk={setMessageOk}
                                setText={setTextMessagePad}
                                setTextButton={setTextBtnMessagePad}
                                setScreenBlurPD={setScreenBlurPD}
                            />
                        </div>
                    </div>
                </>
            )}
            {
                messageOk &&
                    <div className="absolute h-full w-full inset-0 bg-black/80 z-100 flex flex-col items-center">
                        <MessagePad Text={textMessagePad} textButton={textBtnMessagePad} OnClickFunction={closeMsgPad} Slide={slide}/>
                    </div>
            }
            <div className="fixed lg:hidden bottom-0 left-0 w-full z-50">
                <Homemenu BgSelectPerfil={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%] z-50">
                <Homemenuaside BgSelectPerfil={"bg-quarternario"} />
            </div>
            <div className="flex flex-col items-center mt-10 lg:mt-20">
                <h1 className="font-aboreto text-[20px] lg:text-[70px] color-quarternario">{t('pacientesOcultos')}</h1>
            </div>
            <div className="flex flex-col gap-10 mb-[160px] items-center mt-20 lg:grid lg:grid-cols-4 lg:gap-x-0 lg:gap-y-30 lg:gap-1 lg:mt-60 lg:w-[60%]  lg:items-center lg:ml-200">
                {
                    ocultPatients.map(ocultPatient=>(
                        <div key={ocultPatient.id} className="w-full flex flex-col items-center">
                            <PatientWidget Nome={ocultPatient.name} Idade={ocultPatient.age} ProfilePhoto={ocultPatient.photo} Style={"grayscale-100"}
                            OnClickFunction={() => openPatientDetails(ocultPatient.id)}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
