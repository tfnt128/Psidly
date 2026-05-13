import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomemenuPat from "../../components/HomepagePat/HomemenuPat";
import HomemenuasidePat from "../../components/HomepagePat/HomemenuasidePat";
import ProfilePat from "../../components/ProfilePagePat/ProfilePat";
import ProfilePsi from "../../components/ProfilePagePat/ProfilePsi";
import Share from "../../components/Profilepage/Share";
import Boxoption from "../../components/Profilepage/Boxoption";
import Book from "../../assets/animations/Book.json"
import Talk from "../../assets/animations/Talk.json"
import Locker from "../../assets/animations/locker.json"
import Write from "../../assets/animations/Write.json"

import { useTranslation } from "react-i18next";



export default function Profilepagepat(){
    const {t} = useTranslation()

    const navigator = useNavigate();

    function goToEmail(){
        window.location.href = "mailto:suporte@psidly.com?subject=Contato Psidly";
    }


    function goToAbout(){
        navigator("/sobrePat");
    }

    function goToTermos(){
        navigator("/termosPat");
    }

    return(
        <div>
            
            <div className="min-h-screen flex flex-col">
                        <div className="fixed lg:hidden bottom-0 left-0 w-full z-50">
                            <HomemenuPat BgSelectPerfil={"bg-quarternario"}/>
                        </div>
                        <div className="hidden lg:flex lg:fixed bottom-0 left-0 h-full w-[10%]">
                            <HomemenuasidePat BgSelectPerfil={"bg-quarternario"} />
                        </div>
                        <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-30">
                            <div className="flex flex-col items-center gap-2">
                                <ProfilePat/>
                                <ProfilePsi/>
                            </div>
                            <div className="grid grid-cols-2 mb-[100px] lg:grid-cols-2 lg:w-[2100px] w-[85%] gap-4 content-start lg:mt-[0px] lg:gap-60">
                                <Boxoption tituloOpt={t('sobreApp')} AnimationOption={Book} Style={"lg:mt-[-150px] mt-[3px]"}/>
                                <Boxoption tituloOpt={t('contato')} AnimationOption={Talk} Style={"lg:mt-[-150px]  mt-[3px]"} onClickWay={goToEmail}/>
                                <Boxoption tituloOpt={t('privacidade')} AnimationOption={Locker} Style={"lg:mt-[-150px] mt-[3px]"}/>
                                <Boxoption tituloOpt={t('termos')} AnimationOption={Write} Style={"lg:mt-[-150px] mt-[3px]"}/>
                                <Share Style={"lg:w-[2280px] lg:h-[800px] w-[370px] lg:rounded-[50px] rounded-[20px] bg-secundario lg:mt-[-120px] hover:transition hover:transform hover:scale-105 duration-300"}/>
                            </div>

                        </div>

                        <Share Style={"lg:w-[2280px] lg:h-[800px] w-[370px] lg:rounded-[50px] rounded-[20px] bg-secundario lg:mt-[-120px] hover:transition hover:transform hover:scale-105 duration-300"}/>
                    </div>
                </div>
    )}