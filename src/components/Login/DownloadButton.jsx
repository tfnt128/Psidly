export default function DownloadButton({Style, Text, onClickFunction}){

    return(
        <>
            <button className={Style} onClick={onClickFunction} >{Text}</button>
        </>
    )
}