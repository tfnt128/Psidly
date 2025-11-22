export default function ErrorNotf({Mnsg}){
    return(
        <div className="bg-alertbox w-[60%] flex flex-col items-center rounded-[20px]">
            <p className="font-lexenddeca p-10 text-[12px] text-center">{Mnsg}</p>
        </div>
    )
}