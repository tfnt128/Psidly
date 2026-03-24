import ProfilePhoto from "../../assets/icons/dudaaraujo.jpg"
import { useState, useRef } from "react";
import Input from "../General/Input";
import Button from "../General/Button"
import LoadingCircle from "../Animations/LoadingCircle";
import ShowPut from "../General/ShowPut";

export default function PatientDetails(){


    return(
        <div className="relative bg-quarternario h-[650px] lg:h-[2000px] lg:w-[3000px] w-[350px] flex flex-col items-center lg:flex-row lg:rounded-[150px] rounded-[30px]">
            <div className="lg:w-[50%] w-[100%] flex flex-col items-center gap-5 mt-5 lg:mt-0 lg:gap-15">
                <img src={ProfilePhoto} className="w-24 lg:w-88 lg:h-88 h-24 rounded-full object-cover cursor-pointer lg:mt-10 lg:mb-30"/>
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