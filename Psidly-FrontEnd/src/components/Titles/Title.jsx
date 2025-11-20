import LogoPsidly from "../../assets/titles/logo_psidly.png";

export default function Title({Style}){

    return(
        <>
            <img src={LogoPsidly} className={`${Style}`}/>
        </>
    )
}