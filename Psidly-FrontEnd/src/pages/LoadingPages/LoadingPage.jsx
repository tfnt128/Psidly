
import { useEffect } from "react"
import LoadingCircle from "../../components/Animations/LoadingCircle"
import Title from "../../components/Titles/Title"
import { useNavigate } from "react-router-dom"

export default function LoadingPage(){

    const navigate = useNavigate();
    useEffect(
        ()=>{
            const sumirTela = setTimeout(()=>{
                navigate('/login')
            },5000)

            return ()=> clearTimeout(sumirTela);
        }, []
    )
     
    return(
        <div className=" bg-loading flex flex-col items-center w-full min-h-screen">
            <div className=" mt-[200px] lg:mt-[120px] flex flex-col items-center">
                <Title Style={"lg:w-[1400px]"}/>
                <LoadingCircle Style={'w-[40%] mt-[-25%] lg:mt-[-15%]'}/>
                <h1 className="font-aboreto color-secundario lg:mt-[10%] lg:text-[60px]">Cuidar, suportar e agilizar</h1>
            </div>
        </div>
     )
}