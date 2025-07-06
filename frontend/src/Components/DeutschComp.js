import React from 'react'

const DeutschComp = ({mywords, phrases, bgcolor}) => {
    let phraseBgColor = bgcolor === 'bg-red-500' || 'bg-emerald-500' || 'bg-sky-500'? 'text-white' : 'text-black';
       
       phraseBgColor = bgcolor === '' ? 'text-red-700' : phraseBgColor;
      
   
  return (
    <div className={`relative h-112 overflow-hidden group  min-w-[400px] grid place-items-center ${bgcolor}`}>
    <img src={mywords?.photolink} alt="Image" className="w-auto h-96 rounded-xl
     object-fill place-self-center transition-opacity duration-300 group-hover:opacity-0 "
     />
    <div className="relative inset-0 flex items-center justify-center text-gray-950 text-lg transition-opacity duration-300 w-full">
      <ul>
        <li className='text-slate-800 font-bold text-xl block text-center relative'>{ mywords?.artikel  }  { mywords?.word}</li>
        <li className='text-slate-800 font-bold text-xl block text-center relative'>{mywords?.plural && 'die'}  {mywords?.plural}</li>
      </ul>
      
    </div>
    <div className="absolute w-full inset-0 flex items-center justify-center text-slate-800 text-lg 
    opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    <ul>
        <li className='text-slate-800 font-bold text-xl block text-center relative'>{mywords?.turkish }</li>
        {
        Array.isArray(phrases) && phrases.length > 0 ? phrases.map( item=>  <li className= {`font-bold text-xl block text-center relative ${phraseBgColor} `}> {item} </li>) : ''
        } 
      </ul>
                              
    </div>
</div>
  )
}

export default DeutschComp
