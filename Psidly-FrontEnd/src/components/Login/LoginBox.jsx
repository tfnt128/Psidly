import PessoaCerebro from "../../assets/icons/pessoacerebro.png"
import Input from "../General/Input"
import Button from "../General/Button"

export default function LoginBox(){

    return(
        <div className="flex flex-col items-center mt-20 bg-terciario rounded-[30px] md:rounded-[80px] w-[80%] min-w-[80%] h-[510px] md:h-[1500px]">
            <h1 className="font-lexenddeca color-terciario text-[20px] md:text-[50px] mt-4">Login</h1>
            <img src={PessoaCerebro} className="w-[200px] md:w-[500px] -ml-6 md:-ml-15 -mt-5"/>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] md:p-[55px] rounded-[15px] md:rounded-[35px] md:text-[40px] placeholder:text-[15px] md:placeholder:text-[40px] placeholder:font-lexenddeca"} PlaceHolder={'Insira seu e-mail'} Type={"email"}/>
            <Input Style={"w-[80%] outline-none bg-primario p-[15px] md:p-[55px] rounded-[15px] md:rounded-[35px] md:text-[40px] placeholder:text-[15px] md:placeholder:text-[40px] placeholder:font-lexenddeca mt-[15px] md:mt-[30px]"} PlaceHolder={'Insira sua senha'} Type={"password"}/>
            <div className="flex flex-row items-start">
                <h2 className="font-lexenddeca text-[12px] md:text-[40px] color-terciario"><a>Esqueceu a senha?</a></h2>
            </div>
            <div className="flex md:w-[800px] flex-row items-center gap-2.5 md:gap-5 mt-[60px] md:mt-[90px]">
                <Button Style={"w-[80%] bg-secundario color-quarternario min-w-[130px] min-h-[60px] md:h-[150px] rounded-[15px] md:rounded-[30px] font-lexenddeca text-[15px] md:text-[40px]"} Text={"Cadastrar"}/>
                <Button Style={"w-[80%] bg-secundario color-quarternario min-w-[130px] min-h-[60px] md:h-[150px] rounded-[15px] md:rounded-[30px] font-lexenddeca text-[15px] md:text-[40px]"} Text={"Entrar"}/>
            </div>
        </div>
    )
}