 import Button from "./Button"

export default function MessagePad({Text, textButton, OnClickFunction, Style, Slide}){

    return(
        <div className={`w-full h-[20%] rounded-t-[50px] lg:rounded-r-[100px] lg:h-full lg:w-[20%] bg-quarternario flex flex-col items-center ${Slide} ${Style} fixed bottom-0 left-0 justify-center`}>
            <h1 className="font-lexxenddeca  color-primario text-[20px] lg:text-[60px] mt-5">{Text}</h1>
            <Button Style={"bg-terciario text-white text-[10px] lg:text-[30px] font-aboreto lg:w-[50%] lg:h-[170px] lg:rounded-[30px] lg:mt-10 rounded-[10px] mt-5 w-[30%] h-[60px] hover:bg-white hover:text-black transition-transform duration-400 ease-in-out"} Text={textButton} OnClickFunction={OnClickFunction}/>    
        </div>
    )
}