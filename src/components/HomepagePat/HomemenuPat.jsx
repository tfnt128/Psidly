import simbperfil from "../../assets/icons/simbperfil.png"
import Psico from "../../assets/icons/simbpsico.png"
import { useNavigate } from "react-router-dom";
import Button from "../General/Button";


export default function HomemenuPat({BgSelectPsi, BgSelectPerfil}){

    const navigator = useNavigate();
    function goToHomePage(){
        navigator("/homepagepatient")
    }

    function gotToProfilePage(){
        navigator("/profilepagepat")
    }

    return(
        <div className="bg-secundario w-full flex flex-row h-[90px]  mb-0">
            <Button Style={`h-full w-[50.3%]  flex ${BgSelectPsi} justify-center items-center`} Src={Psico} ImgStyle={"w-[45px]"} OnClickFunction={goToHomePage}/>
            <Button Style={`h-full w-[50.3%] flex justify-center items-center ${BgSelectPerfil} `} Src={simbperfil} ImgStyle={"w-[65px]"} OnClickFunction={gotToProfilePage}/>
        </div>
    )
}