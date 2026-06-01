import { useNavigate } from "react-router-dom";
import HomemenuPat from "../../components/HomepagePat/HomemenuPat";
import HomemenuasidePat from "../../components/HomepagePat/HomemenuasidePat";
import { useTranslation } from 'react-i18next';

export default function SobrePat() {
    const navigator = useNavigate();
    const { t } = useTranslation();

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
                        ← {t('voltar')}
                    </button>

                    <h1 className="text-primario text-center font-bold text-2xl lg:text-7xl uppercase tracking-widest font-arboreto">
                        {t('sobreOApp')}
                    </h1>

                    <p className="text-primario text-base lg:text-5xl leading-relaxed font-inter">
                        {t('sobreDescricao1')}
                    </p>

                    <p className="text-primario text-base lg:text-5xl leading-relaxed font-inter">
                        {t('sobreDescricao2')}
                    </p>

                    <p className="text-primario text-base lg:text-5xl leading-relaxed font-inter">
                        {t('sobreDescricao3')}
                    </p>

                </div>
            </div>
        </div>
    );
}