import Button from "../General/Button";

export default function AddButton({ onClickFunction, Label, Simbol }) {
  return (
    <div className="group flex items-center justify-end ">
      
      <button
        onClick={onClickFunction}
        className="
            lg:h-[300px] lg:w-[300px]
          rounded-full bg-secundario
          h-[100px] w-[100px]
          lg:group-hover:w-[820px]
          group-hover:w-[320px]
          flex items-center justify-center gap-3
          overflow-hidden
          transition-all duration-300 ease-in-out
          cursor-pointer
        "
      >
        <span className="text-[40px] lg:text-[120px] font-lexenddeca leading-none shrink-0 group-hover:hidden pl-9 lg:pl-27">{Simbol}</span>
        <span className="
          text-[20px]
          lg:text-[70px] font-lexenddeca whitespace-nowrap
          opacity-0
          lg:group-hover:max-w-[820px]
          group-hover:max-w-[220px] group-hover:opacity-100
          transition-all duration-300 ease-in-out
          overflow-hidden
        ">
          {Label}
        </span>
      </button>
    </div>
  );
}