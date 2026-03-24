import ProfilePhoto from "../../assets/icons/dudaaraujo.jpg"
import { useState, useRef } from "react";
import Input from "../General/Input";
import Button from "../General/Button"
import LoadingCircle from "../Animations/LoadingCircle";
import ShowPut from "../General/ShowPut";

export default function PatientDetails(){

    const [options, setOptions] = useState(false)
    function openOptions(){
        setOptions(true)
    }

    function closeOptions(){
        setOptions(false)
    }

    const [edit, setEdit] = useState(false)
    const [bgEdit, setBgEdit] = useState("bg-quarternario")
    function toEdit(){
        setEdit(true)
        setReadOnly(false)
        setBgEdit("bg-white")
    }

    function editDeactive(){
        setEdit(false)
        setReadOnly(true)
        setBgEdit("bg-quarternario")
    }

    const [readOnly, setReadOnly] = useState(true)

    const [foto, setFoto] = useState(null);
    const inputRef = useRef(null);
    function handleFoto(e) {
        const file = e.target.files[0];
        if (file) setFoto(URL.createObjectURL(file));
    }



    return(
        <div className="relative bg-quarternario h-[650px] lg:h-[2000px] lg:w-[3000px] w-[350px] flex flex-col items-center lg:flex-row lg:rounded-[150px] rounded-[30px]"
            onClick={() => closeOptions()}>
            
            <div className="relative lg:w-[50%] w-[100%] flex flex-col items-center gap-5 mt-5 lg:mt-0 lg:gap-15">
                {
                    options &&
                        <div className="absolute z-10 top-3 animate-slide-down right-4 mr-7 lg:mr-60 lg:mt-[-100px] mt-[10px] w-[200px] h-[150px] lg:w-[400px] lg:h-[300px] rounded-[10px] lg:rounded-[25px] bg-white"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="w-full flex flex-col items-center lg:text-[30px] text-[15px] cursor-pointer justify-center h-[33%] hover:bg-blue-200 hover:transition-transform duration-300 rounded-t-[10px] lg:rounded-t-[25px]"
                                onClick={() => toEdit()}>Editar</div>
                            <div className="w-full flex flex-col items-center lg:text-[30px] text-[15px] cursor-pointer justify-center h-[33%] hover:bg-blue-200 hover:transition-transform duration-300">Excluir</div>
                            <div className="w-full flex flex-col items-center lg:text-[30px] text-[15px] cursor-pointer justify-center h-[33%] hover:bg-blue-200 hover:transition-transform duration-300 rounded-b-[10px] lg:rounded-b-[25px]">Ocultar</div>
                        </div>
                }
                <p className="absolute top-4 right-4 lg:text-[70px] cursor-pointer text-white mr-6 lg:mr-55 lg:mt-[-150px]"
                    onClick={(e) => { e.stopPropagation(); openOptions(); }}>⋮</p>
                {/* <img src={ProfilePhoto} className="w-24 lg:w-88 lg:h-88 h-24 rounded-full object-cover cursor-pointer lg:mt-2 lg:mb-30"/> */}
                <div className="relative w-24 h-24 lg:w-68 lg:h-68 mt-4 cursor-pointer group"
                    onClick={() => inputRef.current.click()}>
                    <img
                        src={foto || ProfilePhoto}
                        className="w-full h-full rounded-full object-cover group-hover:brightness-50 transition duration-300"
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-5x1 lg:text-7xl opacity-0 group-hover:opacity-100 transition duration-300">
                        ✏️
                    </span>
                </div>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFoto}
                />

                <ShowPut ReadOnly={readOnly} Label={"Nome"} Text={"Duda Araujo do Santos"} Bg={bgEdit}/>
                <ShowPut ReadOnly={readOnly} Label={"CPF"} Text={"47218802869"} Bg={bgEdit}/>
                <ShowPut ReadOnly={readOnly} Label={"E-mail"} Text={"duda@gmail.com"} Bg={bgEdit}/>
                <ShowPut ReadOnly={readOnly} Label={"Data de Nascimento"} Text={"10/09/2001"} Bg={bgEdit}/>
                <ShowPut ReadOnly={readOnly} Label={"Convênio"} Text={"Prevent Senior"} Bg={bgEdit}/>

                {
                    edit &&
                    <div className="flex flex-row items-center gap-3">
                        <Button Style={"bg-terciario auto text-white lg:text-[40px] text-[20px] hover:bg-white hover:transition transform duration-400 hover:text-black font-lexenddeca h-[65px] w-[140px] lg:w-[400px] lg:h-[200px] rounded-[10px] lg:rounded-[40px]"} Text={"Concluído"}/>
                        <Button Style={"bg-red-800 auto text-white lg:text-[40px] text-[20px] hover:bg-white hover:transition transform duration-400 hover:text-black font-lexenddeca w-[140px] h-[65px] lg:w-[400px] lg:h-[200px] rounded-[10px] lg:rounded-[40px]"} Text={"Cancelar"}
                        OnClickFunction={editDeactive}/>

                    </div>
                }
            </div>
            <div className="w-[50%] flex flex-col items-center">

            </div>

        </div>
    )
}