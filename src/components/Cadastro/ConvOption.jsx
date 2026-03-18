export default function ConvOption({name}){

    return(
        <div className=" flex flex-row items-center text-[30px] gap-10 justify-center bg-blue-600/50 rounded-[20px] w-[230px] h-[100px]">
            <h1>{name}</h1>
            <h1 className="text-red-100/20">X</h1>
        </div>
    )
}