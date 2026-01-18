export default function Heading({ClassName}){

    return(<div className={`flex flex-col items-center lg:items-start ${ClassName}`}>
            <h1 className={`font-lexenddeca color-quarternario text-[35px] lg:text-[55px]`}>Melhore o seu</h1>
            <h1 className={`font-aboreto color-quarternario text-[30px] text-center lg:text-[45px]`}>Acompanhamento psicológico</h1>
        </div>
    )
}