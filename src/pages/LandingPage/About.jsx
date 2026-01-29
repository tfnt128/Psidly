export default function About({Style}){

    return(
        <div className={` ${Style} flex flex-col items-center w-[80%] lg:w-[60%]`}>
            <h1 className="font-aboreto color-quarternario text-[27px] text-center lg:text-[40px]">O que é o Psidly?</h1>
            <h3 className="font-inter color-quarternario text-center mt-[30px] w-[83%] lg:w-[100%] text-[13px] lg:text-[20px] lg:text-start">
                Psidly é um aplicativo que conecta pacientes e psicólogos para um melhor suporte “extra sessão”. O paciente avalia, diariamente, suas emoções em uma escala de 0 a 10 e deixa observações sobre o seu dia. O psicólogo acompanha essas avaliações no formato da avaliação feita pelo paciente ou até mesmo através de gráficos e pode deixar comentários de apoio em cada avaliação quando necessário. Isso resolve o problema de esquecer acontecimentos importantes durante as consultas e permite que o profissional tenha uma visão completa do estado emocional do paciente ao longo do tempo, tornando as sessões mais produtivas e o cuidado mais contínuo.
            </h3>
        </div>
    )
}