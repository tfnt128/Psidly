
import { useState } from "react";
import AddButton from "../../components/Homepage/AddButton";
import Homeheader from "../../components/Homepage/Homeheader";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";

export default function Homepage(){

    const [screenBlur, setScreenBlur] = useState(false)
    function openNewPatientModal(){
        setScreenBlur(true)
    }

    return(
        
        <div className="min-h-screen flex flex-col">
            {
                screenBlur &&
                    <div className="fixed inset-0 backdrop-blur-sm z-40 min-h-screen min-w-screen"
                    onClick={()=>setScreenBlur(false)}>


                    </div>
            }
            <Homeheader/>

            <div className="fixed  bottom-[120px] lg:right-30 right-4 ">
                <AddButton onClickFunction={openNewPatientModal}/>
            </div>

            <div className="fixed lg:hidden bottom-0 left-0 w-full ">
                <Homemenu BgSelectPsi={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-[calc(100vh-300px)] w-[10%] ">
                <Homemenuaside BgSelectPsi={"bg-quarternario"} />
            </div>
        </div>
    )
}
