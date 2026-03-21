
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

export default function Homepage(){

    const [screenBlur, setScreenBlur] = useState(false)
    const [animationSpaw, setAnimationSpaw] = useState("")
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

            <div className="flex flex-col gap-10 mb-[120px] items-center mt-20 lg:grid lg:grid-cols-6 lg:gap-1 lg:mt-60 lg:w-[90%]  lg:items-center lg:ml-300">
                <PatientWidget/>
                <PatientWidget/>
                <PatientWidget/>
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
