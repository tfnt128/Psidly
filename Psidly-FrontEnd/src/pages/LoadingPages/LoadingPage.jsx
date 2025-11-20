import LoadingBgImg from "../../assets/bg-images/bgicarregamento.png"
import LoadingCircle from "../../components/Animations/LoadingCircle"
import Title from "../../components/Titles/Title"

export default function LoadingPage(){
     
    return(
        <div className=" flex flex-col items-center w-full min-h-screen" 
        style={{backgroundImage:`url(${LoadingBgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'}}>
            <div className="mt-[50%] flex flex-col items-center">
                <Title/>
                <LoadingCircle Style={'w-[40%] mt-[-25%]'}/>
                <h1 className="font-aboreto color-secundario">Cuidar, suportar e agilizar</h1>

            </div>
            
            
        </div>
     )
}