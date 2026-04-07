export default function SideImg({BgImg, LexendFrase, AboretoFrase, SubFrase}){
    return(
        <div className={`${BgImg} w-full h-min-screen`}>
            <h1 className="ml-[170px] animate-fade-down mt-30 font-lexenddeca text-[170px] color-secundario">{LexendFrase}</h1>
            <h1 className="ml-[170px] animate-fade-down font-aboreto text-[240px] color-secundario max-w-[80%]">{AboretoFrase}</h1>
            <p className="ml-[170px] font-lexenddeca color-secundario text-[50px] mt-[100px] w-[2000px]">{SubFrase}</p>
        </div>
    )
}