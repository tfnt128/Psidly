import { useState, useEffect } from "react";
import Input from "../../components/General/Input";
import PatientWidget from "../../components/Homepage/PatientWidget";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";
import EmotionsChart from "../../components/Homepage/EmotionsChart";
import { listPatient, searchPatient } from "../../services/api";

export default function Graphicspage() {
    const [selectedPatient, setSelectedPatient] = useState(null) // guarda o objeto completo do paciente
    const [patients,        setPatients]        = useState([])
    const [patientName,     setPatientName]     = useState("")

    // como a grapichs era msm coisa da home, copiei do andre
    useEffect(() => {
        async function listing() {
            try {
                const id = localStorage.getItem("id")
                const response = await listPatient(id)
                setPatients(response)
            } catch (err) {
                console.log(err)
            }
        }
        listing()
    }, [])

    async function handlePesquisar() {
        if (!patientName) return
        try {
            const response = await searchPatient(patientName.toUpperCase())
            setPatients(Array.isArray(response) ? response : [])
        } catch (err) {
            console.log(err)
        }
    }

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
                                value={patientName}
                                setValue={setPatientName}
                                onEnter={handlePesquisar}
                            />
                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[20px] lg:text-[50px] grayscale-[50%] pointer-events-none">
                                🔍
                            </span>
                        </div>
                    </div>

                    {/* titulo tentativa alinhado */}
                    <div className="flex flex-col items-center lg:items-start mt-10 lg:mt-20 lg:ml-300 w-full lg:w-fit max-w-[800px] px-4 lg:px-0">
                        <h1 className="text-[30px] lg:text-[100px] font-lexenddeca font-bold text-gray-700 leading-tight text-center lg:text-left">
                            Selecione um Paciente
                        </h1>
                        <p className="text-[16px] lg:text-[40px] font-lexenddeca text-gray-400 opacity-80 text-center lg:text-left">
                            Escolha um paciente para visualizar o acompanhamento emocional
                        </p>
                    </div>

                    {/* lista de pacientes vinda do back, igual o homepage */}
                    <div className="flex flex-col gap-10 mb-[120px] items-center mt-20 lg:grid lg:grid-cols-4 lg:gap-x-0 lg:gap-y-30 lg:mt-60 lg:w-[60%] lg:items-center lg:ml-300">
                        {patients.map((patient) => (
                            <div key={patient.id} className="w-full flex flex-col items-center">
                                <PatientWidget
                                    Nome={patient.name}
                                    ProfilePhoto={patient.photo}
                                    Idade={patient.age}
                                    OnClickFunction={() => setSelectedPatient(patient)} // guarda o objeto inteiro
                                />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                /* tela de graficos */
                <div className="flex flex-col mt-10 p-4 mb-[120px] lg:mb-20 lg:ml-300 lg:pr-10">

                    <div className="flex justify-between items-center w-full mb-8">
                        <h1 className="lg:text-[100px] text-[30px] text-gray-400 font-lexenddeca">
                            Gráficos de {selectedPatient.name}
                        </h1>

                    </div>

                    {/* passa o id e o nome do paciente selecionado */}
                    <EmotionsChart
                        patientId={selectedPatient.id}
                        patientName={selectedPatient.name}
                    />
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










