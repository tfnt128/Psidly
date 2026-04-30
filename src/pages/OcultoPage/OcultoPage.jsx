import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";
import Tyler from "../../assets/icons/tyler.jpg"
import PatientWidget from "../../components/Homepage/PatientWidget";
import { useState } from "react";
import PatientDetails from "../../components/Homepage/PatientDetails";
import OcultPatientDetails from "../../components/OcultoPage/OcultPatientDetails";

export default function OcultoPage(){
    const [screenBlurPD, setScreenBlurPD] = useState(false)
    const [animationSpaw, setAnimationSpaw] = useState("")

    function openPatientDetails(){
        setScreenBlurPD(true)
        setAnimationSpaw("animate-fade animate-duration-[300ms]")
    }


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
                            <OcultPatientDetails Style={"min-h-[550px] lg:min-h-[1900px] lg:w-[1500px] w-[300px]"}/>
                        </div>
                    </div>
                </>
            )}
            <div className="fixed lg:hidden bottom-0 left-0 w-full z-50">
                <Homemenu BgSelectPerfil={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%] z-50">
                <Homemenuaside BgSelectPerfil={"bg-quarternario"} />
            </div>
            <div className="flex flex-col items-center mt-10 lg:mt-20">
                <h1 className="font-aboreto text-[20px] lg:text-[70px] color-quarternario">Pacientes Ocultos</h1>
            </div>
            <div className="flex flex-col gap-10 mb-[120px] items-center mt-20 lg:grid lg:grid-cols-4 lg:gap-x-0 lg:gap-y-30 lg:gap-1 lg:mt-60 lg:w-[60%]  lg:items-center lg:ml-200">
                <PatientWidget ProfilePhoto={Tyler} Nome={"Tyler"} Idade={"40"} Style={"grayscale-100"} OnClickFunction={openPatientDetails}/>
            </div>
        </div>
    )
}
