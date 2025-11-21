export default function Button({Text, Style, OnClickFunction}){
    return(
        <>
            <button className={`${Style}`} onClick={OnClickFunction}>{Text}</button>
        </>
    )
}