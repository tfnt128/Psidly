import ProfilePhoto from "../../assets/icons/profilephoto.jpg"
import { useState, useRef } from "react";
import Input from "../General/Input";



export default function NewPatient(){
    const [foto, setFoto] = useState(null);
    const inputRef = useRef(null);

    function handleFoto(e) {
        const file = e.target.files[0];
        if (file) setFoto(URL.createObjectURL(file));
    }

    return(
        <div className="bg-quarternario h-[800px] w-[350px] flex flex-col items-center rounded-[30px]">
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
                Style={"w-[90%] h-[50px] p-3 rounded-[10px] bg-white mt-10"}/>

            <Input PlaceHolder={"Insira o CPF"}
                Style={"w-[90%] h-[50px] p-3 rounded-[10px] bg-white mt-6"}/>
            <Input PlaceHolder={"Insira o e-mail"}
                Style={"w-[90%] h-[50px] p-3 rounded-[10px] bg-white mt-6"}
                Type={"email"}/>
            <Input PlaceHolder={"Crie uma senha para o paciente"}
                Style={"w-[90%] h-[50px] p-3 rounded-[10px] bg-white mt-6"}
                Type={"password"}/>
            <Input PlaceHolder={"Insira o telefone do paciente"}
                Style={"w-[90%] h-[50px] p-3 rounded-[10px] bg-white mt-6"}
                Type={"number"}/>
            <h3 className="text-[10px] font-aboreto mt-3">Insira a data de nascimento</h3>
            <Input PlaceHolder={"Insira a data de nascimento"}
                Type={"date"}
                Style={"w-[40%] h-[50px] p-3 rounded-[10px] bg-white mt-1"}/>
        </div>
    )
}