export default function ShowPut({Label, Text}){
    return(
        <div className="border border-7 rounded-[30px] border-blue-300 p-5 lg:w-[1100px] lg:h-[150px]">
            <h1 className="text-blue-300 font-lexenddeca lg:text-[30px]">{Label}</h1>
            <h1 className="font-lexenddeca text-[40px]">{Text}</h1>
        </div>
    )

}