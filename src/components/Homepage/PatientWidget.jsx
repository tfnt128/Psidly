import ProfilePhoto from "../../assets/icons/dudaaraujo.jpg"
import Button from "../General/Button"

export default function PatientWidget({OnClickFunction}){
    return(
        <div className="w-[80%] lg:w-[700px] lg:rounded-[80px] lg:h-[800px] h-[300px] bg-blue-300 rounded-[30px] flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_40px_10px_rgba(59,130,246,0.6)] cursor-pointer"
        onClick={OnClickFunction}>
            <div className="relative w-full h-[70%]">
                <img src={ProfilePhoto} className="w-full h-full rounded-t-[30px] lg:rounded-t-[80px] object-cover"/>
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-blue-300 to-transparent"/>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-[20px] lg:text-[50px] font-aboreto mt-3 text-blue-900">Duda • 20 anos</h1>
                {/* <Button Style="w-[300px]  h-[100px] bg-quarternario text-[40px] rounded-[20px] mt-5 hover:bg-white hover:text-blue-900 transition-transform duration-300 cursor-pointer ease-in-out" Text={"Detalhes"}/> */}
            </div>
        </div>
    )
}