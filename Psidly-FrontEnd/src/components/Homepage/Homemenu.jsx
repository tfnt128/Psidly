import Button from "../General/Button";
import Psico from "../../assets/icons/simbpsico.png"
import SimbGraph from "../../assets/icons/simbgraph.png"
import simbperfil from "../../assets/icons/simbperfil.png"
import { useNavigate } from "react-router-dom";

export default function Homemenu({BgSelectPsi, BgSelectPerfil, BgSelectGraph}){

    const navigator = useNavigate();
    function goToHomePage(){
        navigator("/homepage")
    }

    return(
        <div className="bg-secundario w-full flex flex-row h-[90px] mb-0">
            <Button Style={`h-full w-[33.3%] bg-terciario flex ${BgSelectPsi} justify-center items-center`} Src={Psico} ImgStyle={"w-[45px]"} OnClickFunction={goToHomePage}/>
            <Button Style={`h-full w-[33.3%] flex justify-center items-center ${BgSelectGraph}`} Src={SimbGraph} ImgStyle={"w-[45px]"}/>
            <Button Style={`h-full w-[33.3%] flex justify-center items-center ${BgSelectPerfil}`} Src={simbperfil} ImgStyle={"w-[65px]"}/>
        </div>
    )
}