import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


const Stats = () => {
  const [mywords, setMywords] = useState([{}]);
  const [loading, setLoading] = useState(true);

  const bringAllWords = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URI + "/stats");
      const fetchedWords = response?.data;
      setMywords(fetchedWords);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  useEffect(() => {
    bringAllWords();
    console.log(mywords); 
  }, []);
  if (loading) {
    return <div className="grid place-content-center">Loading...</div>; // Render a loading indicator while fetching data
  }

  return (
    <div className="w-2/4 place-self-center h-140 font-serif border-2 min-w-80 rounded max-md:w-3/4 border-zinc-300 p-8 max-sm:w-full">
      <div className="grid grid-cols-2 grid-rows-6 gap-4 place-content-center">
        <div className=" text-right h-10 content-center text-xl max-md:text-xl max-sm:text-base">
          Total Word Count:
        </div>
        <div className="ml-8 text-red-900 text-xl font-bold">{mywords.total}</div>
        <div className="text-xl text-right h-10  content-center max-md:text-xl max-sm:text-base">
          Total <b>Der</b> Artikel:
        </div>
        <div className="ml-8 text-red-900 text-xl font-bold">{mywords.totalDer}</div>
        <div className="text-xl text-right h-10  content-center max-md:text-xl max-sm:text-base">
          Total <b>Die</b> Artikel
        </div>
        <div className="ml-8 text-red-900 text-xl font-bold">{mywords.totalDie}</div>
        <div className="text-xl text-right h-10  content-center max-md:text-xl max-sm:text-base">
          Total <b>Das</b> Artikel:
        </div>
        <div className="ml-8 text-red-900 text-xl font-bold">{mywords.totalDas}</div>
        <div className="text-xl text-right h-10  content-center max-md:text-xl max-sm:text-base">
          Total Phrase Count:
        </div>
        <div className="ml-8 text-red-900 text-xl font-bold">{mywords.totalPhrases}</div>
        <div className="text-xl text-right h-10  content-center max-md:text-xl max-sm:text-base">
          Last Saved Word:
        </div>
        <div className="ml-8 text-red-900 text-xl font-bold">
          {mywords.lastword[0].word}
                   
        </div>
        
      </div>
     
    </div>
  );
};

export default Stats;
