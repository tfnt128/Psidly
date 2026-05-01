import ProfilePhoto from "../../assets/icons/dudaaraujo.jpg"
import { useState, useRef } from "react";
import Input from "../General/Input";
import Button from "../General/Button"
import LoadingCircle from "../Animations/LoadingCircle";
import ShowPut from "../General/ShowPut";
import StarAvaliated from "../HomepagePat/StarsAvaliated";

export default function PatientDetails({Style}){

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

    const [alegria, setAlegria] = useState(2)
    const [tristeza, setTristeza] = useState(3)
    const [raiva, setRaiva] = useState(5)
    const [ansiedade, setAnsiedade] = useState(4)
    const [estresse, setEstresse] = useState(1)

    const [textObs, setTextObs] = useState("teste")
    const [comentPsi, setComentPsi] = useState("teste")



    return(
        <div className={`relative overflow-x-hidden bg-quarternario ${Style} flex flex-col items-center lg:mt-[-80px] lg:flex-row lg:rounded-[150px] rounded-[30px]`}
            onClick={() => closeOptions()}>
            
            <div className="relative lg:w-[40%] w-[100%] flex flex-col items-center gap-5 mt-5 lg:mt-0 lg:gap-15">
                {
                    options &&
                        <div className="absolute z-10 top-3 animate-slide-down right-4 mr-7 lg:mr-40 lg:mt-[40px] mt-[10px] w-[200px] h-[150px] lg:w-[400px] lg:h-[300px] rounded-[10px] lg:rounded-[25px] bg-white"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="w-full flex flex-col items-center lg:text-[30px] text-[15px] cursor-pointer justify-center h-[33%] hover:bg-blue-200 hover:transition-transform duration-300 rounded-t-[10px] lg:rounded-t-[25px]"
                                onClick={() => toEdit()}>Editar</div>
                            <div className="w-full flex flex-col items-center lg:text-[30px] text-[15px] cursor-pointer justify-center h-[33%] hover:bg-blue-200 hover:transition-transform duration-300">Excluir</div>
                            <div className="w-full flex flex-col items-center lg:text-[30px] text-[15px] cursor-pointer justify-center h-[33%] hover:bg-blue-200 hover:transition-transform duration-300 rounded-b-[10px] lg:rounded-b-[25px]">Desativar</div>
                        </div>
                }
                <div className="flex justify-end w-full pr-4 pt-2 lg:mr-60">
                    <div className=" hover:bg-blue-100 rounded-[10px] w-[35px] h-[35px] lg:w-[100px] lg:h-[100px] hover:w-[100px] lg:hover:w-[250px] flex items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden group"
                        onClick={(e) => { e.stopPropagation(); openOptions(); }}>
                        <p className="text-[20px] lg:text-[70px] text-black group-hover:hidden">⋮</p>
                        <p className="hidden group-hover:block text-black text-[11px] lg:text-[50px] font-lexenddeca whitespace-nowrap">Opções</p>
                    </div>
                </div>
                {/* <img src={ProfilePhoto} className="w-24 lg:w-88 lg:h-88 h-24 rounded-full object-cover cursor-pointer lg:mt-2 lg:mb-30"/> */}
                <div className="relative w-24 h-24 lg:w-68 lg:h-68 mt-[-30px] cursor-pointer group"
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

                <ShowPut ReadOnly={readOnly} Style={"w-[85%] h-[55px] lg:w-[1100px] lg:h-[150px]"} Label={"Nome"} Text={"Duda Araujo do Santos"} Bg={bgEdit} Cancel={cancel} BorderBg={"border-blue-300"} TextColor={"text-blue-300"}/>
                <ShowPut ReadOnly={readOnly} Style={"w-[85%] h-[55px] lg:w-[1100px] lg:h-[150px]"} Label={"CPF"} Text={"47218802869"} Bg={bgEdit} Cancel={cancel} BorderBg={"border-blue-300"} TextColor={"text-blue-300"}/>
                <ShowPut ReadOnly={readOnly} Style={"w-[85%] h-[55px] lg:w-[1100px] lg:h-[150px]"} Label={"E-mail"} Text={"duda@gmail.com"} Bg={bgEdit} Cancel={cancel} BorderBg={"border-blue-300"} TextColor={"text-blue-300"}/>
                <ShowPut ReadOnly={readOnly} Style={"w-[85%] h-[55px] lg:w-[1100px] lg:h-[150px]"} Label={"Data de Nascimento"} Text={"10/09/2001"} Bg={bgEdit} Cancel={cancel} BorderBg={"border-blue-300"} TextColor={"text-blue-300"}/>
                <ShowPut ReadOnly={readOnly} Style={"w-[85%] h-[55px] lg:w-[1100px] lg:h-[150px]"} Label={"Convênio"} Text={"Prevent Senior"} Bg={bgEdit} Cancel={cancel} BorderBg={"border-blue-300"} TextColor={"text-blue-300"}/>

                {
                    edit &&
                    <div className="flex flex-row items-center gap-3">
                        <Button Style={"bg-terciario auto text-white lg:text-[40px] text-[20px] hover:bg-white hover:transition transform duration-400 hover:text-black font-lexenddeca h-[65px] w-[140px] lg:w-[400px] lg:h-[200px] rounded-[10px] lg:rounded-[40px]"} Text={"Concluído"}
                        OnClickFunction={editActive}/>
                        <Button Style={"bg-red-800 auto text-white lg:text-[40px] text-[20px] hover:bg-white hover:transition transform duration-400 hover:text-black font-lexenddeca w-[140px] h-[65px] lg:w-[400px] lg:h-[200px] rounded-[10px] lg:rounded-[40px]"} Text={"Cancelar"}
                        OnClickFunction={editDeactive}/>

                    </div>
                }
            </div>
            <div className="w-[300px] lg:w-[4px] h-[2px] shrink-0 mt-10 lg:ml-30 lg:mt-0 lg:h-[1800px] lg:ml-10 bg-white/40 mx-4 lg:mx-20 rounded-full"/>

            <div className="lg:w-[60%] h-full flex flex-col items-center">
                <div className="flex-col flex items-center">
                    <h1 className="font-aboreto text-[17px] lg:text-[65px] color-quarternario mt-10 lg:mt-15">Avaliações</h1>
                    <Input Type={"date"} Style={"w-[100%] outline-none bg-primario p-[15px] lg:p-[30px] rounded-[10px] lg:rounded-[25px] lg:text-[40px] m-3 "}/>
                </div>
                <div className="flex flex-col lg:flex-row items-center">
                    <div>
                        <div className=" flex flex-col items-center  lg:w-[40%] mt-5">

                            <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[50px] lg:mt-1 mb-[-15px] lg:mb-[-65px]">Alegria</h1>
                            <StarAvaliated Style={"text-[45px] lg:text-[140px] mt-1 lg:mt-8"} starQtde={alegria}/>
            
                            <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[50px] mt-5 mb-[-15px] lg:mb-[-65px]">Tristeza</h1>
                            <StarAvaliated Style={"text-[45px] lg:text-[140px] mt-1 lg:mt-8"} starQtde={tristeza}/>
            
                            <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[50px] mt-5 mb-[-15px] lg:mb-[-65px]">Raiva</h1>
                            <StarAvaliated Style={"text-[45px] lg:text-[140px] mt-1 lg:mt-8"} starQtde={raiva}/>
            
                            <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[50px] mt-5 mb-[-15px] lg:mb-[-65px]">Ansiedade</h1>
                            <StarAvaliated Style={"text-[45px] lg:text-[140px] mt-1 lg:mt-8"} starQtde={ansiedade}/>
            
                            <h1 className="font-lexenddeca color-quarternario text-[18px] lg:text-[50px] mt-5 mb-[-15px] lg:mb-[-65px]">Estresse</h1>
                            <StarAvaliated Style={"text-[45px] lg:text-[140px] mt-1 lg:mt-8"} starQtde={estresse}/>
                        </div>

                    </div>
                    <div className=" flex flex-col items-center mt-7 lg:mt-15">
                        <div className="flex flex-col items-center lg:ml-35 lg:mr-[-30px] gap-1 lg:gap-12">
                            <div className="flex flex-col items-center">
                                <h1 className="font-aboreto color-quarternario text-[14px] lg:text-[50px] mt-10 lg:mb-5 lg:mt-[-20px] mb-[-15px] ">Observações do paciente</h1>
                                <textarea className="w-[260px] lg:h-[800px] lg:w-[800px] h-[300px] lg:text-[40px] lg:mt-0 mt-10 lg:p-5 text-[15px] bg-blue-200 rounded-[20px] lg:rounded-[50px] outline-none font-lexenddeca p-3 " maxLength={300}
                                placeholder={textObs}
                                readOnly={true}/> 
                            </div>
                            <div className="flex flex-col items-center mt-5 lg:mt-10">
                                <h1 className="font-aboreto color-quarternario text-[14px] lg:text-[50px] mt-10 lg:mb-5 lg:mt-[-20px] mb-[-15px] ">Minhas observações</h1>
                                <textarea className="w-[260px] lg:h-[400px]  lg:w-[800px] h-[300px] lg:mb-10 mb-5 lg:text-[40px] lg:mt-0 mt-10 lg:p-5 text-[15px] bg-blue-200 rounded-[20px] lg:rounded-[50px] outline-none font-lexenddeca p-3 " maxLength={300}
                                placeholder={comentPsi}
                                /> 

                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}