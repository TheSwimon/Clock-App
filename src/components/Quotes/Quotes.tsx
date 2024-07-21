import { useEffect, useState } from "react";
import axios from "axios";
import refreshIcon from "/assets/desktop/icon-refresh.svg";
import moonIcon from "/assets/desktop/icon-moon.svg";

interface IquoteData {
  author: string;
  content: string;
}

export default function Quotes() {
  const [quoteData, setQuoteData] = useState<IquoteData | null>(null);
  const [reload, setReload] = useState<boolean>(false);

  function handleReload() {
    setReload(!reload);
  }

  async function getQuoteData() {
    try {
      const response = await axios.get(`https://api.quotable.io/random/`);
      const data = response.data;
      const quoteObj = {
        author: data.author,
        content: data.content,
      };
      setQuoteData(quoteObj);

      if (response.status !== 200) {
        throw new Error(`error occured while getting the data`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuoteData();
  }, [reload]);

  return (
    <div className=" flex justify-between max-w-[600px]">
      <div className="text-white max-w-[85%] lg:max-w-[90%]">
        <p className=" text-xs md:text-lg leading-5 mb-2">
          {quoteData?.content}
        </p>
        <span className=" text-xs md:text-lg font-semibold">
          {quoteData?.author}
        </span>
      </div>
      <span onClick={handleReload} className="cursor-pointer md:mt-1">
        <img
          className=" hover:scale-110 transition-transform"
          src={refreshIcon}
          alt="refresh icon"
        />
      </span>
    </div>
  );
}
