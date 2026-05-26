import Button from "../General/Button"
import Psico from "../../assets/icons/simbpsico.png"
import SimbGraph from "../../assets/icons/simbgraph.png"
import simbperfil from "../../assets/icons/simbperfil.png"
import { useNavigate } from "react-router-dom";
import LogoutImg from "../../assets/icons/logout.png"

export default function Homemenuaside({BgSelectGraph, BgSelectPerfil, BgSelectPsi}){


    const navigator = useNavigate();
    function goToHomePage(){
        navigator("/homepage")
    }

    function goToGraphicsPage(){
        navigator("/graphicspage")
    }

    function gotToProfilePage(){
        navigator("/profilepage")
    }

    
    function logout()
    {
        navigator("/")
        localStorage.clear()
    }


    return(

            <div className="bg-secundario flex flex-col h-full w-full">
                <Button Style={`w-full h-[70%] flex ${BgSelectPsi} justify-center items-center ease-in-out transition hover:bg-blue-200 hover:duration-300`} Src={Psico} ImgStyle={"w-[105px]"} OnClickFunction={goToHomePage} />
                <Button Style={`w-full h-[70%] flex justify-center items-center ease-in-out transition hover:bg-blue-200 hover:duration-300 ${BgSelectGraph}`} Src={SimbGraph} ImgStyle={"w-[105px]"} OnClickFunction={goToGraphicsPage} />
                <Button Style={`w-full h-full mt-[150%] flex justify-center items-center ease-in-out transition hover:bg-blue-200 hover:duration-300 ${BgSelectPerfil}`} Src={simbperfil} ImgStyle={"w-[145px]"}  OnClickFunction={gotToProfilePage} />
                <Button Style={`w-full h-full mt-[0%] flex justify-center items-center ease-in-out transition hover:bg-blue-200 hover:duration-300`} Src={LogoutImg} ImgStyle={"w-[45px]"} OnClickFunction={logout}/>
                
            </div>

    )
}