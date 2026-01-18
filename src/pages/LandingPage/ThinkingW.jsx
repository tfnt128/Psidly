import ThinkingWo from "../../assets/icons/ThinkingW.png"
import fundoThinkingW from "../../assets/icons/fundoThinkingW.png"

export default function ThinkingW({StyleFundo, StyleW}){
    return(

        <div className=" lg:flex flex-col items-center hidden">
            <img
                src={fundoThinkingW}
                className={`w-[200px] lg:w-[400px] ${StyleFundo}`}
            />

            <img
                src={ThinkingWo}
                className={`absolute ${StyleW} `}
            />
        </div>

    )

}