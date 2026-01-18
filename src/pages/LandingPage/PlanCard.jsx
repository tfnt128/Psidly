export default function({Style, Title, item1, item2, int, cent, }){
    return(
        <div className={`${Style} bg-plan flex flex-col items-center rounded-[20px] rounded-[40px]`}>
            <h1 className="font-aboreto color-quarternario mt-[10px] text-[27px]">{Title}</h1>
            <p className=" font-inter color-quarternario text-[15px] lg:text-[17px] ml-[13px] mt-[10px]">{item1}</p>
            <p className=" font-inter color-quarternario text-[15px] lg:text-[17px] ml-[13px] lg:ml-[] lg:mt-[10px]">{item2}</p>
            <div className="flex flex-row items-center text-center lg:mt-[50px] ">
                <p className="color-quarternario font-aboreto text-[60px]">{int}</p>
                <p className="color-quarternario font-aboreto mb-[10px]">{cent}</p>
                <p className="color-quarternario font-aboreto mt-[10px]">/mês</p>
            </div>
        </div>
    )
}