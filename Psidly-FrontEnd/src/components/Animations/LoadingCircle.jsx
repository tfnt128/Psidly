import Lottie from "lottie-react";
import LoadingIcon from "../../assets/animations/loadingicon.json"

export default function LoadingCircle({Style}){

    return(
        <>
            <Lottie
                animationData={LoadingIcon}
                loop={true}
                autoPlay={true}/>
        </>
    )
}