import Input from "../General/Input"
import Button from "../General/Button"
import { use, useState } from "react";
import { postCadastro } from "../../services/api";
import { data, useNavigate } from "react-router-dom";

export default function CadastroBox({}){
    
    const [crp, setCrp] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaConfirmada, setSenhaConfirmada] = useState("");

    const navigator = useNavigate();
    function goToInicio(){
        navigator("/");
    }

    const handleCadastro = async ()=>{
        try {
            const response = await postCadastro(crp, nome, email, dataNasc, senha, senhaConfirmada);
            if(response == true){
                goToInicio();
            }
        } catch (err) {
            console.log(err);
        }
    }


    return(
        <div className="flex flex-col items-center bg-terciario rounded-[30px] lg:rounded-[100px] w-[80%] min-w-[80%] min-h-[800px] lg:h-[2200px] pb-8 mb-8">
            <h1 className="font-lexenddeca color-terciario text-[20px] lg:text-[50px] mt-4">Cadastro</h1>
            <h2 className="font-lexenddeca color-terciario text-[12px] lg:text-[37px] w-[250px] lg:w-[600px] text-center m-4 lg:m-8">Informe abaixo o que se pede para realizar seu registro na plataforma</h2>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[45px] placeholder:font-lexenddeca mt-[10px]"} 
                PlaceHolder={'Insira seu CRP'} 
                Type={"text"}
                value={crp}
                setValue={setCrp}/>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[45px] placeholder:font-lexenddeca mt-[27px] lg:mt-[60px]"} 
                PlaceHolder={'Insira seu nome'} 
                Type={"text"}
                value={nome}
                setValue={setNome}/>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[45px] placeholder:font-lexenddeca mt-[27px] lg:mt-[60px]"} 
                PlaceHolder={'Insira seu e-mail'} 
                Type={"email"}
                value={email}
                setValue={setEmail}/>
            <label className="mt-[15px] lg:mt-[60px] font-lexenddeca color-terciario lg:text-[37px]">Insira seu aniversário</label>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] "}
                PlaceHolder={'Insira sua data de nascimento'} 
                Type={"date"}
                value={dataNasc}
                setValue={setDataNasc}/>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[45px] placeholder:font-lexenddeca mt-[27px] lg:mt-[60px]"} 
                PlaceHolder={'Crie uma senha'} 
                Type={"password"}
                value={senha}
                setValue={setSenha}/>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[45px] placeholder:font-lexenddeca mt-[27px] lg:mt-[60px]"} 
                PlaceHolder={'Confirme sua senha'} 
                Type={"password"}
                value={senhaConfirmada}
                setValue={setSenhaConfirmada}/>
            <div className="flex flex-col mr-5 mt-5 lg:mt-15">
                <h1 className="text-[12px] lg:text-[35px] font-lexenddeca color-terciario "><a>Termos e condições de uso</a></h1>
                <div className="flex flex-row mt-4 gap-1">
                    <input type="checkbox" className="w-4 h-4 lg:w-8 lg:h-8 rounded-[10px]"/>
                    <h1 className="text-[12px] lg:text-[35px] lg:w-[470px] w-[200px] font-lexenddeca color-terciario ">Li e concordo com os termos e condições de uso</h1>
                </div>
                
            </div>
            <Button Style={"w-[50%] mt-5 lg:mt-15 bg-secundario color-quarternario min-w-[130px] min-h-[60px] lg:h-[150px] rounded-[15px] lg:rounded-[30px] font-lexenddeca text-[15px] lg:text-[40px] hover:bg-white transition duration-300 ease-in-out"} Text={"Cadastrar"} OnClickFunction={handleCadastro}/>


        </div>

    )
}