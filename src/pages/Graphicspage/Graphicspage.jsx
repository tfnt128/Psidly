import { useState } from "react";
import Input from "../../components/General/Input";
import PatientWidget from "../../components/Homepage/PatientWidget";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";
import EmotionsChart from "../../components/Homepage/EmotionsChart";

import ProfilePhoto from "../../assets/icons/dudaaraujo.jpg"
import SabCap from "../../assets/icons/sabcap.jpg"
import Megan from "../../assets/icons/meganfox.jpg"
import EmmaW from "../../assets/icons/emma.jpg"
import EmmaS from "../../assets/icons/emmast.jpg"
import TerryC from "../../assets/icons/terry.jpg"

export default function Graphicspage() {
    const [selectedPatient, setSelectedPatient] = useState(null)

    return (
        <div className="min-h-screen flex flex-col">

            {!selectedPatient ? (
                <>
                    {/* barrinha de pesquisah */}
                    <div className="flex flex-col items-center mt-4">
                        <div className="relative w-[90%] lg:w-[40%]">
                            <Input
                                Style={"w-full h-[80px] lg:h-[200px] lg:rounded-[80px] bg-gray-300 p-10 pr-14 lg:text-[50px] rounded-[30px] placeholder:p-10"}
                                PlaceHolder={"Pesquisar"}
                            />
                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[20px] lg:text-[50px] grayscale-[50%] pointer-events-none">
                                🔍
                            </span>
                        </div>
                    </div>

                    {/* bloco de texto pra pagina principal */}
                    <div className="flex flex-col items-start mt-10 lg:mt-20 lg:ml-300 w-fit max-w-[800px]">
                        <h1 className="text-[30px] lg:text-[100px] font-lexenddeca font-bold text-gray-700 leading-tight">
                            Selecione um Paciente
                        </h1>
                        <p className="text-[16px] lg:text-[40px] font-lexenddeca text-gray-400 opacity-80">
                            Escolha um paciente para visualizar o acompanhamento emocional
                        </p>
                    </div>

                    {/* Treco de Pacientes */}
                    <div className="flex flex-col gap-10 mb-[120px] items-center mt-20 lg:grid lg:grid-cols-4 lg:gap-x-0 lg:gap-y-30 lg:mt-60 lg:w-[60%] lg:items-center lg:ml-300">
                        <PatientWidget ProfilePhoto={ProfilePhoto} OnClickFunction={() => setSelectedPatient("Duda")} Nome={"Duda"} Idade={"20"} />
                        <PatientWidget ProfilePhoto={SabCap} OnClickFunction={() => setSelectedPatient("Sabrina")} Nome={"Sabrina"} Idade={"28"} />
                        <PatientWidget ProfilePhoto={Megan} OnClickFunction={() => setSelectedPatient("Megan")} Nome={"Megan"} Idade={"40"} />
                        <PatientWidget ProfilePhoto={EmmaW} OnClickFunction={() => setSelectedPatient("Emma")} Nome={"Emma"} Idade={"35"} />
                        <PatientWidget ProfilePhoto={EmmaS} OnClickFunction={() => setSelectedPatient("Emma Stone")} Nome={"Emma Stone"} Idade={"37"} />
                        <PatientWidget ProfilePhoto={TerryC} OnClickFunction={() => setSelectedPatient("Terry")} Nome={"Terry"} Idade={"50"} />
                    </div>
                </>
            ) : (
                /* ─── Os Grafico ─── */
                <div className="flex flex-col mt-10 p-4 mb-[120px] lg:mb-20 lg:ml-300 lg:pr-10">

                    {/* não mexer no px ali embaixo, que é ele que garante o titulo alinhado com a borda */}
                <div className="flex justify-start items-center w-full mb-8 ml-[-700px]"> 
                    <h1 className="lg:text-[100px] text-[30px] text-gray-400 font-lexenddeca">
                        Gráficos de {selectedPatient}
                    </h1>
                </div>

                    {/* EmotionsChart ocupa toda a largura restante */}
                    <EmotionsChart patientName={selectedPatient} />
                </div>
            )}

            <div className="fixed lg:hidden bottom-0 left-0 w-full">
                <Homemenu BgSelectGraph={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%]">
                <Homemenuaside BgSelectGraph={"bg-quarternario"} />
            </div>
        </div>
    )
}