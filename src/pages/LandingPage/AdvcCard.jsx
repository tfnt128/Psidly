export default function AdvcCard({Text, Style}){
    return(
        <div className={`w-[290px] lg:w-[435px] h-[80px] lg:h-[120px] bg-terciario rounded-[20px] lg:rounded-[30px] mb-[20px] flex flex-col items-center justify-center p-[10px] ${Style}`}>
            <h1 className={`font-aboreto color-terciario text-center lg:text-[20px]`}>{Text}</h1>
        </div>

    )    
}