export default function Input({PlaceHolder, Style}){
    return(
        <>
            <input className={`${Style}`} placeholder={PlaceHolder}/>
        </>
    )
}