import PessoaCerebro from "../../assets/icons/pessoacerebro.png"
import Input from "../General/Input"

export default function LoginBox(){

    return(
        <div className="flex flex-col items-center mt-20 bg-terciario rounded-[50px] w-[550px] h-[630px]">
            <h1 className="font-lexenddeca color-terciario text-[30px] mt-4">Login</h1>
            <img src={PessoaCerebro} className="w-[250px] -ml-10 -mt-5"/>
            <Input Style={"w-[80%] bg-primario p-[25px] rounded-[15px] placeholder:text-[19px] placeholder:font-lexenddeca"} PlaceHolder={'Insira seu e-mail'}/>
            <Input Style={"w-[80%] bg-primario p-[25px] rounded-[15px] placeholder:text-[19px] placeholder:font-lexenddeca"} PlaceHolder={'Insira seu e-mail'}/>



        </div>
    )
}