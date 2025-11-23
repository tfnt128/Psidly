import Input from "../General/Input"
import Button from "../General/Button"
import { useNavigate } from "react-router-dom";
import { postConfirmarSenha } from "../../services/api";
import { useState } from "react";

export default function BoxConfirmar({Style, Okay, Error, MnsgOkay, MnsgError, setOkay, setError}){

    const navigator = useNavigate();
    function goToHome(){
        setOkay(true)
        const timer = setTimeout(()=>{
            navigator("/")
        }, 5000)
        return ()=> clearTimeout(timer);
    }

    const [senha, setSenha] = useState("");
    const [senhaConfirmada, setSenhaConfirmada] = useState("");

    const handleSenhaConfirmada = async () =>{
        try {
            const response = await postConfirmarSenha(senha, senhaConfirmada);
            if(response == true){
                goToHome();
            }
            
        } catch (err) {
            console.log(err);
        }
    }

    return(
        
        <div className="flex flex-col items-center animate-fade-left mt-10 bg-terciario rounded-[30px] lg:rounded-[100px] w-[80%] min-w-[80%] h-[420px] lg:h-[1200px]">
            <h1 className="font-lexenddeca color-terciario text-[25px] lg:text-[70px] mt-4 lg:mt-15">Redefinir senha</h1>
            <p className="font-lexenddeca color-terciario text-[12px] lg:text-[40px] text-center w-[270px] lg:w-[670px] lg:mt-18 mt-8">Agora você pode redefinir sua senha. Insira a nova senha abaixo e confirme. Após isso, você será redirecionado para a tela inicial.</p>

            <Input Style={"w-[80%] outline-none bg-primario p-[15px]  lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[50px] placeholder:font-lexenddeca mt-15 lg:mt-[120px]"} 
                PlaceHolder={'Insira a nova senha'} 
                Type={"password"}
                value={senha}
                setValue={setSenha}/>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px]  lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[50px] placeholder:font-lexenddeca mt-3 lg:mt-[20px]"} 
                PlaceHolder={'Confirme a nova senha'} 
                Type={"password"}
                value={senhaConfirmada}
                setValue={setSenhaConfirmada}/>
            <Button Style={"w-[50%] lg:w-[40%] bg-secundario color-quarternario min-w-[130px] min-h-[60px] lg:h-[170px] rounded-[15px] lg:rounded-[30px] font-lexenddeca text-[15px] lg:text-[40px] hover:bg-white mt-8 transition duration-300 ease-in-out"} Text={"Redefinir"} OnClickFunction={handleSenhaConfirmada}/>

                
        </div>
    )

}