export default function ConvOption({ name, onRemove }) {
    return(
        <div className="flex flex-row items-center animate-fade animate-duration-200 p-2 text-[30px] gap-7 justify-center bg-blue-500/40 rounded-[20px] w-[230px] h-[100px]">
            <h1>{name}</h1>
            <h1 className="text-blue-400 cursor-pointer hover:text-red-600" onClick={onRemove}>X</h1>
        </div>
    )
}