export default function ConvOption({ name, onRemove }) {
    return(
        <div className="inline-flex flex-row items-center justify-center border-2 border-blue-500 animate-fade animate-duration-200 p-4 gap-3 lg:gap-7 bg-blue-500/40 rounded-[10px] lg:rounded-[20px] h-[50px] lg:h-[120px]">
            <h1 className="text-[13px] pl-4 lg:text-[40px] font-lexenddeca">{name}</h1>
            <h1 className="text-blue-400 cursor-pointer hover:text-red-600 text-[15px] lg:text-[40px] shrink-0 pr-2" onClick={onRemove}>X</h1>
        </div>
    )
}