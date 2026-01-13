import SmilingW from "../../assets/icons_landingpage/feliz-removebg-preview.png"
import FundoSmilingW from "../../assets/icons_landingpage/fundomulhersorrindo.png"

export default function SmilingWoman({ClassName}){
    return(
    <div className="relative">
        <img
            src={FundoSmilingW}
            className="aw-full"
        />

        <img
            src={SmilingW}
            className="absolute top-12 w-[400px] "
        />
    </div>
    )

}