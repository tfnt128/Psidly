import HPerson from "../../assets/bg-images/pessoahappy.jpg"
import Animation from "../Animations/AnimationOptions"
import ShareAnim from "../../assets/animations/Share.json"
import { Navigate } from "react-router-dom"

export default function Share({Style}){

    function sharing(){
        if(navigator.share){
            navigator.share({
                title: "Psidly",
                text: "Conheça Psidly e melhore seu atendimento psicológico!",
                url: window.location.origin
            })
        }else {
            navigator.clipboard.writeText(window.location.origin)
            alert("Link copiado!")
        }
    }

    return(
        <div className={`${Style} flex flex-row items-center group cursor-pointer hover:shadow-[0_0_220px_rgba(154,200,255,0.6)] transition duration-300 `}
        onClick={sharing}>
            <div className="relative h-full w-[50%]">
                <img src={HPerson} className="h-full w-full rounded-l-[20px] lg:rounded-l-[30px] object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-300 rounded-l-[30px]"/>
            </div>
            <div className="lg:h-full lg:w-[50%] w-[50%] h-full flex flex-col items-center mt-20 lg:mt-40">
                <h1 className="w-full text-[15px] text-center lg:text-[70px] font-aboreto  ">Compartilhe o Psidly</h1>
                <Animation AnimationOpt={ShareAnim} Style={"lg:w-[300px] w-[40px] mt-[50px]"}/>
            </div>
        </div>
    )
}