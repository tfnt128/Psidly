import Title from "../../components/Titles/Title"
import Heading from "./Heading"
import Navbar from "./Navbar"
import SmilingWoman from "./SmilingWoman"

export default function LandingPage() {
  return (
    <div className="h-screen bg-gradient-to-b from-white to-[#9AC8FF] flex flex-col items-center">
      
      <Title Style={"w-[160px]"}/>
      <Navbar/>
      <Heading ClassName={" mt-15"}/>
      <SmilingWoman/>

    </div>
  )
}