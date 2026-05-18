import { useState, useEffect } from "react";

export default function ShowPut({Label, Text, setValue, ReadOnly, Bg, Cancel, BorderBg, TextColor, Style}){

    const [value, setValue2] = useState(Text);

    useEffect(() => {
        setValue2(Text);
    }, [Text]);

    useEffect(() => {
        if(Cancel) setValue2(Text);
    }, [Cancel]);

    return(
        <div className={`border border-3 lg:border-10 lg:rounded-[30px] rounded-[15px] ${BorderBg} p-1 pl-2 lg:p-5 overflow-hidden ${Style} ${Bg}`}>
            <h1 className={`font-lexenddeca lg:text-[40px] text-[12px] ${TextColor}`}>{Label}</h1>
            <textarea
                className={`${Bg} lg:text-[40px] text-[15px] outline-none font-lexenddeca text-black pb-2 w-full h-[80%] resize-none`}
                value={value || ""}
                onChange={(e) => {
                    setValue2(e.target.value)
                    setValue?.(e.target.value)
                }}
                readOnly={ReadOnly}
            />
        </div>
    )
}