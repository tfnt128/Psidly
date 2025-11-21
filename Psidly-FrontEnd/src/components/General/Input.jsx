export default function Input({PlaceHolder, Style, Type}){
    return(
        <>
            <input className={`${Style}`} placeholder={PlaceHolder} type={Type}/>
        </>
    )
}