export default function Button({Text, Style, OnClickFunction, Src, ImgStyle}){
    return(
        <>
            <button className={`${Style}`} onClick={OnClickFunction}>
                <img src={Src} className={ImgStyle}/>
                {Text}
                </button>
        </>
    )
}