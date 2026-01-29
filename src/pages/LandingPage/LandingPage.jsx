import Title from "../../components/Titles/Title"
import About from "./About"
import AdvcCard from "./AdvcCard"
import BeneCard from "./BeneCard"
import Heading from "./Heading"
import Navbar from "./Navbar"
import SmilingWoman from "./SmilingWoman"
import Cerebro from "../../assets/icons/cerebro.png"
import ThinkingW from "./ThinkingW"
import PlanCard from "./PlanCard"
import DownloadButton from "./DownlaodButton"
import AnimationD from "./AnimationD"
import SlideInView from "./SlideInView"
import Footer from "./Footer"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"


export default function LandingPage() {

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("PWA instalado");
    }

    setDeferredPrompt(null);
    setCanInstall(false);

    const navigate = useNavigate()
    navigate("/")
  };

  return (
    <div className="h-full bg-gradient-to-b from-white to-[#9AC8FF] flex flex-col items-center">
      
      <div className=" flex flex-col items-center lg:flex-row lg:gap-80">
          <Title Style={"w-[160px] lg:w-[300px] lg:mr-[90px]"}/>
          <Navbar idSobre={"#about"} 
          idBeneficios={"#beneficios"}
          idPlanos={"#planos"}
          idAjuda={"#ajuda"}
          idDownload={"#download"}/>
      </div>

      <div className={`flex flex-col items-center lg:flex-row lg:gap-30`}>
          <Heading ClassName={" mt-15 "}/>
          <SmilingWoman StyleFundo={"mt-[55px] lg:mt-[35px]"} StyleW={"w-[350px] lg:w-[700px] mt-[25px] mr-[10px] lg:mr-[12px] lg:mt-[-23px] "}/>
      </div>

      <section className="flex flex-col items-center lg:flex-row lg:mt-[130px]" id="about">

        <div className="flex flex-col items-center lg:hidden">
          <About Style={"mt-[80px] mb-[50px]"}/>
        </div>
        <div className="lg:ml-[10%]">
          <SlideInView delay={0}>
            <AdvcCard Text={"Melhore seu suporte extra consulta"}/>
          </SlideInView>
          
          <SlideInView delay={200}>
            <AdvcCard Text={"Avalie seus sentimentos"}/>
          </SlideInView>
          
          <SlideInView delay={400}>
            <AdvcCard Text={"Conheça melhor seu paciente"}/>
          </SlideInView>
        </div>

        <div className=" flex-col items-center hidden lg:flex">
            <About Style={"mt-[30px] mb-[50px]"}/>
        </div>

      </section>

      <section className="flex flex-col items-center mt-[60px] lg:mt-[40px]" id="beneficios">
          <h1 className="font-aboreto color-quarteriario text-[22px] lg:text-[27px] ">Benefícios</h1>
          <div className="flex lg:flex-row flex-col items-center lg:gap-80 mt-[30px] lg:mt-[50px]">
            <SlideInView delay={0}>
              <BeneCard 
              Style=" w-[290px] h-[550px] lg:w-[435px] "
              Title="Para Psicólogos"
              item1="Acompanhe o dia a dia emocional do seu paciente."
              item2="Gerencie melhor seus pacientes com uma área de trabalho com os widgets representando cada um deles."
              item3="Tenha uma maior agilidade com as emoções de seus clientes quantificadas de 0 a 10."
              item4="Adicione comentários sobre a avaliação do paciente."
              item5="Para uma visão mais panorâmica, acesse uma aba com gráficos formatados de acordo com os sentimentos do seu cliente em um período de tempo."/>
            </SlideInView>
            <img src={Cerebro} className="w-[180px] mt-[10px] lg:w-[400px]"/> 
          </div>
          <div className="flex flex-col items-center lg:flex-row lg:mt-[100px]">
            <ThinkingW StyleFundo={"mt-[55px] lg:mt-[238px] mr-[330px]"} StyleW={"w-[350px] lg:w-[700px] mt-[25px] mr-[10px] lg:mr-[570px] lg:mt-[-23px] "}/>
            <SlideInView>
              <BeneCard 
              Style="w-[290px] h-[430px]  lg:w-[420px]"
              Title="Para pacientes"
              item1="Tenha um acompanhamento extra consulta mais rápido e consistente."
              item2="Avalie suas emoções de forma rápida e fácil."
              item3="Expresse seus sentimentos do dia em suas observações diárias."
              item4="Conte com comentários de seu psicólogo para te ajudar nos desafios do dia a dia"
              item5="Tudo isso com praticidade e segurança para suas consultas"
              />
            </SlideInView>
          </div>
      </section>

      <section className="mt-[110px] bg-terciario lg:h-[550px] h-[450px] w-full flex flex-col items-center" id="planos">
          <h1 className="font-aboreto color-terciario text-[22px] lg:text-[27px] mt-[25px]">Planos</h1>
          <div className="flex flex-row items-center lg:gap-5 gap-2 mt-[30px]">
            <PlanCard 
              Style="w-[180px] lg:w-[300px] h-[280px] lg:h-[320px]" 
              Title="Freemium" 
              item1=" Acesso aos gráficos de emoções" 
              item2=" Sem uso de inteligência artificial na área dos gráficos"
              int="00"
              cent=",00"
              StyleP2="ml-[10px] lg:ml-[18px]"
            />
            <PlanCard 
              Style="w-[180px] lg:w-[300px] h-[300px] lg:h-[370px]" 
              Title="Premium" 
              item1=" Acesso aos gráficos de emoções" 
              item2=" Auxílio de uma inteligência artificial para resumir e verbalizar gráficos"
              int="19"
              cent=",00"
              StyleP2="ml-[17px]"
            />
          </div>
      </section>

      <section className="flex flex-col items-center" id="download">
        <div className="flex flex-col items-center mt-[60px] lg:mt-[100px] mb-[20px]">
          <h1 className="font-inter mr-[90px] text-[22px]">Clique no botão abaixo e </h1>
          <h1 className="font-aboreto color-secundario ml-[50px] text-[40px]">Baixe agora!</h1>
        </div>

        <AnimationD/>
        <DownloadButton Style="w-[90%] h-[80px] text-white mt-[40px] bg-terciario rounded-[35px] mb-[100px] font-aboreto text-[23px]  transition-all duration-300 hover:shadow-[0_0_30px_rgba(154,200,255,0.8)] hover:scale-105" 
        Text="Download"
        onClickFunction={handleInstallPWA}/>
      </section>
      
      <section className="flex flex-col items-center" id="ajuda">
        <div className="flex flex-col items-center mt-[60px] lg:mt-[40px] mb-[20px]">
          <h1 className="font-inter mr-[140px] lg:text-[32px] lg:mr-[250px] text-[22px] text-white">Tem dúvidas?</h1>
          <h1 className="font-aboreto lg:w-[70%] color-secundario mt-[1px] ml-[50px] lg:ml-[70px] text-[40px] lg:text-[60px] color-quarternario text-center">Precisa de ajuda?</h1>
        </div>
        <div className="w-[70%] h-[90px] lg:mt-[30px] p-2 rounded-[20px] bg-amber-50 flex flex-col items-center">
          <h1 className="font-inter color-quarternario">Envie um e-mail para</h1>
          <h1><a href="mailto:psidly@gmail.com" className="font-inter color-quarternario text-[25px] mt-[5px]">psidly@gmail.com</a></h1>
        </div>
      </section>

      <Footer/>
    </div>
  )
}