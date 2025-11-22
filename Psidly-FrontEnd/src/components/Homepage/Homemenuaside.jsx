import Button from "../General/Button"
import Psico from "../../assets/icons/simbpsico.png"
import SimbGraph from "../../assets/icons/simbgraph.png"
import simbperfil from "../../assets/icons/simbperfil.png"
import { useNavigate } from "react-router-dom";

export default function Homemenuaside({BgSelectGraph, BgSelectPerfil, BgSelectPsi}){


    const navigator = useNavigate();
    function goToHomePage(){
        navigator("/homepage")
    }

    function goToGraphicsPage(){
        navigator("/graphicspage")
    }

    return(

            <div className="bg-secundario flex flex-col h-full w-full">
                <Button Style={`w-full h-[20%] flex ${BgSelectPsi} justify-center items-center`} Src={Psico} ImgStyle={"w-[105px]"} OnClickFunction={goToHomePage} />
                <Button Style={`w-full h-[20%] flex justify-center items-center ${BgSelectGraph}`} Src={SimbGraph} ImgStyle={"w-[105px]"} OnClickFunction={goToGraphicsPage} />
                <Button Style={`w-full h-[20%] mt-[170%] flex justify-center items-center ${BgSelectPerfil}`} Src={simbperfil} ImgStyle={"w-[145px]"} />
            </div>

    )
}