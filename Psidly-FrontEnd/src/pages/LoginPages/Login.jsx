import LoginBox from "../../components/Login/LoginBox"
import Title from "../../components/Titles/Title"

export default function Login(){
    return(
        <div className="w-full h-screen bg-linear-to-b from-[#ffffff] to-[#9AC8FF] flex flex-col items-center">
            <Title Style={'w-[25%] lg:w-[10%]'}/>
            <LoginBox/>
        </div>

    )
}