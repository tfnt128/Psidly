import { useEffect, useState, useRef } from "react"
import ProfilePhoto from "../../assets/icons/simbperfil.png"
import Button from "../General/Button";
import ShowPut from "../General/ShowPut";
import { useTranslation } from "react-i18next";
import LoadingCircle from "../Animations/LoadingCircle";
import { editPsi } from "../../services/api";

export default function Profilebox({messageOk, setMessageOk, setTextBtnOk, setTextMessagePad}){
    const varEmail = localStorage.getItem("email")
    const [email, setEmail] = useState(varEmail)
    const varNome = localStorage.getItem("nome")
    const [nome, setNome] = useState(varNome)
    const varCrp = localStorage.getItem("roleCrp")
    const [crp, setCrp] = useState(varCrp)
    const varDataNasc = localStorage.getItem("dataNasc")
    const [dataNasc, setDataNasc] = useState(varDataNasc)    
    const [insurances, setInsurances] = useState(JSON.parse(localStorage.getItem("insurances")))
    const { t } = useTranslation();

    const [standState, setStandState] = useState()

    const [options, setOptions] = useState(false)
    function openOptions(){
        setOptions(true)
    }

    function closeOptions(){
        setOptions(false)
    }

    const [edit, setEdit] = useState(false)
    const [bgEdit, setBgEdit] = useState("bg-quarternario")
    const [readOnly, setReadOnly] = useState(true)
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

    async function editActive(){
        try {
            setStandState(true)
            const response = await editPsi(nome, email, crp, dataNasc)
            setStandState(false)

            setCancel(false)
            setEdit(false)
            setBgEdit("bg-quarternario")
            if(response){
                localStorage.setItem("email", email)
                localStorage.setItem("nome", nome)
                localStorage.setItem("roleCrp", crp)
                localStorage.setItem("dataNasc", dataNasc)

                setMessageOk(true)
                setTextBtnOk("Ok")
                setTextMessagePad("Perfil alterado com sucesso")
            }else{
                setMessageOk(true)
                setTextBtnOk("Ok")
                setTextMessagePad("Erro ao alterar o perfil")
            }   
            
        } catch (err) {
            console.log(err)
        }


    }

    const [foto, setFoto] = useState(null);
    const inputRef = useRef(null);
    function handleFoto(e) {
        const file = e.target.files[0];
        if (file) setFoto(URL.createObjectURL(file));
    }




    return(
        <div className="w-[85%] lg:w-[1700px] h-[660px] lg:h-[2650px] lg:ml-[850px] lg:mt-[3%] mt-[7%] flex flex-col lg:flex-col items-center bg-quarternario rounded-[20px] lg:rounded-[100px]"
        onClick={()=>closeOptions()}>
            <h1 className="lg:text-[100px] mt-5 lg:mt-30 font-aboreto text-blue-900">{t('meuPerfil')}</h1>
            <div className="w-full h-full  mt-2 lg:mt-30 flex flex-col items-center">
                {
                    options &&
                        <div className="absolute lg:ml-250 ml-8 mt-[-20px] lg:mt-[-220px] z-10 animate-slide-down w-[100px] ml-[180px] h-[50px] lg:w-[400px] lg:h-[100px] rounded-[10px] lg:rounded-[25px] bg-white"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="w-full flex flex-col items-center lg:text-[30px] text-[15px] cursor-pointer justify-center h-[100%] hover:bg-blue-200 hover:transition-transform duration-300 rounded-[10px] lg:rounded-[25px]"
                                onClick={() => toEdit()}>{t('editar')}</div>
                        </div>
                }
                {
                    standState &&
                        <div className="absolute h-full justify-center w-full inset-0 bg-black/90 rounded-[30px] lg:rounded-[150px] z-10 flex flex-col items-center">
                            <LoadingCircle/>
                        </div>
                }
    
                <p className="absolute ml-70 lg:ml-350 lg:text-[70px] text-[20px] mt-[-40px] lg:mt-[-270px] cursor-pointer text-white"
                    onClick={(e) => { e.stopPropagation(); openOptions(); }}>⋮</p>

                <div className="w-[100%] flex flex-col items-center gap-5 lg:gap-15">
                        <ShowPut setValue={setNome}  ReadOnly={readOnly} BorderBg={"border-blue-300"} TextColor={"text-blue-300"} Style={"w-[300px] h-[65px] lg:w-[1400px] lg:h-[180px] hover:transform hover:scale-110 hover:duration-300"} Bg={bgEdit} Cancel={cancel} Label={t('nome')} Text={nome}/>
                        <ShowPut setValue={setCrp} ReadOnly={readOnly} BorderBg={"border-blue-300"} TextColor={"text-blue-300"} Style={"w-[300px] h-[65px] lg:w-[1400px] lg:h-[180px] hover:transform hover:scale-110 hover:duration-300"} Bg={bgEdit} Cancel={cancel} Label={"CRP"} Text={crp}/>
                        <ShowPut setValue={setEmail} ReadOnly={readOnly} BorderBg={"border-blue-300"} TextColor={"text-blue-300"} Style={"w-[300px] h-[65px] lg:w-[1400px] lg:h-[180px] hover:transform hover:scale-110 hover:duration-300"} Bg={bgEdit} Cancel={cancel} Label={t('email')} Text={email}/>
                        <ShowPut setValue={setDataNasc} ReadOnly={readOnly} BorderBg={"border-blue-300"} TextColor={"text-blue-300"} Style={"w-[300px] h-[65px] lg:w-[1400px] lg:h-[180px] hover:transform hover:scale-110 hover:duration-300"} Bg={bgEdit} Cancel={cancel} Label={t('dataNascimento')} Text={dataNasc}/>
                        <ShowPut setValue={setInsurances} ReadOnly={readOnly} BorderBg={"border-blue-300"} TextColor={"text-blue-300"} Style={"w-[300px] h-[225px] lg:w-[1400px] lg:h-[1000px] hover:transform hover:scale-110 hover:duration-300"} Bg={bgEdit} Cancel={cancel} Label={t('convenios')} Text={insurances ? insurances.join('\n ') : ""} />

                        {
                            edit &&
                            <div className="flex flex-row items-center gap-3">
                                <Button Style={"bg-terciario auto text-white lg:text-[40px] text-[20px] hover:bg-white hover:transition transform duration-400 hover:text-black font-lexenddeca h-[65px] w-[140px] lg:w-[400px] lg:h-[200px] rounded-[10px] lg:rounded-[40px]"} Text={t('alterar')}
                                OnClickFunction={editActive}/>
                                <Button Style={"bg-red-800 auto text-white lg:text-[40px] text-[20px] hover:bg-white hover:transition transform duration-400 hover:text-black font-lexenddeca w-[140px] h-[65px] lg:w-[400px] lg:h-[200px] rounded-[10px] lg:rounded-[40px]"} Text={t('cancelar')}
                                OnClickFunction={editDeactive}/>
        
                            </div>
                        }
                </div>
            </div>
        </div>
    )
}