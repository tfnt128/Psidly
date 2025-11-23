import { useState } from "react";
import Button from "../General/Button";
import Input from "../General/Input";
import { postSenhaExcluir } from "../../services/api";

export default function BoxExcluirConta(){

    const [senhaExcluir, setSenhaExcluir] = useState("");

    const handleSenhaExcluir = async ()=>{
        try {
            const resposta = await postSenhaExcluir(senhaExcluir);
        } catch (err) {
            console.log(err);
        }
    }
    return(
        <div className="w-[85%] lg:w-[40%] h-[480px] lg:h-[1700px] bg-terciario mt-[30%] lg:mt-[5%]  rounded-[50px] lg:rounded-[100px] flex flex-col items-center">
            <h1 className="font-lexenddeca color-secundario text-[30px] lg:text-[120px] text-center mt-[5%] w-[70%] lg:w-[60%]">Deseja excluir sua conta?</h1>
            <p className="font-lexenddeca color-secundario text-[10px] lg:text-[50px] w-[80%] text-center mt-[5%]">Ao excluir sua conta do Psidly, você perderá todos os seus dados para sempre, incluindo os pacientes vinculados. Dessa forma, será impossível desfazer a exclusão.
                Caso tenha certeza disso, confirme sua decisão no botão abaixo e digite sua senha para garantirmos sua segurança.</p>
            <Input Type={"password"} Style={"w-[80%] h-[40px] lg:h-[150px] bg-primario lg:text-[60px] rounded-[10px] lg:rounded-[50px] mt-[70px] lg:p-10 outline-none p-4"} 
                PlaceHolder={"Digite sua senha"}
                value={senhaExcluir}
                setValue={setSenhaExcluir} />
            <Button Style={"bg-alertbox w-[50%] lg:w-[30%] h-[70px] lg:h-[190px] rounded-[20px] lg:rounded-[50px] mt-[10%] color-secundario lg:text-[50px]"} Text={"Excluir"}/>
        </div>
    )
}