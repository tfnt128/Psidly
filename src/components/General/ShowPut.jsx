import Input from "./Input"
import { useState, useEffect } from "react";

export default function ShowPut({Label, Text, ReadOnly, Bg, Cancel, BorderBg, TextColor, Style}){

    const [value, setValue] = useState(Text);

    useEffect(() => {
        if(Cancel) setValue(Text);
    }, [Cancel]);

    
    

    return(
        <div className={`border border-3 ${BorderBg} ${Style} lg:border-7 lg:rounded-[30px] rounded-[15px] border-blue-300 p-1 pl-2 lg:p-5 ${Bg}`}>
            <h1 className={`font-lexenddeca lg:text-[40px] text-[12px] ${TextColor}`}>{Label}</h1>
            <input className={`${Bg} lg:text-[40px] text-[15px] outline-none font-lexenddeca text-black `} 
            value={value}
            onChange={(e)=> {setValue(e.target.value)}} 
            readOnly={ReadOnly}/>
            {/* <Input Style={"bg-quarternario lg:text-[40px] text-[15px]"} PlaceHolder={Text} /> */}
            {/* <h1 className="font-lexenddeca lg:text-[40px] text-[15px]">{Text}</h1> */}
        </div>
    )

}