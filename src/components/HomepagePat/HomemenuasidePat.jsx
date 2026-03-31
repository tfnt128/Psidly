import simbperfil from "../../assets/icons/simbperfil.png"
import Psico from "../../assets/icons/simbpsico.png"
import { useNavigate } from "react-router-dom";
import Button from "../General/Button";

export default function HomemenuasidePat({BgSelectPerfil, BgSelectPsi}){
    const navigator = useNavigate();
    function goToHomePage(){
        navigator("/homepagepatient")
    }

    // function goToGraphicsPage(){
    //     navigator("/graphicspage")
    // }

    function gotToProfilePage(){
        navigator("/profilepage")
    }

    return(

            <div className="bg-secundario flex flex-col h-full w-full">
                <Button Style={`w-full h-[140%] flex ${BgSelectPsi} justify-center items-center ease-in-out transition hover:bg-blue-200 hover:duration-300`} Src={Psico} ImgStyle={"w-[105px]"} OnClickFunction={goToHomePage} />
                <Button Style={`w-full h-full mt-[170%] flex justify-center items-center ease-in-out transition hover:bg-blue-200 hover:duration-300 ${BgSelectPerfil}`} Src={simbperfil} ImgStyle={"w-[145px]"}   />
            </div>

    )
}