export default function Input({PlaceHolder, Style, Type}){
    return(
        <>
            <input className={`${Style} transition transform hover:scale-110`} placeholder={PlaceHolder} type={Type}/>
        </>
    )
}