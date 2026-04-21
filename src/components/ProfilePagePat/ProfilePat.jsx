import ProfilePhoto from "../../assets/icons/simbperfil.png"
import ShowPut from "../General/ShowPut"

export default function ProfilePat({}){

    return(
        <div className="w-[115%] lg:w-[2100px] h-[320px] lg:h-[1150px] lg:ml-[850px] lg:mt-[3%] mt-[7%] flex flex-col lg:flex-col items-center bg-quarternario rounded-[20px] lg:rounded-[100px]">
            <h1 className="font-aboreto lg:text-[70px] mt-5 color-quarternario">Meu perfil</h1>
            <img
                src={ ProfilePhoto}
                className="lg:w-[400px] lg:h-[400px] h-[100px] rounded-full object-cover group-hover:brightness-50 transition duration-300"
            />
            
            <ShowPut  BorderBg={"border-blue-300"} TextColor={"text-blue-300"} Style={"w-[300px] h-[65px] lg:w-[1400px] lg:h-[200px] hover:transform hover:scale-110 hover:duration-300"}  Label={"Nome"} />
            <ShowPut  BorderBg={"border-blue-300"} TextColor={"text-blue-300"} Style={"w-[300px] lg:mt-20 mt-5 h-[65px] lg:w-[1400px] lg:h-[200px] hover:transform hover:scale-110 hover:duration-300"}  Label={"Email"} />
        </div>
    )
}