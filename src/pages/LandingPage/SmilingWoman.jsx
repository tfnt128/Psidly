import SmilingW from "../../assets/icons_landingpage/feliz-removebg-preview.png"
import FundoSmilingW from "../../assets/icons_landingpage/fundomulhersorrindo.png"

export default function SmilingWoman({ClassName, StyleFundo, StyleW}){
    return(
    <div className=" flex flex-col items-center">
        <img
            src={FundoSmilingW}
            className={`w-[200px] lg:w-[400px] ${StyleFundo}`}
        />

        <img
            src={SmilingW}
            className={`absolute ${StyleW} `}
        />
    </div>
    )

}