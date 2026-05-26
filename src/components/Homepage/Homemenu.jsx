import Button from "../General/Button";
import Psico from "../../assets/icons/simbpsico.png"
import SimbGraph from "../../assets/icons/simbgraph.png"
import simbperfil from "../../assets/icons/simbperfil.png"
import { useNavigate } from "react-router-dom";
import LogoutImg from "../../assets/icons/logout.png"

export default function Homemenu({BgSelectPsi, BgSelectPerfil, BgSelectGraph}){

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
        <div className="bg-secundario w-full flex flex-row h-[90px]  mb-0">
            <Button Style={`h-full w-[25%]  flex ${BgSelectPsi} justify-center items-center`} Src={Psico} ImgStyle={"w-[45px]"} OnClickFunction={goToHomePage}/>
            <Button Style={`h-full w-[25%] flex justify-center items-center ${BgSelectGraph} mb-30`} Src={SimbGraph} ImgStyle={"w-[45px]"} OnClickFunction={goToGraphicsPage}/>
            <Button Style={`h-full w-[25%] flex justify-center items-center ${BgSelectPerfil} `} Src={simbperfil} ImgStyle={"w-[65px]"} OnClickFunction={gotToProfilePage}/>
            <Button Style={`h-full w-[25%] flex justify-center items-center ${BgSelectGraph} mb-30`} Src={LogoutImg} ImgStyle={"w-[45px]"} OnClickFunction={logout}/>

        </div>
    )
}