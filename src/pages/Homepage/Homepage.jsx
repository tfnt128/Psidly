
import { useState } from "react";
import AddButton from "../../components/Homepage/AddButton";
import Homeheader from "../../components/Homepage/Homeheader";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";
import NewPatient from "../../components/Homepage/NewPatient";

export default function Homepage(){

    const [screenBlur, setScreenBlur] = useState(false)
    const [animationSpaw, setAnimationSpaw] = useState("")
    function openNewPatientModal(){
        setScreenBlur(true)
        setAnimationSpaw("animate-fade animate-duration-[300ms]")
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
                            <NewPatient onClose={() => setScreenBlur(false)} />
                        </div>
                    </div>
                </>
            )}

            <div className="fixed  bottom-[120px] lg:right-30 right-4 ">
                <AddButton onClickFunction={openNewPatientModal}/>
            </div>

            <div className="fixed lg:hidden bottom-0 left-0 w-full ">
                <Homemenu BgSelectPsi={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%] ">
                <Homemenuaside BgSelectPsi={"bg-quarternario"} />
            </div>
        </div>
    )
}
