import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Quotes from "../Quotes/Quotes";
import bgImageDayTimeMb from "/assets/mobile/bg-image-daytime.jpg";
import bgImageNightTimeMb from "/assets/mobile/bg-image-nighttime.jpg";
import bgImageDayTimeTb from "/assets/tablet/bg-image-daytime.jpg";
import bgImageNightTimeTb from "/assets/tablet/bg-image-nighttime.jpg";
import bgImageDayTimeDt from "/assets/desktop/bg-image-daytime.jpg";
import bgImageNightTimeDt from "/assets/desktop/bg-image-nighttime.jpg";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import Time from "../Time/Time";
import MoreInfo from "../MoreInfo/MoreInfo";

export default function MainComponent() {
  const [timeData, setTimeData] = useState<ITimeData | null>(null);
  const [countryData, setCountryData] = useState<ICountryData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hasMounted = useRef(false);

  async function getCountryData() {
    try {
      const response = await axios.get(`https://ipapi.co/json`);
      const data = response.data;
      const countryObj = {
        city: data.city,
        country_code: data.country_code,
        timezone: data.timezone,
      };
      setCountryData(countryObj);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTimeData(timezone: string | undefined) {
    try {
      const response = await axios.get(
        `https://worldtimeapi.org/api/timezone/${timezone}`
      );

      const data = response.data;
      const datetimeString = data.datetime;
      const datetimeDate = new Date(datetimeString);
      let hours: string | number = datetimeDate
        .getHours()
        .toString()
        .padStart(2, "0");
      const minutes = datetimeDate.getMinutes().toString().padStart(2, "0");
      const finalTime = `${hours}:${minutes}`;
      hours = datetimeDate.getHours();

      const timeObj = {
        offset: data.abbreviation,
        day_of_week: data.day_of_week,
        day_of_year: data.day_of_year,
        datetime: finalTime,
        week_number: data.week_number,
        timezone: data.timezone,
        hours: hours,
      };

      setTimeData(timeObj);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCountryData();
  }, []);

  useEffect(() => {
    if (hasMounted.current) {
      getTimeData("asia/tbilisi");
    } else {
      hasMounted.current = true;
    }
  }, [countryData]);

  const hours = timeData?.hours ?? 0;

  const isMediumScreen = useMediaQuery(
    "(min-width:768px) and (max-width: 1024px)"
  );
  const isSmallScreen = useMediaQuery("(max-width:767px)");

  return (
    <main
      className={` h-[100dvh] bg-cover min-[600px]:bg-bottom ${
        hours >= 6 && hours <= 18 ? "md:bg-top" : "md:bg-bottom"
      } font-inter bg-black bg-opacity-40 bg-blend-multiply px-6 py-8 overflow-hidden md:px-14 md:pt-16 md:pb-12`}
      style={{
        backgroundImage:
          hours >= 6 && hours <= 18
            ? `${
                isSmallScreen
                  ? `url(${bgImageDayTimeMb})`
                  : isMediumScreen
                  ? `url(${bgImageDayTimeTb})`
                  : `url(${bgImageDayTimeDt})`
              }`
            : `${
                isSmallScreen
                  ? `url(${bgImageNightTimeMb})`
                  : isMediumScreen
                  ? `url(${bgImageNightTimeTb})`
                  : `url(${bgImageNightTimeDt})`
              }`,
      }}
    >
      <div className=" max-w-[1100px] lg:mx-auto">
        {!isOpen && <Quotes />}
        <Time
          countryData={countryData}
          timeData={timeData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          hours={hours}
        />
        <MoreInfo timeData={timeData} isOpen={isOpen} hours={hours} />
      </div>
    </main>
  );
}
