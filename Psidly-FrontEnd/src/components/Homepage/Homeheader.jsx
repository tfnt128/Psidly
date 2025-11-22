import Title from "../Titles/Title"

export default function Homeheader(){
    return(
        // <div className="flex flex-col items-center bg-linear-to-l  to-[#13295F] from-[#9AC8FF] h-[300px] w-full">
        //     <Title Style={"w-[400px]"}/>
        // </div>
        <div className="flex flex-row items-center lg:h-[300px] h-[80px] w-full">
            <div className="bg-terciario w-[20%] h-full">
            </div>
            <div className="bg-quarternario w-[15%] h-full">
            </div>
            <div className="bg-secundario w-[30%] h-full flex flex-col items-center">
                <Title/>
            </div>
            <div className="bg-quarternario w-[15%] h-full">
            </div>
            <div className="bg-terciario w-[20%] h-full">
            </div>
        </div>
    )
}