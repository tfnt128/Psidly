import Input from "../General/Input"
import Button from "../General/Button"
import { use, useState } from "react";
import { postCadastro } from "../../services/api";
import { data, useNavigate } from "react-router-dom";
import LoadingCircle from "../Animations/LoadingCircle";
import ConvOption from "./ConvOption";
import { isNullOrUndef } from "chart.js/helpers";

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

    const [standState, setStandState] = useState(false);
    const handleCadastro = async ()=>{
        setStandState(true);
        try {

            if(convs.length == 0 )
            {
                alert("Selecione ao menos um convênio.")
                return;
            }else if(isNullOrUndef(email))
            {
                alert("Email inválido")
                return;
            }
                
            const response = await postCadastro(crp, nome, email, dataNasc, senha, senhaConfirmada, convs);
            console.log("RESPOSTA:", response);

            if (response?.success) {
                goToInicio();
            } else {
                alert(response?.message || "Erro ao cadastrar");
                setStandState(false);
            }

        } catch (err) {
            alert("Credenciais inválidas! Tente novamente.")
            setStandState(false)
            console.log(err);
        }
    }


    const handleVoltar = ()=>{ 
        navigator("/login") 
    }

    const [convs, setConvs] = useState([]);
    const [selected, setSelected] = useState("Amil");
    function handleOk(){
        if(selected && !convs.includes(selected)){
            setConvs([...convs, selected]);
        }

    }


    return(
            <div className="relative flex flex-col items-center bg-terciario rounded-[30px] lg:rounded-[100px] w-[80%] min-w-[80%] pb-8 mb-8">
                
                {
                    standState &&
                        <div className="w-full h-full absolute inset-0 bg-black/90 rounded-[30px] lg:rounded-[80px] z-10 flex flex-col items-center justify-center">
                            <LoadingCircle/>
                        </div>
                }
            <h1 className="font-lexenddeca color-terciario text-[20px] lg:text-[50px] mt-4">Cadastro</h1>
            <h2 className="font-lexenddeca color-terciario text-[12px] lg:text-[37px] w-[250px] lg:w-[600px] text-center m-4 lg:m-8">Informe abaixo o que se pede para realizar seu registro na plataforma</h2>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[45px] placeholder:font-lexenddeca mt-[10px]"} 
                PlaceHolder={'Insira seu CRP (somente os números depois da /)'} 
                Type={"text"}
                value={crp}
                setValue={setCrp}
                maxLength={6}/>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[45px] placeholder:font-lexenddeca mt-[20px] lg:mt-[60px]"} 
                PlaceHolder={'Insira seu nome'} 
                Type={"text"}
                value={nome}
                setValue={setNome}/>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[45px] placeholder:font-lexenddeca mt-[20px] lg:mt-[60px]"} 
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
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[45px] placeholder:font-lexenddeca mt-[20px] lg:mt-[60px]"} 
                PlaceHolder={'Crie uma senha'} 
                Type={"password"}
                value={senha}
                setValue={setSenha}/>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[45px] placeholder:font-lexenddeca mt-[20px] lg:mt-[60px]"} 
                PlaceHolder={'Confirme sua senha'} 
                Type={"password"}
                value={senhaConfirmada}
                setValue={setSenhaConfirmada}/>
            <label className="mt-[15px] lg:mt-[60px] w-[90%] text-center font-lexenddeca color-terciario lg:text-[37px]">Selecione os convênios que você atende</label>
            <div className="flex flex-row items-center lg:gap-5 gap-2">
                <select 
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="w-[90%] h-[60px] lg:h-[170px] rounded-[15px] bg-white lg:rounded-[35px] p-2 lg:p-[55px] lg:text-[40px] outline-none border-none lg:mt-[27px] mt-[15px] lg:mt-[20px]"
                >
                    <option>Amil</option>
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
                    <option>Particular</option>
                </select>
                <Button Style={"w-[30%] h-[60px] lg:h-[140px] text-[15px] lg:text-[30px] hover:bg-white transition duration-300 ease-in-out hover:text-black font-lexenddeca rounded-[15px] mt-6 lg:rounded-[20px] text-white bg-quarternario"} OnClickFunction={handleOk} Text={"Ok"}
                    />
            </div>

            <div className="grid grid-cols-2 gap-2 lg:gap-2 w-[90%] mt-5">
                {convs.map((conv, index) => (
                    <ConvOption 
                        key={index} 
                        name={conv} 
                        onRemove={() => setConvs(convs.filter((_, i) => i !== index))}
                    />
                ))}
                {/* <ConvOption name={name}/> */}
            </div>




            <div className="w-full flex flex-row items-center gap-3 justify-center bottom-0">
            <Button 
                Style={"w-[45%] mt-5 lg:mt-15 bg-alertbox color-secundario min-w-[130px] min-h-[60px] lg:h-[150px] rounded-[15px] lg:rounded-[30px] font-lexenddeca text-[15px] lg:text-[40px] hover:bg-white hover:color-primario transition duration-300 ease-in-out"} 
                Text={"Voltar"} 
                OnClickFunction={handleVoltar}
            />
           
            <Button 
                Style={"w-[45%] mt-5 lg:mt-15 bg-secundario color-quarternario min-w-[130px] min-h-[60px] lg:h-[150px] rounded-[15px] lg:rounded-[30px] font-lexenddeca text-[15px] lg:text-[40px] hover:bg-white transition duration-300 ease-in-out"} 
                Text={"Cadastrar"} 
                OnClickFunction={handleCadastro}
            />

            </div>
           


        </div>

    )
}