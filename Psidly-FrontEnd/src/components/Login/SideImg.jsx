export default function SideImg({BgImg, LexendFrase, AboretoFrase, SubFrase}){
    return(
        <div className={`${BgImg} w-full h-min-screen`}>
            <h1 className="ml-[170px] mt-30 font-lexenddeca text-[270px] color-secundario">{LexendFrase}</h1>
            <h1 className="ml-[170px] font-aboreto text-[270px] color-secundario">{AboretoFrase}</h1>
            <p className="ml-[170px] font-lexenddeca color-secundario text-[80px] mt-[100px] w-[2000px]">{SubFrase}</p>
        </div>
    )
}