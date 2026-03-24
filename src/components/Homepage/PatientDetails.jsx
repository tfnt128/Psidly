import ProfilePhoto from "../../assets/icons/dudaaraujo.jpg"
import { useState, useRef } from "react";
import Input from "../General/Input";
import Button from "../General/Button"
import LoadingCircle from "../Animations/LoadingCircle";
import ShowPut from "../General/ShowPut";

export default function PatientDetails(){

    const [options, setOptions] = useState(false)

    function openOptions(){
        setOptions(true)
    }



    return(
        <div className="relative bg-quarternario h-[650px] lg:h-[2000px] lg:w-[3000px] w-[350px] flex flex-col items-center lg:flex-row lg:rounded-[150px] rounded-[30px]"
            onClick={() => setOptions(false)}>
            
            <div className="relative lg:w-[50%] w-[100%] flex flex-col items-center gap-5 mt-5 lg:mt-0 lg:gap-15">
                {
                    options &&
                        <div className="absolute  top-4 animate-slide-down right-4 mr-60 mt-[-100px] w-[400px] h-[300px] rounded-[25px] bg-white"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="w-full flex flex-col items-center text-[30px] cursor-pointer justify-center h-[33%] hover:bg-blue-200 rounded-t-[25px]">Editar</div>
                            <div className="w-full flex flex-col items-center text-[30px] cursor-pointer justify-center h-[33%] hover:bg-blue-200">Excluir</div>
                            <div className="w-full flex flex-col items-center text-[30px] cursor-pointer justify-center h-[33%] hover:bg-blue-200 rounded-b-[25px]">Ocultar</div>
                        </div>
                }
                <p className="absolute top-4 right-4 lg:text-[70px] cursor-pointer text-white mr-55 mt-[-150px]"
                    onClick={(e) => { e.stopPropagation(); openOptions(); }}>⋮</p>
                <img src={ProfilePhoto} className="w-24 lg:w-88 lg:h-88 h-24 rounded-full object-cover cursor-pointer lg:mt-2 lg:mb-30"/>
                <ShowPut Label={"Nome"} Text={"Duda Araujo do Santos"}/>
                <ShowPut Label={"CPF"} Text={"47218802869"}/>
                <ShowPut Label={"E-mail"} Text={"duda@gmail.com"}/>
                <ShowPut Label={"Data de Nascimento"} Text={"10/09/2001"}/>
                <ShowPut Label={"Convênio"} Text={"Prevent Senior"}/>
            </div>
            <div className="w-[50%] flex flex-col items-center">

            </div>

        </div>
    )
}