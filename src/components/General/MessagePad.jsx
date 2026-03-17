 import Button from "./Button"

export default function MessagePad({Text, textButton, OnClickFunction, Style, Slide}){

    return(
        <div className={`w-full h-[20%] rounded-t-[50px] lg:rounded-r-[100px] lg:h-full lg:w-[20%] bg-quarternario flex flex-col items-center ${Slide} ${Style} fixed bottom-0 left-0 `}>
            <h1 className="font-lexxenddeca  color-primario text-[20px] mt-5">{Text}</h1>
            <Button Style={"bg-terciario text-white font-aboreto rounded-[10px] mt-5 w-[30%] h-[60px]"} Text={textButton} OnClickFunction={OnClickFunction}/>    
        </div>
    )
}