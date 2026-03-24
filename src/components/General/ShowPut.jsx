export default function ShowPut({Label, Text}){
    return(
        <div className="border border-3 lg:border-7 lg:rounded-[30px] rounded-[15px] border-blue-300 p-1 pl-2 lg:p-5 w-[85%] h-[55px] lg:w-[1100px] lg:h-[150px]">
            <h1 className="text-blue-300 font-lexenddeca lg:text-[30px] text-[12px]">{Label}</h1>
            <h1 className="font-lexenddeca lg:text-[40px] text-[15px]">{Text}</h1>
        </div>
    )

}