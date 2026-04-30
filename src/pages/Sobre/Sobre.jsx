import { useNavigate } from "react-router-dom";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";

export default function Sobre() {
    const navigator = useNavigate();

    return (
        <div className="min-h-screen">
            <div className="fixed lg:hidden bottom-0 left-0 w-full z-50">
                <Homemenu BgSelectPerfil={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%] z-50">
                <Homemenuaside BgSelectPerfil={"bg-quarternario"} />
            </div>

            <div className="flex flex-col items-center lg:ml-[10%] px-20 py-20 mb-[100px]">
                <div className="w-full max-w-[3000px] bg-secundario rounded-[60px] p-24 flex flex-col gap-16">
                    
                    <button
                        onClick={() => navigator("/profilepage")}
                        className="self-start text-primario font-bold text-5xl uppercase tracking-widest hover:opacity-70 transition"
                    >
                        ← Voltar
                    </button>

                    <h1 className="text-primario text-center font-bold text-7xl uppercase tracking-widest">
                        Sobre o App
                    </h1>

                    <p className="text-primario text-5xl leading-relaxed">
                        O <strong>Psidly</strong> é uma aplicação web desenvolvida com o objetivo de auxiliar
                        no acompanhamento emocional de pacientes em conjunto com profissionais da psicologia.
                        A plataforma permite o registro diário de emoções por meio de autoavaliações,
                        possibilitando a análise contínua do estado emocional ao longo do tempo.
                    </p>

                    <p className="text-primario text-5xl leading-relaxed">
                        A aplicação foi projetada para facilitar a comunicação entre paciente e psicólogo,
                        permitindo que o profissional acompanhe as avaliações realizadas, registre observações
                        e identifique padrões comportamentais. Além disso, o sistema apresenta gráficos que
                        auxiliam na visualização das informações e no apoio à tomada de decisões durante o
                        processo terapêutico.
                    </p>

                    <p className="text-primario text-5xl leading-relaxed">
                        O Psidly <strong>não substitui</strong> o acompanhamento psicológico profissional,
                        mas atua como uma ferramenta de apoio, contribuindo para um acompanhamento mais
                        estruturado e eficiente.
                    </p>

                </div>
            </div>
        </div>
    );
}