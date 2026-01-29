import Title from "../../components/Titles/Title"
import Gmaile from "../../assets/icons/gmaile.png"
export default function Footer({Style}){
    return(
        <div className={`${Style} w-full bg-amber-50 pt-[25px] lg:h-[420px] h-[330px] mt-[120px] flex flex-col items-center`}>
            <Title Style="lg:w-[230px] w-[150px]" />
            <h1 className="font-inter color-terciario lg:text-[25px] text-[20px] mt-[-20px]">Entre em contato:</h1>
            <div className="flex flex-row items-center gap-3">
                <img src={Gmaile} className="lg:w-[30px]"/>
                <a className="font-inter color-terciario lg:text-[20px]"  href="mailto:psidly@gmail.com">gmail</a>
            </div>
            <h1 className="font-inter color-terciario lg:text-[20px] lg:mt-[200px] mt-[150px]">© 2026 Psidly</h1>
        </div>
    )
}