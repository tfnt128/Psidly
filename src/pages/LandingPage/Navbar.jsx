export default function Navbar({idSobre, idBeneficios, idPlanos, idDownload, idAjuda}){

    return(
        <div >
            <nav >
                <ol className="flex flex-row gap-1 lg:gap-5">
                    <li >
                        <a href={idSobre} className={`font-lexenddeca color-quarternario hover:text-white transition-all ease-in-out duration-300 p-1 hover:bg-blue-900 rounded-[20px] lg:text-[25px] lg:p-4 md:text-[3px] cursor-pointer`}>Sobre</a>
                    </li>
                    <li ><a href={idBeneficios} className={`font-lexenddeca color-quarternario hover:text-white transition-all ease-in-out duration-300 p-1 hover:bg-blue-900 rounded-[20px]  md:text-[3px] lg:text-[25px] lg:p-4  cursor-pointer`}>Benefícios</a></li>
                    <li ><a className={`font-lexenddeca color-quarternario hover:text-white transition-all ease-in-out duration-300 p-1 hover:bg-blue-900 rounded-[20px]  md:text-[3px] lg:text-[25px] lg:p-4 cursor-pointer`}>Planos</a></li>
                    <li ><a className={`font-lexenddeca color-quarternario hover:text-white transition-all ease-in-out duration-300 p-1 hover:bg-blue-900 rounded-[20px]  md:text-[3px] lg:text-[25px] lg:p-4 cursor-pointer`}>Download</a></li>
                    <li ><a className={`font-lexenddeca color-quarternario hover:text-white transition-all ease-in-out duration-300 p-1 hover:bg-blue-900 rounded-[20px]  md:text-[3px] lg:text-[25px] lg:p-4  cursor-pointer`}>Ajuda</a></li>
                </ol>
            </nav>

        </div>

    )

}