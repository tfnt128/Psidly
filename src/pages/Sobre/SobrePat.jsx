import { useNavigate } from "react-router-dom";
import HomemenuPat from "../../components/HomepagePat/HomemenuPat";
import HomemenuasidePat from "../../components/HomepagePat/HomemenuasidePat";


export default function SobrePat() {
    const navigator = useNavigate();

    return (
        <div className="min-h-screen font-lexenddeca">
            <div className="fixed lg:hidden bottom-0 left-0 w-full z-50">
                <HomemenuPat BgSelectPerfil={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%] z-50">
                <HomemenuasidePat BgSelectPerfil={"bg-quarternario"} />
            </div>

            <div className="flex flex-col items-center lg:ml-[10%] px-4 lg:px-20 py-8 lg:py-20 mb-[100px]">
                <div className="w-full max-w-[3000px] bg-secundario rounded-[20px] lg:rounded-[60px] p-6 lg:p-24 flex flex-col gap-8 lg:gap-16">
                    
                    <button
                        onClick={() => navigator("/profilepagepat")}
                        className="self-start text-primario font-bold text-lg lg:text-5xl uppercase tracking-widest hover:opacity-70 transition font-arboreto"
                    >
                        ← Voltar
                    </button>

                    <h1 className="text-primario text-center font-bold text-2xl lg:text-7xl uppercase tracking-widest font-arboreto">
                        Sobre o App
                    </h1>

                    <p className="text-primario text-base lg:text-5xl leading-relaxed font-inter">
                        O <strong className="font-lexenddeca">Psidly</strong> é uma aplicação web desenvolvida com o objetivo de auxiliar
                        no acompanhamento emocional de pacientes em conjunto com profissionais da psicologia.
                        A plataforma permite o registro diário de emoções por meio de autoavaliações,
                        possibilitando a análise contínua do estado emocional ao longo do tempo.
                    </p>

                    <p className="text-primario text-base lg:text-5xl leading-relaxed font-inter">
                        A aplicação foi projetada para facilitar a comunicação entre paciente e psicólogo,
                        permitindo que o profissional acompanhe as avaliações realizadas, registre observações
                        e identifique padrões comportamentais. Além disso, o sistema apresenta gráficos que
                        auxiliam na visualização das informações e no apoio à tomada de decisões durante o
                        processo terapêutico.
                    </p>

                    <p className="text-primario text-base lg:text-5xl leading-relaxed font-inter">
                        O Psidly <strong className="font-lexenddeca">não substitui</strong> o acompanhamento psicológico profissional,
                        mas atua como uma ferramenta de apoio, contribuindo para um acompanhamento mais
                        estruturado e eficiente.
                    </p>

                </div>
            </div>
        </div>
    );
}