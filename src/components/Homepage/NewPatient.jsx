import ProfilePhoto from "../../assets/icons/profilephoto.jpg"
import { useState, useRef } from "react";
import Input from "../General/Input";
import Button from "../General/Button"
import LoadingCircle from "../Animations/LoadingCircle";
import MessagePad from "../General/MessagePad";
import { useTranslation } from 'react-i18next';
import { createPatient } from "../../services/api";



export default function NewPatient({messageOk, setMessageOk, setTextMessagePad, setTextBtnMessagePad, setScreenBlur, setSlide}){
    const [foto, setFoto] = useState(null);
    const [fotoBase64, setFotoBase64] = useState(null);
    const inputRef = useRef(null);

    const { t } = useTranslation();


    function handleFoto(e) {
        const file = e.target.files[0];
        if (file) {
            setFoto(URL.createObjectURL(file)); 
            const reader = new FileReader();
            reader.onloadend = () => {
                setFotoBase64(reader.result) 
            }
            reader.readAsDataURL(file);
        }
    }

    const [nome, setNome] = useState()
    const [cpf, setCpf] = useState()
    const [dataNasc, setDataNasc] = useState()
    const [telefone, setTelefone] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [convenio, setConvenio] = useState()

    const [standState, setStandState] = useState(false)

    const [insurances, setInsurances] = useState(JSON.parse(localStorage.getItem("insurances")))
    async function handleAddPatient(){
        if(!fotoBase64 && foto){
            return;
        }
        setStandState(true)
        const response = await createPatient(nome.toUpperCase(), cpf, email, senha, telefone, dataNasc, convenio, fotoBase64)
        if (response.success){
            if(window.innerWidth >= 1024){
                setSlide("animate-slide-left")
            }
            else{
                setSlide("animate-slide-up")
            }
            setStandState(false)
            setScreenBlur(false)
            setMessageOk(true)
            setTextMessagePad("Paciente adicionado com sucesso.")
            setTextBtnMessagePad("Ok")
        }else{
            if(window.innerWidth >= 1024){
                setSlide("animate-slide-left")
            }
            else{
                setSlide("animate-slide-up")
            }
            setStandState(false)
            setScreenBlur(false)
            setMessageOk(true)
            setTextMessagePad("Erro ao criar paciente. Tente novamente.")
            setTextBtnMessagePad("Ok")
        }

    }

    return(
        <div className="relative bg-quarternario h-[830px] lg:h-[2300px] mt-10 lg:w-[1200px] w-[350px] flex flex-col items-center lg:rounded-[150px] rounded-[30px]">
            {
                standState &&
                    <div className="absolute h-full justify-center w-full inset-0 bg-black/90 rounded-[30px] lg:rounded-[150px] z-10 flex flex-col items-center">
                        <LoadingCircle/>
                    </div>
            }

            <h1 className="font-aboreto text-[30px] lg:text-[80px] lg:mt-10 mt-3">{t('novoPaciente')}</h1>

            <img
                src={foto || ProfilePhoto}
                onClick={() => inputRef.current.click()}
                className="w-24 lg:w-68 lg:h-68 h-24 rounded-full object-cover cursor-pointer mt-4"
            />

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFoto}
            />

            <Input PlaceHolder={t('insiraNome')}
                Style={"w-[90%] text-[10px] lg:h-[140px] h-[50px] lg:h-[160px] lg:rounded-[30px] lg:text-[40px] lg:p-6 lg:mt-10 p-3 rounded-[10px] bg-white mt-10 border-none outline-none hover:scale-107 transition-transform durantion-200"}
                value={nome}
                setValue={setNome}/>

            <Input PlaceHolder={t('insiraCpf')}
                Style={"w-[90%] text-[10px] h-[50px] lg:h-[160px] lg:rounded-[30px] lg:text-[40px] lg:p-6 lg:mt-10 p-3 rounded-[10px] bg-white mt-6 border-none outline-none hover:scale-107 transition-transform durantion-200"}
                value={cpf}
                setValue={setCpf}/>
            <Input PlaceHolder={t('insiraEmail')}
                Style={"w-[90%] text-[10px] h-[50px] lg:h-[160px] lg:rounded-[30px] lg:text-[40px] lg:p-6 lg:mt-10 p-3 rounded-[10px] bg-white mt-6 border-none outline-none hover:scale-107 transition-transform durantion-200"}
                Type={"email"}
                value={email}
                setValue={setEmail}/>
            <Input PlaceHolder={t('crieSenha')}
                Style={"w-[90%] text-[10px] h-[50px] lg:h-[160px] lg:rounded-[30px] lg:text-[40px] lg:p-6 lg:mt-10 p-3 rounded-[10px] bg-white mt-6 border-none outline-none hover:scale-107 transition-transform durantion-200"}
                Type={"password"}
                value={senha}
                setValue={setSenha}/>
            <Input PlaceHolder={t('insiraTelefone')}
                Style={"w-[90%] text-[10px] h-[50px] lg:h-[160px] lg:rounded-[30px] lg:text-[40px] lg:p-6 lg:mt-10 p-3 rounded-[10px] bg-white mt-6 border-none outline-none hover:scale-107 transition-transform durantion-200"}
                Type={"number"}
                value={telefone}
                setValue={setTelefone}/>
            <h3 className="text-[10px] lg:text-[45px] font-aboreto mt-3 lg:mt-6">{t('insiraDataNasc')}</h3>
            <Input
                Type={"date"}
                value={dataNasc}
                setValue={setDataNasc}
                Style={"w-[40%] h-[50px] lg:h-[160px] lg:rounded-[30px] lg:text-[40px] lg:p-6 p-3 rounded-[10px] bg-white mt-1 border-none outline-none hover:scale-107 transition-transform durantion-200"}/>
            <h3 className="text-[10px] lg:text-[45px] font-aboreto mt-3 lg:mt-6">{t('selecioneConvenio')}</h3>

                <select 
                    value={convenio}
                    onChange={(e) => setConvenio(e.target.value)}
                    className="w-[40%] h-[60px] lg:h-[170px] rounded-[15px] bg-white lg:rounded-[35px] p-2 lg:p-[55px] lg:text-[40px] outline-none border-none lg:mt-[27px] mt-[15px] lg:mt-[20px]"
                >
                    {
                        insurances.map((insurance, index) =>(
                            <option key={index}>
                                {insurance}
                            </option>
                        ))
                    }
                    {/* <option>Amil</option>
                    <option>Bradesco Saúde</option>
                    <option>SulAmérica</option>
                    <option>Unimed</option>
                    <option>NotreDame Interm.</option>
                    <option>Porto Seg. Saúde</option>
                    <option>Hapvida</option>
                    <option>Cassi</option>
                    <option>Geap</option>
                    <option>Omint</option>
                    <option>Care Plus</option>
                    <option>Allianz Saúde</option>
                    <option>Golden Cross</option>
                    <option>Prevent Senior</option>
                    <option>Ameplan</option>
                    <option>Assim Saúde</option>
                    <option>Clinipam</option>
                    <option>Green Line</option>
                    <option>MedSenior</option>
                    <option>Trasmontano</option>
                    <option>Unimed Seguros</option>
                    <option>Particular</option> */}
                </select>
            <Button Style={"w-[80%] h-[50px] rounded-[10px] lg:rounded-[40px] lg:h-[160px] lg:mt-12 lg:text-[40px] bg-terciario text-[10px] font-aboreto color-secundario mt-6 hover:bg-white hover:text-black transition-transform duration-400 ease-in-out"} Text={t('adicionar')}
            OnClickFunction={handleAddPatient}/>
        </div>
    )
}