import AddButton from "../../components/Homepage/AddButton";
import Homeheader from "../../components/Homepage/Homeheader";
import Homemenu from "../../components/Homepage/Homemenu";

export default function Homepage(){
    return(
        <div className="min-h-screen flex flex-col">
            <Homeheader/>

            <div className="flex-1">
                <div className="fixed bottom-30 right-4 z-50">
                    <AddButton/>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full z-50">
                <Homemenu BgSelectPsi={"bg-terciario"} />
            </div>
        </div>
    )
}