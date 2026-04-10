import Homemenu from "../../components/Homepage/Homemenu";
import HomemenuPat from "../../components/HomepagePat/HomemenuPat";
import HomemenuasidePat from "../../components/HomepagePat/HomemenuasidePat";
import Cereconf from "../../assets/icons/cereconf.png"
import AddButton from "../../components/Homepage/AddButton";



export default function HomepagePat(){

    return(
        <div className="min-h-screen flex flex-col">
                    <div className="fixed lg:hidden bottom-0 left-0 w-full ">
                        <HomemenuPat BgSelectPsi={"bg-quarternario"} />
                    </div>
                    <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%]">
                        <HomemenuasidePat BgSelectPsi={"bg-quarternario"} />
                    </div>

                <div className="flex flex-col items-center lg:mt-170 mt-70">
                    <h1 className="lg:text-[100px] text-[20px] text-gray-400 font-lexenddeca">Você ainda não fez sua avaliação diária!</h1>
                    <img src={Cereconf} className="lg:h-[600px] h-[100px] grayscale-[50%] opacity-50 lg:mt-40 mt-10"/>
                </div> 

                <div className="fixed  bottom-[120px] lg:right-30 right-4 ">
                    <AddButton Label={"Avaliar Emoções"} Simbol={"+"}/>
                </div>
        </div>
    )
}