import AddButton from "../../components/Homepage/AddButton";
import Homeheader from "../../components/Homepage/Homeheader";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";

export default function Homepage(){
    return(
        <div className="min-h-screen flex flex-col">
            <Homeheader/>

            <div className="flex-1">
                <div className="fixed bottom-30 right-4 ">
                    <AddButton/>
                </div>
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