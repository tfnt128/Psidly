import { useRef } from "react"
import Lottie from "lottie-react"

export default function Animation({AnimationOpt, Style}){

    const lottieRef = useRef()

    return(
        <div onMouseOver={()=>{lottieRef.current.play()}}
            onMouseLeave={()=>{lottieRef.current.stop()}}
            className={`${Style}`}>
                <Lottie
                lottieRef={lottieRef}
                animationData={AnimationOpt}
                loop={true}
                autoplay={false}/>
        </div>
    )
}