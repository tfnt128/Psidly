export default function Input({PlaceHolder, Style, Type, value, setValue, onEnter, maxLength}){
    return(
        <input className={`${Style} transition transform hover:scale-110`} 
            placeholder={PlaceHolder} 
            type={Type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
            maxLength={maxLength}
        />
    )
}