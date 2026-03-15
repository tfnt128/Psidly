import AddButton from "../../components/Homepage/AddButton";
import Homeheader from "../../components/Homepage/Homeheader";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";

export default function Graphicspage(){
    return(
        <div className="min-h-screen flex flex-col">

            <div className="fixed lg:hidden bottom-0 left-0 w-full z-50">
                <Homemenu BgSelectGraph={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%] z-50">
                <Homemenuaside BgSelectGraph={"bg-quarternario"} />
            </div>
        </div>
    )
}