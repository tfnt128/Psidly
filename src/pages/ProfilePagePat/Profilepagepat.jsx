import Homemenu from "../../components/Homepage/Homemenu";
import HomemenuPat from "../../components/HomepagePat/HomemenuPat";
import HomemenuasidePat from "../../components/HomepagePat/HomemenuasidePat";
import { useNavigate } from "react-router-dom";

export default function Profilepagepat(){


    return(
        <div>
            <div className="min-h-screen flex flex-col">
                        <div className="fixed lg:hidden bottom-0 left-0 w-full ">
                            <HomemenuPat BgSelectPerfil={"bg-quarternario"}/>
                        </div>
                        <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%]">
                            <HomemenuasidePat BgSelectPerfil={"bg-quarternario"} />
                        </div>
            </div>
        </div>
    )
}