export default function Navbar({idSobre, idBeneficios, idPlanos, idDownload, idAjuda}){

    return(
        <div >
            <nav >
                <ol className="flex flex-row gap-1">
                    <li className={`font-lexenddeca color-quarternario hover:text-white transition-all ease-in-out duration-300 p-1 hover:bg-blue-900 rounded-[20px]  md:text-[3px] cursor-pointer`}>Sobre</li>
                    <li className={`font-lexenddeca color-quarternario hover:text-white transition-all ease-in-out duration-300 p-1 hover:bg-blue-900 rounded-[20px]  md:text-[3px] cursor-pointer`}>Benefícios</li>
                    <li className={`font-lexenddeca color-quarternario hover:text-white transition-all ease-in-out duration-300 p-1 hover:bg-blue-900 rounded-[20px]  md:text-[3px] cursor-pointer`}>Planos</li>
                    <li className={`font-lexenddeca color-quarternario hover:text-white transition-all ease-in-out duration-300 p-1 hover:bg-blue-900 rounded-[20px]  md:text-[3px] cursor-pointer`}>Download</li>
                    <li className={`font-lexenddeca color-quarternario hover:text-white transition-all ease-in-out duration-300 p-1 hover:bg-blue-900 rounded-[20px]  md:text-[3px]  cursor-pointer`}>Ajuda</li>
                </ol>
            </nav>

        </div>

    )

}