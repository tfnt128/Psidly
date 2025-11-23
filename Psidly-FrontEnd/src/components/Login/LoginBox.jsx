import PessoaCerebro from "../../assets/icons/pessoacerebro.png"
import Input from "../General/Input"
import Button from "../General/Button"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { postLogin } from "../../services/api";

export default function LoginBox(){

    const navigator = useNavigate();
    function goToCadastro(){
        navigator("/cadastro");
    }

    function goToEsqueciSenha(){
        navigator("/esqueceuasenha")
    }

    function goToHomepage(){
        navigator("/homepage")
    }

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = async () =>{
        try {
            const response = await postLogin(email, senha);
            if (response == true){
                goToHomepage();
            }
            
            
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <div className="flex flex-col items-center mt-20 bg-terciario rounded-[30px] lg:rounded-[80px] w-[80%] min-w-[80%] h-[510px] lg:h-[1500px]">
            <h1 className="font-lexenddeca color-terciario text-[20px] lg:text-[50px] mt-4">Login</h1>
            <img src={PessoaCerebro} className="w-[200px] lg:w-[500px] -ml-6 lg:-ml-15 -mt-5"/>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[40px] placeholder:font-lexenddeca"} 
                PlaceHolder={'Insira seu e-mail'} 
                Type={"email"}
                value={email}
                setValue={setEmail}/>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[40px] placeholder:font-lexenddeca mt-[15px] lg:mt-[30px]"} 
                PlaceHolder={'Insira sua senha'} 
                Type={"password"}
                value={senha}
                setValue={setSenha}/>
            <div className="flex flex-row items-start">
                <h2 className="font-lexenddeca text-[12px] lg:text-[40px] color-terciario"><a onClick={goToEsqueciSenha} className="hover:cursor-pointer hover:color-secundario transition duration-300 ease-in-out">Esqueceu a senha?</a></h2>
            </div>
            <div className="flex lg:w-[800px] flex-row items-center gap-2.5 lg:gap-5 mt-[60px] lg:mt-[90px]">
                <Button Style={"w-[80%] bg-secundario color-quarternario min-w-[130px] min-h-[60px] lg:h-[150px] rounded-[15px] lg:rounded-[30px] font-lexenddeca text-[15px] lg:text-[40px] hover:bg-white transition duration-300 ease-in-out"} Text={"Cadastrar"} OnClickFunction={goToCadastro}/>
                <Button Style={"w-[80%] bg-secundario color-quarternario min-w-[130px] min-h-[60px] lg:h-[150px] rounded-[15px] lg:rounded-[30px] font-lexenddeca text-[15px] lg:text-[40px] hover:bg-white transition duration-300 ease-in-out"} Text={"Entrar"} OnClickFunction={handleLogin}/>
            </div>
        </div>
    )
}