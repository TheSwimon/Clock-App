interface IMoreInfoProps {
  timeData: ITimeData | null;
  isOpen: boolean;
  hours: number;
}

export default function MoreInfo({ timeData, isOpen, hours }: IMoreInfoProps) {
  return (
    <aside
      className={`absolute bottom-0 left-0 w-[100vw] bg-[rgb(255,255,255,0.75)] backdrop-blur-xl transition-transform duration-200 lg:px-14 ${
        hours >= 6 && hours <= 18
          ? "bg-[rgb(255,255,255,0.75)]"
          : "bg-[rgb(0,0,0,0.60)]"
      } ${isOpen ? "translate-y-[0%]" : "translate-y-[100%]"}`}
    >
      <ul
        className={`py-8 px-6 md:grid md:grid-cols-2 md:gap-y-12 md:gap-x-12 md:text-left md:px-16 md:py-20 lg:px-0 lg:max-w-[1100px] lg:mx-auto ${
          hours >= 6 && hours <= 18 ? "text-[#303030]" : "text-white"
        }`}
      >
        <li
          className={` text-[11px] md:text-[13px] tracking-[1px] flex md:flex-col justify-between items-center md:items-start mb-4`}
        >
          <h1>CURRENT TIMEZONE</h1>
          <p className=" text-[20px] md:text-[40px] font-bold">
            {timeData?.timezone}
          </p>
        </li>
        <li
          className={` text-[11px] md:text-[13px] tracking-[1px] flex md:flex-col justify-between items-center md:items-start mb-4`}
        >
          <h1>DAY OF THE YEAR</h1>
          <p className=" text-[20px] md:text-[40px] font-bold">
            {timeData?.day_of_year}
          </p>
        </li>
        <li
          className={` text-[11px] md:text-[13px] tracking-[1px] flex md:flex-col justify-between items-center md:items-start mb-4`}
        >
          <h1>DAY OF THE WEEK</h1>
          <p className=" text-[20px] md:text-[40px] font-bold">
            {timeData?.day_of_week}
          </p>
        </li>
        <li
          className={` text-[11px] md:text-[13px] tracking-[1px] flex md:flex-col justify-between items-center md:items-start`}
        >
          <h1>WEEK NUMBER</h1>
          <p className=" text-[20px] md:text-[40px] font-bold">
            {timeData?.week_number}
          </p>
        </li>
      </ul>
    </aside>
  );
}
