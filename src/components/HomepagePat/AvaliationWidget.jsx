import { useState } from "react"
import StarAvaliation from "./StarsAvaliation"
import Button from "../General/Button";
import LoadingCircle from "../Animations/LoadingCircle";
import StarAvaliated from "./StarsAvaliated";

export default function AvaliationWidget({Style}){

    const hoje = new Date().toLocaleDateString('pt-BR');

    const [alegria, setAlegria] = useState(2)
    const [tristeza, setTristeza] = useState(3)
    const [raiva, setRaiva] = useState(5)
    const [ansiedade, setAnsiedade] = useState(4)
    const [estresse, setEstresse] = useState(1)

    const [textObs, setTextObs] = useState("Você não fez observações")
    const [comentPsi, setComentPsi] = useState("Sem comentários por enquanto.")

    return(
        <div className={`relative lg:mt-20 bg-quarternario h-auto py-10 lg:py-20 lg:p-50 lg:w-[2500px] w-[350px] mt-[-30px] flex flex-col mb-30 lg:flex-row items-center lg:rounded-[150px] rounded-[30px] ${Style}`}>

            <div className="flex flex-col items-center lg:mr-10 ">
                <h1 className="font-aboreto text-[17px] color-quarternario lg:w-full w-[80%] lg:text-[57px] lg:mr-15  w-[120%] lg:mt-[-80px] text-center ">Sua avaliação de hoje ({hoje})</h1>

                <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[58px] mt-10 lg:mt-30 mb-[-15px] lg:mb-[-65px]">Alegria</h1>
                <StarAvaliated Style={"text-[50px] lg:text-[170px]"} starQtde={alegria}/>

                <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[58px] mt-5 mb-[-15px] lg:mb-[-65px]">Tristeza</h1>
                <StarAvaliated Style={"text-[50px] lg:text-[170px]"} starQtde={tristeza}/>

                <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[58px] mt-5 mb-[-15px] lg:mb-[-65px]">Raiva</h1>
                <StarAvaliated Style={"text-[50px] lg:text-[170px]"} starQtde={raiva}/>

                <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[58px] mt-5 mb-[-15px] lg:mb-[-65px]">Ansiedade</h1>
                <StarAvaliated Style={"text-[50px] lg:text-[170px]"} starQtde={ansiedade}/>

                <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[58px] mt-5 mb-[-15px] lg:mb-[-65px]">Estresse</h1>
                <StarAvaliated Style={"text-[50px] lg:text-[170px]"} starQtde={estresse}/>
            </div>
            <div className="w-[300px] lg:w-[4px] h-[2px] shrink-0 mt-10 lg:ml-30 lg:mt-0 lg:h-[2000px] lg:ml-10 bg-white/40 mx-4 lg:mx-20 rounded-full"/>

            <div className="flex flex-col items-center lg:ml-35 lg:mr-[-30px] gap-1 lg:gap-12">
                <div className="flex flex-col items-center">
                    <h1 className="font-aboreto color-quarternario text-[18px] lg:text-[58px] mt-10 lg:mb-10 lg:mt-[-20px] mb-[-15px] ">Suas observações</h1>
                    <textarea className="w-[300px] lg:h-[900px] lg:w-[900px] h-[300px] lg:text-[40px] lg:mt-0 mt-10 lg:p-5 text-[15px] bg-blue-200 rounded-[20px] lg:rounded-[50px] outline-none font-lexenddeca p-3 " maxLength={300}
                    placeholder={textObs}
                    readOnly={true}/> 
                    {/* <div className="flex flex-row gap-4 mt-10 ">
                        <Button Style={"w-[140px] lg:w-[370px] h-[50px] lg:h-[160px] bg-terciario text-[12px] lg:text-[40px] font-aboreto color-secundario lg:mt-5 rounded-[10px] lg:rounded-[30px] hover:bg-white hover:text-black  hover:transition-all duration-400 ease-in-out"} Text={"Enviar"} OnClickFunction={handleAvaliation}/>
                        <Button Style={"w-[140px] lg:w-[370px] lg:h-[160px] h-[50px] bg-alertbox text-[12px] lg:text-[40px] font-aboreto color-secundario lg:mt-5 rounded-[10px] lg:rounded-[30px] hover:bg-white hover:text-black  hover:transition-all duration-400 ease-in-out"} Text={"Cancelar"} OnClickFunction={cancel}/>

                    </div>                */}
                </div>
                <div className="flex flex-col items-center mt-10">
                    <h1 className="font-aboreto color-quarternario text-[18px] lg:text-[58px] mt-10 lg:mb-10 lg:mt-[-20px] mb-[-15px] ">Comentário do Psicólogo</h1>
                    <textarea className="w-[300px] lg:h-[600px]  lg:w-[900px] h-[300px] lg:text-[40px] lg:mt-0 mt-10 lg:p-5 text-[15px] bg-blue-200 rounded-[20px] lg:rounded-[50px] outline-none font-lexenddeca p-3 " maxLength={300}
                    placeholder={comentPsi}
                    readOnly={true}/> 
                    {/* <div className="flex flex-row gap-4 mt-10 ">
                        <Button Style={"w-[140px] lg:w-[370px] h-[50px] lg:h-[160px] bg-terciario text-[12px] lg:text-[40px] font-aboreto color-secundario lg:mt-5 rounded-[10px] lg:rounded-[30px] hover:bg-white hover:text-black  hover:transition-all duration-400 ease-in-out"} Text={"Enviar"} OnClickFunction={handleAvaliation}/>
                        <Button Style={"w-[140px] lg:w-[370px] lg:h-[160px] h-[50px] bg-alertbox text-[12px] lg:text-[40px] font-aboreto color-secundario lg:mt-5 rounded-[10px] lg:rounded-[30px] hover:bg-white hover:text-black  hover:transition-all duration-400 ease-in-out"} Text={"Cancelar"} OnClickFunction={cancel}/>

                    </div>                */}
                </div>
            </div>


            
        </div>
    )

}