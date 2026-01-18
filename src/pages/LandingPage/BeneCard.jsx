export default function BeneCard({Style, Title, item1, item2, item3, item4, item5, textStyle}){
    return(
        <div className={`${Style}  bg-terciario rounded-[30px] lg:rounded-[40px] flex flex-col items-center`}>
            <h1 className="font-aboreto color-terciario pt-[15px]">{Title}</h1>
            <div className="pl-5 pt-5 flex flex-col items-center gap-4 lg:gap-6 text-white font-inter text-[15px] lg:text-[16px] w-[90%]">
                <p>1. {item1}</p>
                <p>2. {item2}</p>
                <p>3. {item3}</p>
                <p>4. {item4}</p>
                <p>5. {item5}</p>
            </div>


        </div>
    )
}