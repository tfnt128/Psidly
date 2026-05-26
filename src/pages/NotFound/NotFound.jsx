import NotFoundImg from "../../assets/icons/404img.png"

export default function NotFound({}){
    return(
        <div className="flex flex-col items-center justify-center">
            <img src={NotFoundImg} className="h-[200px] lg:h-[900px] "/>
            <h1 className="font-aboreto lg:text-[50px] text-[20px]">Page Not Found</h1>
        </div>
    )
}