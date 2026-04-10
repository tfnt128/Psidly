import ProfilePhoto from "../../assets/icons/tyler.jpg"
import { useState, useRef } from "react";
import Input from "../General/Input";
import Button from "../General/Button"
import LoadingCircle from "../Animations/LoadingCircle";
import ShowPut from "../General/ShowPut";

export default function OcultPatientDetails({Style}){

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

    const [cancel, setCancel] = useState(false)
    function editDeactive(){
        setEdit(false)
        setReadOnly(true)
        setBgEdit("bg-quarternario")
        setCancel(true)
        setTimeout(() => setCancel(false), 0)
    }

    function editActive(){
        setCancel(false)
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
        <div className={`relative bg-quarternario ${Style} flex flex-col items-center lg:mt-[-80px] pt-2 lg:pt-60 lg:rounded-[150px] rounded-[30px]`}
            onClick={() => closeOptions()}>
            
            <div className="relative lg:w-[100%] w-[100%] flex flex-col items-center gap-5 mt-5 lg:mt-0 lg:gap-15">
                {
                    options &&
                        <div className="absolute z-10 top-3 animate-slide-down right-4 mr-7 lg:mr-40 lg:mt-[-100px] mt-[10px] w-[200px] h-[75px] lg:w-[400px] lg:h-[200px] rounded-[10px] lg:rounded-[25px] bg-white"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="w-full flex flex-col items-center lg:text-[30px] text-[15px] cursor-pointer justify-center h-[50%] hover:bg-blue-200 hover:transition-transform duration-300 rounded-t-[10px] lg:rounded-t-[25px]">Excluir</div>
                            <div className="w-full flex flex-col items-center lg:text-[30px] text-[15px] cursor-pointer justify-center h-[50%] hover:bg-blue-200 hover:transition-transform duration-300 rounded-b-[10px] lg:rounded-b-[25px]">Ativar</div>
                        </div>
                }
                <div className="flex justify-end w-full pr-4 pt-2 lg:mt-[-90px] lg:mr-60">
                    <div className=" hover:bg-blue-100 rounded-[10px] w-[35px] h-[35px] lg:w-[100px] lg:h-[100px] hover:w-[100px] lg:hover:w-[250px] flex items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden group"
                        onClick={(e) => { e.stopPropagation(); openOptions(); }}>
                        <p className="text-[20px] lg:text-[70px] text-black group-hover:hidden">⋮</p>
                        <p className="hidden group-hover:block text-black text-[11px] lg:text-[50px] font-lexenddeca whitespace-nowrap">Opções</p>
                    </div>
                </div>
                {/* <img src={ProfilePhoto} className="w-24 lg:w-88 lg:h-88 h-24 rounded-full object-cover cursor-pointer lg:mt-2 lg:mb-30"/> */}
                <div className="relative w-24 h-24 lg:w-68 lg:h-68 mt-4 cursor-pointer group grayscale-100">
                    <img
                        src={foto || ProfilePhoto}
                        className="w-full h-full rounded-full object-cover group-hover:brightness-50 transition duration-300"
                    />
                </div>

                <ShowPut ReadOnly={readOnly} Style={"w-[85%] h-[55px] lg:w-[1100px] lg:h-[150px]"} Label={"Nome"} Text={"Duda Araujo do Santos"} Bg={bgEdit} Cancel={cancel} BorderBg={"border-blue-300"} TextColor={"text-blue-300"}/>
                <ShowPut ReadOnly={readOnly} Style={"w-[85%] h-[55px] lg:w-[1100px] lg:h-[150px]"} Label={"CPF"} Text={"47218802869"} Bg={bgEdit} Cancel={cancel} BorderBg={"border-blue-300"} TextColor={"text-blue-300"}/>
                <ShowPut ReadOnly={readOnly} Style={"w-[85%] h-[55px] lg:w-[1100px] lg:h-[150px]"} Label={"E-mail"} Text={"duda@gmail.com"} Bg={bgEdit} Cancel={cancel} BorderBg={"border-blue-300"} TextColor={"text-blue-300"}/>
                <ShowPut ReadOnly={readOnly} Style={"w-[85%] h-[55px] lg:w-[1100px] lg:h-[150px]"} Label={"Data de Nascimento"} Text={"10/09/2001"} Bg={bgEdit} Cancel={cancel} BorderBg={"border-blue-300"} TextColor={"text-blue-300"}/>
                <ShowPut ReadOnly={readOnly} Style={"w-[85%] h-[55px] lg:w-[1100px] lg:h-[150px]"} Label={"Convênio"} Text={"Prevent Senior"} Bg={bgEdit} Cancel={cancel} BorderBg={"border-blue-300"} TextColor={"text-blue-300"}/>
            </div>
            <div className="w-[50%] flex flex-col items-center">

            </div>

        </div>
    )
}