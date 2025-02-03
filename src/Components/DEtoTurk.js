import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'



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
      setBgcolor ('bg-sky-600');
      } else if (art === "die") 
        {
      setBgcolor ('bg-red-600');
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
  
  }, [] )
  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while fetching data
} 

  return (
    <div className='w-2/4 place-self-center grid grid-cols-2 grid-rows-2 gap-1 h-140'>
      
      <div className= {`h-140 w-full grid justify-center col-span-2 rounded-xl ${bgcolor} `}> 
        <div className="relative h-112 overflow-hidden group  w-180 grid place-items-center">
          <img src={mywords[indice].photolink} alt="Image" className="w-auto h-96 rounded-xl
           object-fill place-self-center transition-opacity duration-300 group-hover:opacity-0"
           />
          <div className="relative inset-0 flex items-center justify-center text-gray-950 text-lg transition-opacity duration-300 w-full">
            <ul>
              <li className='text-slate-800 font-bold text-xl block text-center relative'>{ mywords[indice]?.artikel  }  { mywords[indice].word}</li>
              <li className='text-slate-800 font-bold text-xl block text-center relative'>{mywords[indice]?.plural && 'die'}  {mywords[indice].plural}</li>
            </ul>
            
          </div>
          <div className="absolute w-full inset-0 flex items-center justify-center text-slate-800 text-lg 
          opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ul>
              <li className='text-slate-800 font-bold text-xl block text-center relative'>{mywords[indice].turkish }</li>
              {
              Array.isArray(phrases) && phrases.length > 0 ? phrases.map( item=>  <li className='text-pink-950 font-bold text-xl block text-center relative'> {item} </li>) : ''
              } 
            </ul>
                                    
          </div>
      </div>
      
      </div>
      <div className='row-start-2 h-fit mt-44 mr-8'><button onClick={()=> prevWord()} className='text-2xl p-5 hover:border-none float-right border-slate-950 text-center bg-sky-400 shadow-2xl rounded text-zinc-50 from-neutral-900 font-mono  hover:bg-blue-700' > Prev </button></div> &nbsp;<b>{indice+1}</b>
      <div className='row-start-2 h-fit mt-44 ml-8'><button onClick={()=> nextWord()} className='text-2xl p-5 hover:border-none border-slate-950 text-center bg-sky-400 shadow-2xl rounded text-zinc-50 from-neutral-900 font-mono  hover:bg-blue-700' > Next</button></div>
    </div>
  )
}

export default DEtoTurk
