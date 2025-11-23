import Input from "../General/Input"
import Button from "../General/Button"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postEmailEsqueciSenha } from "../../services/api";

export default function BoxEmail({Style}){

    const navigator = useNavigate();
    function goToCode(){
        navigator("/esqueceuasenhacodigo")
    }

    const [email, setEmail] = useState("");
    const handleEmail = async () =>{
        try {
            const response = await postEmailEsqueciSenha(email);

        } catch (err) {
            console.log(err);
        }
    }


    return(
        <div className="flex flex-col items-center animate-fade-left mt-20 bg-terciario rounded-[30px] lg:rounded-[100px] w-[80%] min-w-[80%] h-[420px] lg:h-[1200px]">
            <h1 className="font-lexenddeca color-terciario text-[25px] lg:text-[70px] mt-4 lg:mt-15">Esqueceu sua senha?</h1>
            <p className="font-lexenddeca color-terciario text-[12px] lg:text-[40px] text-center w-[270px] lg:w-[670px] lg:mt-18 mt-8">Um e-mail de confirmação será enviado ao seu e-mail antes da redefinição de senha. Para isso, insira seu e-mail abaixo.</p>

            <Input Style={"w-[80%] outline-none bg-primario p-[15px]  lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[50px] placeholder:font-lexenddeca mt-20 lg:mt-[250px]"} 
                PlaceHolder={'Insira seu e-mail'} 
                Type={"email"}
                value={email}
                setValue={setEmail}/>
            <Button Style={"w-[50%] lg:w-[40%] bg-secundario color-quarternario min-w-[130px] min-h-[60px] lg:h-[170px] rounded-[15px] lg:rounded-[30px] font-lexenddeca text-[15px] lg:text-[40px] hover:bg-white mt-8 transition duration-300 ease-in-out"} Text={"Enviar código"} OnClickFunction={goToCode}/>
                
        </div>
    )

}