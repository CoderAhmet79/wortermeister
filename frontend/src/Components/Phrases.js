import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'

const Phrases = () => {
  const [phrase, setPhrase] = useState([{}]);
  const [indice, setIndice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [times, setTimes] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Sayfanın yenilenmesini engeller
    setIndice(0);
    // Formdan değerleri al
    const level = document.getElementById("level").value;
    const timesValue = document.getElementById("times").value;
    setTimes(timesValue);

    try {
      const response = await axios.get(`${process.env.REACT_APP_URI}phrases`, {
        params: {
          level: level,
          limit: timesValue,
        },
      });

      // Gelen veriyi state'e ata veya başka bir işlem yap
      setPhrase(response.data);
    } catch (error) {
      console.error("Veri getirme hatası:", error);
    }
  };

  const nextWord = () => {
    setIndice((prev) => {
      if (prev > times - 2) {
        return 0; // Decrement if greater than 0
      } else {
        return prev + 1; // if it would go below 0
      }
    });
  };

  const prevWord = () => {
    setIndice((prev) => {
      if (prev > 0) {
        return prev - 1; // Decrement if greater than 0
      } else {
        return times - 1; // Set to 149 if it would go below 0
      }
    });
  };

  const checkKey = (e) => {
    if (e.keyCode === 39) {
      // Right arrow key
      nextWord();
    } else if (e.keyCode === 37) {
      // Left arrow key
      prevWord();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", checkKey, false);
    return () => {
      window.removeEventListener("keydown", checkKey, false);
    };
  }, []);

  return (
    <div className='w-3/5 place-self-center grid grid-cols-2 grid-rows-2 gap-1 h-140 min-w-[402px]'>
      
      <div className= 'flex flex-col justify-between h-140 w-full gap-1 border border-solid border-y-slate-400 col-span-2 rounded-xl pt-2 min-[400px]'> 
        <div className='flex flex-col border-b-2 h-12 items-center align-middle 
        min-w-[396px] min-[500px]:gap-4 w-full '>
          <form onSubmit={handleSubmit} className='flex flex-row justify-between gap-6 font-serif max-[500px]:text-xs'>
            <div className='h-full w-fit flex items-center'>
            <label htmlFor="level" className='mr-1 '>Level</label>
          <select name="level" id="level" className='bg-slate-100 border-2 border-slate-300 rounded p-1'>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="AT-Dialect">Dialect</option>
          </select>
        </div>
        <div className='w-fit h-full flex items-center'>
          <label htmlFor="level" className='mr-1 max-w-[400px]:text-sm '># of practice</label>
          <select name="times" id="times" className='bg-slate-100 border-2 border-slate-300 rounded p-1'>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          </div>
       <input type="submit" value="Bring Phrases" 
       className=' rounded bg-sky-400 text-zinc-50 p-2 cursor-pointer hover:border-none hover:bg-blue-700' />
        </form>
        </div>
        <div className='w-full h-full flex justify-center items-start pt-4 text-2xl font-serif'>
           <ul>
            <li className='text-center' key={phrase?._id }><strong>{phrase[indice]?.phraseDeutsch}</strong></li>
            <li className='text-center mt-4'>{ phrase[indice]?.phraseTurkish}</li>
            <li className='text-lg text-red-500 text-center '>{phrase[indice]?.level}</li>
             <li className='text-center'>{indice+1}</li>
           </ul>
        </div>
      </div>
      <div className="row-start-2 h-fit mt-44 mr-8">
        <button
          onClick={() => prevWord()}
          className="text-2xl p-5 hover:border-none float-right border-slate-950 text-center 
           bg-sky-400 shadow-2xl rounded text-zinc-50 from-neutral-900 font-mono  hover:bg-blue-700"
        >
          Prev
        </button>
      </div>
      <div className="row-start-2 h-fit mt-44 ml-8">
        <button
          onClick={() => nextWord()}
          className="text-2xl p-5 hover:border-none border-slate-950 text-center bg-sky-400 shadow-2xl rounded text-zinc-50 from-neutral-900 font-mono  hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Phrases;
