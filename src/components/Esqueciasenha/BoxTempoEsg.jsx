import ampulheta from "../../assets/icons/ampulheta.png"
import Button from "../General/Button"
import { useNavigate } from "react-router-dom";

export default function BoxTempoEsg({Style}){

    const navigator = useNavigate();
    function goToBegin(){
        navigator("/esqueceuasenha")
    }
    return(
        <div className="flex flex-col items-center animate-fade-left mt-20 bg-secundario rounded-[30px] lg:rounded-[100px] w-[80%] min-w-[80%] h-[420px] lg:h-[1200px]">
            <h1 className="font-lexenddeca color-quarternario text-[25px] lg:text-[70px] mt-4 lg:mt-15">Tempo esgotado.</h1>
            <img src={ampulheta} className="lg:w-[600px] w-200px]"/>
            <p className="font-lexenddeca color-quarternario text-[12px] lg:text-[40px] text-center w-[270px] lg:w-[670px] lg:mt-18 mt-8">O tempo para a confirmação do código foi esgotado. Clique no botão abaixo para reiniciar o procedimento.</p>
            <Button Style={"w-[50%] lg:w-[40%] bg-terciario color-terciario min-w-[130px] min-h-[60px] lg:h-[170px] rounded-[15px] lg:rounded-[30px] font-lexenddeca text-[15px] lg:text-[40px] hover:bg-white mt-8 transition duration-300 ease-in-out"} Text={"Voltar ao início"} OnClickFunction={goToBegin}/>
                
        </div>
    )

}