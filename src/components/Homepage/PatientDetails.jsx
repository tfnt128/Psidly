import ProfilePhoto from "../../assets/icons/dudaaraujo.jpg"
import { useState, useRef } from "react";
import Input from "../General/Input";
import Button from "../General/Button"
import LoadingCircle from "../Animations/LoadingCircle";
import ShowPut from "../General/ShowPut";

export default function PatientDetails(){


    return(
        <div className="relative bg-quarternario h-[830px] lg:h-[2300px] lg:w-[3000px] w-[350px] flex flex-col lg:flex-row lg:rounded-[150px] rounded-[30px]">
            <div className="w-[50%] flex flex-col items-center gap-15">
                <img src={ProfilePhoto} className="w-24 lg:w-68 lg:h-68 h-24 rounded-full object-cover cursor-pointer mt-40"/>
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