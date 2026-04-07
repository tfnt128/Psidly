import Homemenu from "../../components/Homepage/Homemenu";
import HomemenuPat from "../../components/HomepagePat/HomemenuPat";
import HomemenuasidePat from "../../components/HomepagePat/HomemenuasidePat";


export default function HomepagePat(){

    return(
        <div className="min-h-screen flex flex-col">
                    <div className="fixed lg:hidden bottom-0 left-0 w-full ">
                        <HomemenuPat BgSelectPsi={"bg-quarternario"} />
                    </div>
                    <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%]">
                        <HomemenuasidePat BgSelectPsi={"bg-quarternario"} />
                    </div>
        </div>
    )
}