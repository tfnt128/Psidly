import ProfilePhoto from "../../assets/icons/profilephoto.jpg"
import { useState, useRef } from "react";



export default function NewPatient(){
    const [foto, setFoto] = useState(null);
    const inputRef = useRef(null);

    function handleFoto(e) {
        const file = e.target.files[0];
        if (file) setFoto(URL.createObjectURL(file));
    }

    return(
        <div className="bg-quarternario h-[800px] w-[350px] flex flex-col items-center rounded-[30px]">
            <h1 className="font-aboreto text-[30px] mt-3">Novo paciente</h1>

            <img
                src={foto || ProfilePhoto}
                onClick={() => inputRef.current.click()}
                className="w-24 h-24 rounded-full object-cover cursor-pointer mt-4"
            />

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFoto}
            />
        </div>
    )
}