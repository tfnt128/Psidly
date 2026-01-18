export default function PlanCard({Style, Title, item1, item2, int, cent, StyleP2 }){
    return(
        <div className={`${Style} bg-plan flex flex-col items-center rounded-[20px] lg:rounded-[40px] transition-all duration-300 hover:shadow-[0_0_30px_rgba(154,200,255,0.8)] hover:scale-105 `}>
            <h1 className="font-aboreto color-quarternario mt-[10px] text-[27px]">{Title}</h1>
            <p className="font-inter color-quarternario text-[15px] lg:text-[17px] ml-[13px] mt-[10px]">• {item1}</p>
            <p className={`font-inter color-quarternario text-[15px] lg:text-[17px]  mt-[10px] ${StyleP2}`}>• {item2}</p>
            <div className="flex flex-row items-center text-center lg:mt-[50px] ">
                <p className="color-quarternario font-aboreto text-[60px]">{int}</p>
                <p className="color-quarternario font-aboreto mb-[10px]">{cent}</p>
                <p className="color-quarternario font-aboreto mt-[10px]">/mês</p>
            </div>
        </div>
    )
}