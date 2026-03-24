import Animation from "../Animations/AnimationOptions"

export default function Boxoption({tituloOpt, onClickWay, AnimationOption}){
    return(
        <div className="w-full lg:w-[70%] h-[97px] lg:h-[500px] p-5 bg-secundario lg:pl-20 lg:pt-10 rounded-[20px] lg:rounded-[50px] flex flex-row lg:flex-col 
        hover:transition hover:transform hover:scale-105"
        onClick={onClickWay}>
            <h1 className="font-lexenddeca lg:text-[60px]">{tituloOpt}</h1>
            <Animation AnimationOpt={AnimationOption} Style={"lg:w-[400px] lg:ml-[550px] ml-[150px] w-[60px]"}/>
        </div>
    )
}