import Input from "../General/Input"
import Button from "../General/Button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function BoxCodigo(){

    const [time, setTime] = useState(null)
    useEffect(()=>{
        setTime(5)
        const timer = setInterval(()=>{
            setTime(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    goToTempoEsg()
                    return 0;
                }
                return prev - 1;
            })
        }, 1000)


        
        return ()=> clearInterval(timer);
    }, [])

    const navigator = useNavigate();
    function goToTempoEsg(){
        navigator("/esqueceuasenhatempoesgotado")
    }

    function goToConfirm(){
        navigator("/esqueceuasenhaconfirmar")
    }

    return(
        <div className="flex flex-col items-center animate-fade-left mt-20 bg-terciario rounded-[30px] lg:rounded-[100px] w-[80%] min-w-[80%] h-[420px] lg:h-[1400px]">
            <h1 className="font-lexenddeca color-terciario text-[25px] lg:text-[70px] mt-4 lg:mt-15">Código Enviado!</h1>
            <p className="font-lexenddeca color-terciario text-[12px] lg:text-[40px] text-center w-[270px] lg:w-[670px] lg:mt-18 mt-8">Um código de confirmação acaba de ser enviado ao seu e-mail. Verifique a caixa de entrada e insira o código no campo abaixo dentro do tempo estipulado.</p>

            <h1 className="lg:text-[100px] text-[30px] font-lexeddeca color-terciario mt-[20px] lg:mt-[40px]">{time}</h1>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px]  lg:p-[55px] rounded-[15px] lg:rounded-[35px] lg:text-[40px] placeholder:text-[15px] lg:placeholder:text-[50px] placeholder:font-lexenddeca mt-10 lg:mt-[160px]"} PlaceHolder={'Insira o código'} Type={"text"}/>
            <Button Style={"w-[50%] lg:w-[40%] bg-secundario color-quarternario min-w-[130px] min-h-[60px] lg:h-[170px] rounded-[15px] lg:rounded-[30px] font-lexenddeca text-[15px] lg:text-[40px] hover:bg-white mt-8 transition duration-300 ease-in-out"} Text={"Verificar código"} OnClickFunction={goToConfirm} />
                
        </div>
    )
}