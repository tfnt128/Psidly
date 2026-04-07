
import { useState } from "react";
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

export default function Homepage(){

    const [screenBlur, setScreenBlur] = useState(false)
    const [screenBlurPD, setScreenBlurPD] = useState(false)
    const [animationSpaw, setAnimationSpaw] = useState("")

    function openPatientDetails(){
        setScreenBlurPD(true)
        setAnimationSpaw("animate-fade animate-duration-[300ms]")
    }

    function openNewPatientModal(){
        setScreenBlur(true)
        setAnimationSpaw("animate-fade animate-duration-[300ms]")
    }

    const [messageOk, setMessageOk] = useState(false)
    const [textMessagePad, setTextMessagePad] = useState()
    const [textBtnMessagePad, setTextBtnMessagePad] = useState()

    const[slide, setSlide] = useState()

    function closeMsgPad(){
        setMessageOk(false)

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

                    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
                        <div className={`pointer-events-auto flex flex-col items-center ${animationSpaw} justify-center`}>
                            <PatientDetails Style={"min-h-[550px] lg:min-h-[1900px] lg:w-[3000px] w-[350px]"}/>
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
                        PlaceHolder={"Pesquisar"}
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[20px] lg:text-[50px] grayscale-[50%] pointer-events-none">
                        🔍
                    </span>
            </div>
            </div>

            <div className="flex flex-col gap-10 mb-[120px] items-center mt-20 lg:grid lg:grid-cols-4 lg:gap-x-0 lg:gap-y-30 lg:mt-60 lg:w-[60%] lg:items-center lg:ml-300">
                <PatientWidget ProfilePhoto={ProfilePhoto} OnClickFunction={openPatientDetails} Nome={"Duda"} Idade={"20"}/>
                <PatientWidget ProfilePhoto={SabCap} Nome={"Sabrina"} Idade={"28"} />
                <PatientWidget ProfilePhoto={Megan} Nome={"Megan"} Idade={"40"}/>
                <PatientWidget ProfilePhoto={EmmaW} Nome={"Emma"} Idade={"35"}/>
                <PatientWidget ProfilePhoto={EmmaS} Nome={"Emma Stone"} Idade={"37"}/>
                <PatientWidget ProfilePhoto={TerryC} Nome={"Terry"} Idade={"50"}/>
            </div>
            {/* <div className="flex flex-col items-center lg:mt-170 mt-70">
                

                <h1 className="lg:text-[100px] text-[20px] text-gray-400 font-lexenddeca">Ainda não há pacientes por aqui...</h1>
                <img src={Cereconf} className="lg:h-[600px] h-[100px] grayscale-[50%] opacity-50 lg:mt-40 mt-10"/>
            </div> */}

            <div className="fixed  bottom-[120px] lg:right-30 right-4 ">
                <AddButton onClickFunction={openNewPatientModal}/>
            </div>

            <div className="fixed lg:hidden bottom-0 left-0 w-full ">
                <Homemenu BgSelectPsi={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%]">
                <Homemenuaside BgSelectPsi={"bg-quarternario"} />
            </div>
        </div>
    )
}
