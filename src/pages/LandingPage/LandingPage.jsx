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

export default function LandingPage() {
  return (
    <div className="h-full bg-gradient-to-b from-white to-[#9AC8FF] flex flex-col items-center">
      
      <div className=" flex flex-col items-center lg:flex-row lg:gap-80">
          <Title Style={"w-[160px] lg:w-[300px] lg:mr-[90px]"}/>
          <Navbar idSobre={"#about"} 
          idBeneficios={"#beneficios"}
          idPlanos={"#planos"}/>
      </div>

      <div className={`flex flex-col items-center lg:flex-row lg:gap-30`}>
          <Heading ClassName={" mt-15 "}/>
          <SmilingWoman StyleFundo={"mt-[55px] lg:mt-[35px]"} StyleW={"w-[350px] lg:w-[700px] mt-[25px] mr-[10px] lg:mr-[12px] lg:mt-[-23px] "}/>
      </div>

      <section className="flex flex-col items-center lg:flex-row lg:mt-[130px]" id="about">

        <div className="flex flex-col items-center lg:hidden">
          <About Style={"mt-[80px] mb-[50px]"}/>
        </div>
        <div className="lg:ml-[10%] ">
          <AdvcCard Text={"Melhore seu suporte extra consulta"}/>
          <AdvcCard Text={"Avalie seus sentimentos"}/>
          <AdvcCard Text={"Conheça melhor seu paciente"}/>
        </div>

        <div className=" flex-col items-center hidden lg:flex">
            <About Style={"mt-[30px] mb-[50px]"}/>
        </div>

      </section>

      <section className="flex flex-col items-center mt-[60px] lg:mt-[40px]" id="beneficios">
          <h1 className="font-aboreto color-quarteriario text-[22px] lg:text-[27px] ">Benefícios</h1>
          <div className="flex lg:flex-row flex-col items-center lg:gap-80 mt-[30px] lg:mt-[50px]">
            <BeneCard 
              Style=" w-[290px] h-[550px] lg:w-[435px] "
              Title="Para Psicólogos"
              item1="Acompanhe o dia a dia emocional do seu paciente."
              item2="Gerencie melhor seus pacientes com uma área de trabalho com os widgets representando cada um deles."
              item3="Tenha uma maior agilidade com as emoções de seus clientes quantificadas de 0 a 10."
              item4="Adicione comentários sobre a avaliação do paciente."
              item5="Para uma visão mais panorâmica, acesse uma aba com gráficos formatados de acordo com os sentimentos do seu cliente em um período de tempo."/>
            <img src={Cerebro} className="w-[180px] mt-[10px] lg:w-[400px]"/> 
          </div>
          <div className="flex flex-col items-center lg:flex-row lg:mt-[100px]">
            <ThinkingW StyleFundo={"mt-[55px] lg:mt-[238px] mr-[330px]"} StyleW={"w-[350px] lg:w-[700px] mt-[25px] mr-[10px] lg:mr-[570px] lg:mt-[-23px] "}/>
            <BeneCard 
              Style="w-[290px] h-[430px]  lg:w-[420px]"
              Title="Para pacientes"
              item1="Tenha um acompanhamento extra consulta mais rápido e consistente."
              item2="Avalie suas emoções de forma rápida e fácil."
              item3="Expresse seus sentimentos do dia em suas observações diárias."
              item4="Conte com comentários de seu psicólogo para te ajudar nos desafios do dia a dia"
              item5="Tudo isso com praticidade e segurança para suas consultas"
              />
          </div>
      </section>

      <section className="mt-[110px] bg-terciario lg:h-[550px] h-[450px] w-full flex flex-col items-center" id="planos">
          <h1 className="font-aboreto color-terciario text-[22px] lg:text-[27px] mt-[25px]">Planos</h1>
          <div className="flex flex-row items-center lg:gap-5 gap-2 mt-[30px]">
            <PlanCard 
              Style="w-[180px] lg:w-[300px] h-[250px] lg:h-[320px]" 
              Title="Freemium" 
              item1=" Acesso aos gráficos de emoções" 
              item2=" Sem uso de inteligência artificial"
              int="00"
              cent=",00"
              StyleP2="ml-[10px] lg:ml-[4px]"
            />
            <PlanCard 
              Style="w-[180px] lg:w-[300px] h-[300px] lg:h-[370px]" 
              Title="Premium" 
              item1=" Acesso aos gráficos de emoções" 
              item2=" Auxilio de uma inteligência artificial para resumir e verbalizar gráficos"
              int="19"
              cent=",00"
              StyleP2="ml-[17px]"
            />
          </div>
      </section>

      <section className="flex flex-col items-center">
        <div className="flex flex-col items-center mt-[60px] lg:mt-[150px]">
          <h1 className="font-inter mr-[90px] text-[22px]">Clique no botão abaixo e </h1>
          <h1 className="font-aboreto color-secundario ml-[50px] text-[40px]">Baixe agora!</h1>
        </div>

        <DownloadButton Style="w-[90%] h-[80px] text-white mt-[40px] bg-terciario rounded-[35px] font-aboreto text-[23px]" Text="Download"/>
      </section>
    </div>
  )
}