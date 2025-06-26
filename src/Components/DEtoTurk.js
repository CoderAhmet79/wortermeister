import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import DeutschComp from './DeutschComp';
import Loading from '../Utils/Loading';



const DEtoTurk = () => {
  const [mywords, setMywords] = useState([{}])
  const [indice, setIndice] = useState(0)
  const [bgcolor, setBgcolor] = useState()
  const [phrases, setPhrases] = useState([])
  const [loading, setLoading] = useState(true);

  const bringAllWords = async ()=> {
    try { 
      const response = await axios.get(process.env.REACT_APP_URI);
        const fetchedWords = response?.data;        
        setMywords(fetchedWords.words);
        } 
        catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); // Set loading to false after fetching is done
      }
  }
 
  const artikelBg = (art) => {
    if (art === "der") {
      setBgcolor ('bg-sky-500');
      } else if (art === "die") 
        {
      setBgcolor ('bg-red-500');
        } 
        else if (art === "das") 
        {
          setBgcolor ('bg-emerald-500');
        } else {
          setBgcolor ('');
    }
  }

  const nextWord = ()=> {
   
    setIndice(prev =>  {
      if (prev > 148) {
        return 0; // Decrement if greater than 0
    } else {
        return prev + 1; // Set to 149 if it would go below 0
    }
    } )
    artikelBg(mywords[indice + 1]?.artikel)
    splitArr(mywords[indice + 1]?.specialPhrase)
    document.title = mywords[indice + 1]?.word + " --> web dictionary by Ahmet Tombak- an amator work"
  }

  const prevWord = ()=> {
    setIndice(prev =>  {
      if (prev > 0) {
        return prev - 1; // Decrement if greater than 0
    } else {
        return 149; // Set to 149 if it would go below 0
    }
    } )
   
    artikelBg(mywords[indice - 1]?.artikel);
    splitArr(mywords[indice - 1]?.specialPhrase)
    document.title = mywords[indice - 1]?.word + " --> web dictionary by Ahmet Tombak- an amator work"
  }


  const splitArr = (spl) => {
    const arr = spl?.split(",")
    setPhrases(Array.isArray(arr) ? arr : []);
  }

  const checkKey = (e) => {
    if (e.keyCode === 39) { // Right arrow key
        nextWord();
    } else if (e.keyCode === 37) { // Left arrow key
        prevWord();
    }
};


  useEffect(()=> {
    bringAllWords()
    splitArr(mywords[0]?.specialPhrase)
    window.addEventListener("keydown", checkKey, false);
    return () => {
      window.removeEventListener("keydown", checkKey, false);
    };
  
  }, [] )
  if (loading) {
    return <Loading/> // Render a loading indicator while fetching data
} 

  return (
    <div className='w-2/4 place-self-center grid grid-cols-2 grid-rows-2 gap-1 min-w-[400px] h-140 relative'>
      
      <div className= {`h-140 w-full grid justify-center col-span-2 min-w-[400px] rounded-xl ${bgcolor} `}> 
      <DeutschComp mywords={mywords[indice]} phrases={phrases} bgcolor={bgcolor} />     
      </div>
      
      <div className='row-start-2 h-fit mt-44 mr-8'><button onClick={()=> prevWord()} className='text-2xl p-5 hover:border-none float-right border-slate-950 text-center bg-sky-400 shadow-2xl rounded text-zinc-50 from-neutral-900 font-mono  hover:bg-blue-700' > Prev </button></div> &nbsp;<b>{indice+1}</b>
      <div className='row-start-2 h-fit mt-44 ml-8'><button onClick={()=> nextWord()} className='text-2xl p-5 hover:border-none border-slate-950 text-center bg-sky-400 shadow-2xl rounded text-zinc-50 from-neutral-900 font-mono  hover:bg-blue-700' > Next</button></div>
    </div>
  )
}

export default DEtoTurk
