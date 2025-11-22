export default function Boxoption({tituloOpt, onClickWay}){
    return(
        <div className="w-full lg:w-[70%] h-[97px] lg:h-[500px] p-5 bg-secundario lg:pl-20 lg:pt-10 rounded-[20px] lg:rounded-[50px]"
        onClick={onClickWay}>
            <h1 className="font-lexenddeca lg:text-[60px]">{tituloOpt}</h1>
        </div>
    )
}