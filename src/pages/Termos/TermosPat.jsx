import { useNavigate } from "react-router-dom";
import Homemenu from "../../components/Homepage/Homemenu";
import Homemenuaside from "../../components/Homepage/Homemenuaside";

export default function TermosPat() {
    const navigator = useNavigate();

    const termosPat = [
        {
            titulo: "1. Uso da Plataforma",
            texto: "O sistema deve ser utilizado exclusivamente para fins de acompanhamento emocional e apoio ao processo terapêutico. Não é permitido o uso da plataforma para fins ilegais ou que violem normas éticas."
        },
        {
            titulo: "2. Responsabilidade do Usuário",
            texto: "O usuário é responsável pelas informações inseridas no sistema, incluindo dados pessoais e registros emocionais. Recomenda-se que as informações sejam fornecidas de forma verdadeira e consciente."
        },
        {
            titulo: "3. Privacidade e Segurança",
            texto: "Os dados inseridos no sistema são armazenados de forma segura e utilizados apenas para fins relacionados ao funcionamento da aplicação. O acesso às informações é restrito ao próprio usuário e ao psicólogo vinculado."
        },
        {
            titulo: "4. Limitações do Sistema",
            texto: "O Psidly não substitui acompanhamento médico ou psicológico profissional. As informações apresentadas no sistema têm caráter informativo e de apoio."
        },
        {
            titulo: "5. Alterações nos Termos",
            texto: "Os termos de uso podem ser atualizados a qualquer momento, sendo responsabilidade do usuário acompanhar eventuais mudanças."
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="fixed lg:hidden bottom-0 left-0 w-full z-50">
                <Homemenu BgSelectPerfil={"bg-quarternario"} />
            </div>
            <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%] z-50">
                <Homemenuaside BgSelectPerfil={"bg-quarternario"} />
            </div>

            <div className="flex flex-col items-center lg:ml-[10%] px-4 lg:px-20 py-8 lg:py-20 mb-[100px]">
                <div className="w-full max-w-[3000px] bg-secundario rounded-[20px] lg:rounded-[60px] p-6 lg:p-24 flex flex-col gap-8 lg:gap-16">

                    <button
                        onClick={() => navigator("/profilepagepat")}
                        className="self-start text-primario font-bold text-lg lg:text-5xl uppercase tracking-widest hover:opacity-70 transition"
                    >
                        ← Voltar
                    </button>

                    <h1 className="text-primario text-center font-bold text-2xl lg:text-7xl uppercase tracking-widest">
                        Termos de Uso
                    </h1>

                    {termosPat.map((item, index) => (

                        <div key={index} className="flex flex-col gap-3 lg:gap-6">
                            <h2 className="text-primario font-bold text-lg lg:text-5xl uppercase tracking-wide">
                                {item.titulo}
                            </h2>
                            <p className="text-primario text-base lg:text-5xl leading-relaxed">
                                {item.texto}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}


