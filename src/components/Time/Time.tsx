import arrowDown from "/assets/desktop/icon-arrow-down.svg";
import arrowUp from "/assets/desktop/icon-arrow-up.svg";
import sunIcon from "/assets/desktop/icon-sun.svg";
import { Dispatch, SetStateAction } from "react";
import useMediaQuery from "@custom-react-hooks/use-media-query";

interface ITimeProps {
  countryData: ICountryData | null;
  timeData: ITimeData | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  hours: number;
}

export default function Time({
  countryData,
  timeData,
  isOpen,
  setIsOpen,
  hours,
}: ITimeProps) {
  function handleOpenMenu() {
    setIsOpen(!isOpen);
  }

  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  return (
    <section
      className={`transition-[margin] absolute bottom-12 duration-200 lg:flex lg:items-end lg:bottom-28 lg:justify-between lg:w-[85%] lg:max-w-[1000px] ${
        isOpen ? "mb-[232px] md:mb-[383px] lg:mb-399px" : ""
      }`}
    >
      <div className=" text-white mb-12 md:mb-20 lg:mb-0">
        <div className=" flex gap-3 mb-6 md:mb-4 max-[333px]:mb-0">
          <span>
            <img src={sunIcon} alt="sun icon" />
          </span>
          <p className="  text-lg md:tracking-[3px] lg:text-[20px] lg:tracking-[5px] lg:font-[400]font-[200] tracking-[2px]">
            {hours > 5 && hours <= 12
              ? "GOOD MORNING"
              : hours > 12 && hours <= 18
              ? "GOOD AFTERNOON"
              : "GOOD EVENING"}
            {isMediumScreen ? `, IT'S CURRENTLY` : ""}
          </p>
        </div>
        <div className=" flex gap-1 max-[333px]:mb-0 mb-6 md:mb-4 items-end">
          <span className=" max-[333px]:text-[65px]  text-[90px] md:text-[150px] lg:text-[200px] leading-[90px] md:leading-[125px] font-bold lg:leading-[200px]">
            {timeData?.datetime}
          </span>
          <span className=" text-[13px] font-[600] tracking-widest md:text-[20px]">
            {timeData?.offset}
          </span>
        </div>
        <p className=" font-semibold tracking-[2px] md:tracking-[3px] lg:text-[20px]">{`IN ${countryData?.city.toUpperCase()}, ${
          countryData?.country_code
        }`}</p>
      </div>
      <button
        onClick={handleOpenMenu}
        className=" w-[115px] md:w-[130px] h-10 md:h-12 bg-white rounded-3xl flex items-center justify-between cursor-pointer hover:scale-110 transition-all"
      >
        <span className=" text-[12px] md:text-[16px] ml-4 text-[rgb(0,0,0,0.6)] font-bold tracking-[1.5px] transition-all">
          {isOpen ? "LESS" : "MORE"}
        </span>
        <span className=" h-8 w-8 md:h-10 md:w-10 flex justify-center items-center bg-[#303030] rounded-[50%] mr-1">
          <img
            className=""
            src={isOpen ? arrowUp : arrowDown}
            alt="arrow down icon"
          />
        </span>
      </button>
    </section>
  );
}
