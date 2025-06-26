import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import Loading from '../Utils/Loading';

const Phrases = () => {
  const [mywords, setMywords] = useState([{}])
  const [indice, setIndice] = useState(0)
  const [loading, setLoading] = useState(true);

  const bringAllWords = async ()=> {
    try { 
      const response = await axios.get(process.env.REACT_APP_URI+"phrases");
        const fetchedPhrases = response?.data;       
        setMywords(fetchedPhrases);
        } 
        catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); // Set loading to false after fetching is done
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
    
  }

  const prevWord = ()=> {
    setIndice(prev =>  {
      if (prev > 0) {
        return prev - 1; // Decrement if greater than 0
    } else {
        return 149; // Set to 149 if it would go below 0
    }
    } )
   
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
    window.addEventListener("keydown", checkKey, false);
    return () => {
      window.removeEventListener("keydown", checkKey, false);
    };
  }, [] )

  if (loading) {
    return <Loading/>; // Render a loading indicator while fetching data
} 

  return (
    <div className='w-2/4 place-self-center grid grid-cols-2 grid-rows-2 gap-1 h-140'>
      
      <div className= {`h-140 w-full grid justify-center border border-solid border-y-slate-400 col-span-2 rounded-xl `}> 
            <ul className='border border-slate-200 m-2 rounded h-7'>
              <li className='text-slate-800 font-bold text-xl block text-center relative mb-8 bg-blue-100'> { mywords[indice]?._id}</li>
              {
              Array.isArray(mywords[indice]?.phrases) && mywords[indice]?.phrases.length > 0 ? mywords[indice]?.phrases.map( item=>  <li className='text-pink-950 font-bold text-xl block relative'> -{item} </li>) : ''
              } 
            </ul>

      </div>
      <div className='row-start-2 h-fit mt-44 mr-8'><button onClick={()=> prevWord()} className='text-2xl p-5 hover:border-none float-right border-slate-950 text-center bg-sky-400 shadow-2xl rounded text-zinc-50 from-neutral-900 font-mono  hover:bg-blue-700' > Prev </button></div>
      <div className='row-start-2 h-fit mt-44 ml-8'><button onClick={()=> nextWord()} className='text-2xl p-5 hover:border-none border-slate-950 text-center bg-sky-400 shadow-2xl rounded text-zinc-50 from-neutral-900 font-mono  hover:bg-blue-700' > Next</button></div>
    </div>
  )
}



export default Phrases
