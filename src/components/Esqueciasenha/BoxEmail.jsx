import Input from "../General/Input"
import Button from "../General/Button"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postEmailEsqueciSenha } from "../../services/api";
import LoadingCircle from "../../components/Animations/LoadingCircle";


export default function BoxEmail({Style, setBgOkay, setResponseEmail}){

    const navigator = useNavigate();
    function goToCode(){
        navigator("/esqueceuasenhacodigo")
    }

    const [email, setEmail] = useState("");


    
    const handleEmail = async () => {

        
        try {
            setStandState(true);
            const response = await postEmailEsqueciSenha(email);
            

            if(response.success == true){
                localStorage.setItem("email", email)
                console.log("entrou no true") //debug
                setBgOkay("bg-terciario");

                goToCode();
            } else {
                console.log(" Falha na requisição"); //debug
                setBgOkay("bg-alertbox");
                setResponseEmail(response.message);
            }

        } catch (err) {
            console.log("Erro capturado:", err); //debug
        }
    }
    
    const handleVoltar = ()=>{ 
        navigator("/login") 
    }

    const [standState, setStandState] = useState(false);

    return(
        <div className="flex flex-col items-center animate-fade-left mt-20 bg-terciario rounded-[30px] lg:rounded-[100px] w-[80%] min-w-[80%] h-[420px] lg:h-[1200px]">
            {
                standState &&
                    <div className="absolute inset-0 bg-black/90 rounded-[30px] lg:rounded-[80px] z-10 flex flex-col items-center">
                        <LoadingCircle/>
                    </div>
            }

            <h1 className="font-lexenddeca color-terciario text-[25px] lg:text-[70px] mt-4 lg:mt-15">Esqueceu sua senha?</h1>
            <p className="font-lexenddeca color-terciario text-[12px] lg:text-[40px] text-center w-[270px] lg:w-[670px] lg:mt-18 mt-8">Um e-mail de confirmação será enviado ao seu e-mail antes da redefinição de senha. Para isso, insira seu e-mail abaixo.</p>

            <Input Style={"w-[80%] outline-none bg-primario p-[15px]  lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[50px] placeholder:font-lexenddeca mt-20 lg:mt-[250px]"} 
                PlaceHolder={'Insira seu e-mail'} 
                Type={"email"}
                value={email}
                setValue={setEmail}/>
            <div className=" w-full flex flex-row items-center justify-center gap-3">
                <Button 
                    Style={"w-[30%] mt-8 lg:mt-10 bg-alertbox color-secundario min-w-[130px] min-h-[60px] lg:h-[170px] rounded-[15px] lg:rounded-[30px] font-lexenddeca text-[15px] lg:text-[40px] hover:bg-red-400 hover:color-primario transition duration-300 ease-in-out"} 
                    Text={"Voltar"} 
                    OnClickFunction={handleVoltar}
                />
                <Button Style={"w-[35%] lg:w-[30%] bg-secundario color-quarternario min-w-[130px] min-h-[60px] lg:h-[170px] rounded-[15px] lg:rounded-[30px] font-lexenddeca text-[15px] lg:text-[40px] hover:bg-white mt-8 transition duration-300 ease-in-out"} Text={"Enviar código"} OnClickFunction={handleEmail}/>

            </div>

        </div>
    )

}