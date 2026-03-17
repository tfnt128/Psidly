import ProfilePhoto from "../../assets/icons/profilephoto.jpg"
import { useState, useRef } from "react";
import Input from "../General/Input";
import Button from "../General/Button"
import LoadingCircle from "../Animations/LoadingCircle";



export default function NewPatient(){
    const [foto, setFoto] = useState(null);
    const inputRef = useRef(null);

    function handleFoto(e) {
        const file = e.target.files[0];
        if (file) setFoto(URL.createObjectURL(file));
    }

    const [nome, setNome] = useState()
    const [cpf, setCpf] = useState()
    const [dataNasc, setDataNasc] = useState()
    const [telefone, setTelefone] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    const [standState, setStandState] = useState(false)

    function handleAddPatient(){
        setStandState(true)
    }

    return(
        <div className="relative bg-quarternario h-[750px] w-[350px] flex flex-col items-center rounded-[30px]">
            {
                standState &&
                    <div className="absolute h-full w-full inset-0 bg-black/90 rounded-[30px] z-10 flex flex-col items-center">
                        <LoadingCircle/>
                    </div>
            }
            <h1 className="font-aboreto text-[30px] mt-3">Novo paciente</h1>

            <img
                src={foto || ProfilePhoto}
                onClick={() => inputRef.current.click()}
                className="w-24 h-24 rounded-full object-cover cursor-pointer mt-4"
            />

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFoto}
            />

            <Input PlaceHolder={"Insira o nome do paciente"}
                Style={"w-[90%] h-[50px] p-3 rounded-[10px] bg-white mt-10 border-none outline-none hover:scale-107 transition-transform durantion-200"}
                value={nome}
                setValue={setNome}/>

            <Input PlaceHolder={"Insira o CPF"}
                Style={"w-[90%] h-[50px] p-3 rounded-[10px] bg-white mt-6 border-none outline-none hover:scale-107 transition-transform durantion-200"}
                value={cpf}
                setValue={setCpf}/>
            <Input PlaceHolder={"Insira o e-mail"}
                Style={"w-[90%] h-[50px] p-3 rounded-[10px] bg-white mt-6 border-none outline-none hover:scale-107 transition-transform durantion-200"}
                Type={"email"}
                value={email}
                setValue={setEmail}/>
            <Input PlaceHolder={"Crie uma senha para o paciente"}
                Style={"w-[90%] h-[50px] p-3 rounded-[10px] bg-white mt-6 border-none outline-none hover:scale-107 transition-transform durantion-200"}
                Type={"password"}
                value={senha}
                setValue={setSenha}/>
            <Input PlaceHolder={"Insira o telefone do paciente"}
                Style={"w-[90%] h-[50px] p-3 rounded-[10px] bg-white mt-6 border-none outline-none hover:scale-107 transition-transform durantion-200"}
                Type={"number"}
                value={telefone}
                setValue={setTelefone}/>
            <h3 className="text-[10px] font-aboreto mt-3">Insira a data de nascimento</h3>
            <Input PlaceHolder={"Insira a data de nascimento"}
                Type={"date"}
                value={dataNasc}
                setValue={setDataNasc}
                Style={"w-[40%] h-[50px] p-3 rounded-[10px] bg-white mt-1 border-none outline-none hover:scale-107 transition-transform durantion-200"}/>

            <Button Style={"w-[80%] h-[50px] rounded-[10px] bg-terciario text-[10px] font-aboreto color-secundario mt-6 hover:bg-white hover:text-black transition-transform duration-400 ease-in-out"} Text={"Adicionar"}
            OnClickFunction={handleAddPatient}/>
        </div>
    )
}