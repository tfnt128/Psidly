import Animation from "../Animations/AnimationOptions"

export default function Boxoption({tituloOpt, onClickWay, AnimationOption, Style}){

    return(
        <div className={`w-full lg:w-[1100px] h-[107px] lg:h-[500px] hover:bg-blue-400 duration-300 cursor-pointer p-5 bg-secundario justify-center lg:pt-10 rounded-[10px] lg:rounded-[50px] flex flex-col items-center lg:flex-col 
        hover:transition hover:transform hover:scale-105 ${Style}`}
        onClick={onClickWay}>
            <h1 className="font-aboreto text-[15px] lg:text-[60px]">{tituloOpt}</h1>
            <Animation AnimationOpt={AnimationOption} Style={"lg:w-[400px] w-[60px]"}/>
        </div>
    )
}