export default function DownloadButton({Style, Text, onClickFunction}){

    return(
        <button onClick={onClickFunction} className={`${Style}`}>
            {Text}
        </button>
    )
}