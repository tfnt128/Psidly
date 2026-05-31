
import { useEffect, useState } from "react";
import AddButton from "../../components/Homepage/AddButton";
import Homeheader from "../../components/Homepage/Homeheader";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";
import NewPatient from "../../components/Homepage/NewPatient";
import MessagePad from "../../components/General/MessagePad";
import Cereconf from "../../assets/icons/cereconf.png"
import Input from "../../components/General/Input";
import PatientWidget from "../../components/Homepage/PatientWidget";
import PatientDetails from "../../components/Homepage/PatientDetails";
import ProfilePhoto from "../../assets/icons/dudaaraujo.jpg"
import SabCap from "../../assets/icons/sabcap.jpg"
import Megan from "../../assets/icons/meganfox.jpg"
import EmmaW from "../../assets/icons/emma.jpg"
import EmmaS from "../../assets/icons/emmast.jpg"
import TerryC from "../../assets/icons/terry.jpg"
import { useTranslation } from 'react-i18next';
import { listPatient, searchPatient } from "../../services/api";


export default function Homepage(){

    const { t } = useTranslation();


    const [screenBlur, setScreenBlur] = useState(false)
    const [screenBlurPD, setScreenBlurPD] = useState(false)
    const [animationSpaw, setAnimationSpaw] = useState("")
    const [patients, setPatients] = useState([])
    const [patientId, setPatientId] = useState()
    useEffect( ()=>{
        async function listing(){
            try {
                const id = localStorage.getItem("id")
                const response = await listPatient(id)
                console.log(response)
                setPatients(response)
            } catch (err) {
                console.log(err)
            }
        }
        listing()
    }, [])

    function openPatientDetails(id){
        setScreenBlurPD(true)
        setAnimationSpaw("animate-fade animate-duration-[300ms]")
        setPatientId(id)
    }

    function openNewPatientModal(){
        setScreenBlur(true)
        setAnimationSpaw("animate-fade animate-duration-[300ms]")
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

    async function handlePesquisar(){
        if(!patientName)
        {
            const id = localStorage.getItem("id")
            const response = await listPatient(id)
            console.log(response)
            setPatients(response)
        }
        try {
            console.log(patientName.toUpperCase())
            const response = await searchPatient(patientName.toUpperCase())
            console.log("resultado busca:", response)
            setPatients(Array.isArray(response) ? response : [])   
        } catch (err) {
            console.log(err)
        }
    }

    return(
        
        <div className="min-h-screen flex flex-col">
            {screenBlur && (
                <>
                    <div
                        className="fixed inset-0 backdrop-blur-sm z-40"
                        onClick={() => setScreenBlur(false)}
                    />

                    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
                        <div className={`pointer-events-auto flex flex-col items-center ${animationSpaw} justify-center`}>
                            <NewPatient onClose={() => setScreenBlur(false)} 
                                setMessageOk={setMessageOk}
                                setTextMessagePad={setTextMessagePad}
                                setTextBtnMessagePad={setTextBtnMessagePad} 
                                setScreenBlur={setScreenBlur}
                                setSlide={setSlide}/>
                        </div>
                    </div>
                </>
            )}
            {screenBlurPD && (
                <>
                    <div
                        className="fixed inset-0 backdrop-blur-sm z-40"
                        onClick={() => setScreenBlurPD(false)}
                    />

                    <div className="fixed inset-0 z-50 overflow-y-auto pointer-events-none">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div className={`pointer-events-auto flex flex-col items-center ${animationSpaw} justify-center w-full`}>
                                <PatientDetails Style={"min-h-[650px] lg:min-h-[2000px] lg:w-[4000px] w-[350px]"} PatientId={patientId}
                                messageOk={messageOk}
                                setMessageOk={setMessageOk}
                                Text={textMessagePad} 
                                textButton={textBtnMessagePad}
                                setText={setTextMessagePad}
                                setTextButton={setTextBtnMessagePad}
                                setScreenBlurPD={setScreenBlurPD}/>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {
                messageOk &&
                    <div className="absolute h-full w-full inset-0 bg-black/80 z-10 flex flex-col items-center">
                        <MessagePad Text={textMessagePad} textButton={textBtnMessagePad} OnClickFunction={closeMsgPad} Slide={slide}/>
                    </div>
            }
            <div className="flex flex-col items-center mt-4">
                <div className="relative w-[90%] lg:w-[40%]">
                    <Input 
                        Style={"w-full h-[80px] lg:h-[200px] lg:rounded-[80px] bg-gray-300 p-10 pr-14 lg:text-[50px] rounded-[30px] placeholder:p-10"} 
                        PlaceHolder={t('pesquisar')}
                        value={patientName}
                        setValue={setPatientName}
                        onEnter={handlePesquisar}
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[20px] lg:text-[50px] grayscale-[50%] pointer-events-none">
                        🔍
                    </span>
            </div>
            </div>

            <div className="flex flex-col gap-10 mb-[120px] items-center mt-20 lg:grid lg:grid-cols-4 lg:gap-x-0 lg:gap-y-30 lg:mt-60 lg:w-[60%] lg:items-center lg:ml-300">
                {
                    patients.map(patient =>(
                        <div key={patient.id} className="w-full flex flex-col items-center">
                            <PatientWidget Nome={patient.name} ProfilePhoto={patient.photo} Idade={patient.age} OnClickFunction={() => openPatientDetails(patient.id)}/>
                        </div>
                    ))
                }

            </div>
            {
                patients.length <= 0 && 
                <div className="flex flex-col items-center lg:mt-120 mt-10">
                    <h1 className="lg:text-[100px] text-[20px] text-gray-400 font-lexenddeca">Ainda não há pacientes por aqui...</h1>
                    <img src={Cereconf} className="lg:h-[600px] h-[100px] grayscale-[50%] opacity-50 lg:mt-40 mt-10"/>
                </div> 

            }

            <div className="fixed  bottom-[120px] lg:right-30 right-4 ">
                <AddButton onClickFunction={openNewPatientModal} Label={t('adicionarPaciente')} Simbol={"+"}/>
            </div>

            <div className="fixed lg:hidden bottom-0 left-0 w-full ">
                <Homemenu BgSelectPsi={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%]">
                <Homemenuaside BgSelectPsi={"bg-quarternario"}  />
            </div>
        </div>
    )
}
