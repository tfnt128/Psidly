import Button from "../General/Button";

<<<<<<< HEAD
export default function AddButton({onClickFunction}){
    return(
        <Button Style={"rounded-full h-[100px] w-[100px] lg:h-[300px] lg:w-[300px] bg-secundario text-[40px] lg:text-[120px] flex items-center justify-center font-lexenddeca"}  Text={"+"}
            OnClickFunction={onClickFunction}
        />
=======
export default function AddButton({onClickfunction}){
    return(
        <Button Style={"rounded-full h-[100px] w-[100px] lg:h-[300px] lg:w-[300px] bg-secundario text-[40px] lg:text-[120px] flex items-center justify-center font-lexenddeca"}  Text={"+"}
        OnClickFunction={onClickfunction}/>
>>>>>>> feature/config-endpoints
    )
}