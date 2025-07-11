import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Konjugation = () => {
  const [dasVerb, setDasVerb] = useState('')
  const [verben, setVerben] = useState([{}])
  const [loading, setLoading] = useState(false);

  const bringVerbenConjugation = async (e) => {
    e.preventDefault()
    try {
      
      setLoading(true)     
      const response = await axios.get("https://german-verbs.glitch.me/german-verbs-api?verb=" + dasVerb.toLowerCase());
      const fetchedWords = response?.data;
      setVerben(fetchedWords.data);
    }
    catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  }
  document.title = 'Wortermesiter verb Conjugation';
  const handleChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-zäöüßÄÖÜ]/g, '');
    setDasVerb(value);
  };

  return (
    <div className='flex flex-col justify-center items-center w-full p-4 border-1 rounded-md shadow-lg bg-slate-100'>

      <div className='border-1 rounded border-slate-700 mb-4 shadow-lg'>
        <form onSubmit={bringVerbenConjugation} className='flex flex-row w-full'>
    
            <input type='text'
            className='h-10 rounded pl-2 font-serif bg-gray-200 max-[400px]:w-18'
            autoComplete='On'
            onChange={handleChange}
            value={dasVerb}
            title="Please enter letters only."
            placeholder='Enter a verb infinitive form'
            pattern="[A-Za-zäöüßÄÖÜ]*"
            required
          /> 
               
          <div role="status" className= {`w-8 mr-2 ml-2 ${loading ? 'block' : 'hidden'}`}>
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
          <div className='w-10'>

            <input type='submit' value="Submit"
            className='border-2 ml-1 h-10 border-gray-900 rounded-full bg-blue-800 focus:bg-red-600 focus:inset-4 focus:border-lime-600 text-white pl-6 pr-6 font-serif'
          />
          </div>
          
        </form>
        
      </div>


      <div className='min-h-72 border-2 border-slate-200 p-2 rounded w-full flex flex-row gap-4 flex-nowrap max-md:flex-col justify-evenly'>

        <div className='font-serif pl-2 border-2 rounded border-zinc-400 w-44 flex flex-col drop-shadow-xl max-md:w-full'>
          <span className='font-bold w-full text-center'>PRASENS</span>
          <ul>
            <li className='verb-list'>Ich:<span className='verb-span'>{verben?.PRASENS?.S1}</span>  </li>
            <li className='verb-list'>Du:<span className='verb-span'>{verben?.PRASENS?.S2}</span></li>
            <li className='verb-list'>Er/Sie/Es:<span className='verb-span'>{verben?.PRASENS?.S3}</span></li>
            <li className='verb-list'>Wir:<span className='verb-span'>{verben?.PRASENS?.P1}</span></li>
            <li className='verb-list'>Ihr:<span className='verb-span'>{verben?.PRASENS?.P2}</span></li>
            <li className='verb-list'>Sie/sie:<span className='verb-span'>{verben?.PRASENS?.P3}</span></li>
          </ul>
        </div>

        <div className='font-serif pl-2 border-2 rounded border-zinc-400 w-44 flex flex-col drop-shadow-xl max-md:w-full'>
          <span className='font-bold w-full text-center'> PRATERITUM</span>
          <ul>
            <li className='verb-list'>Ich:<span className='verb-span'>{verben?.PRATERITUM?.S1}</span>  </li>
            <li className='verb-list'>Du:<span className='verb-span'>{verben?.PRATERITUM?.S2}</span></li>
            <li className='verb-list'>Er/Sie/Es:<span className='verb-span'>{verben?.PRATERITUM?.S3}</span></li>
            <li className='verb-list'>Wir:<span className='verb-span'>{verben?.PRATERITUM?.P1}</span></li>
            <li className='verb-list'>Ihr:<span className='verb-span'>{verben?.PRATERITUM?.P2}</span></li>
            <li className='verb-list'>Sie/sie:<span className='verb-span'>{verben?.PRATERITUM?.P3}</span></li>
          </ul>
        </div>

        <div className='font-serif pl-2 border-2 rounded border-zinc-400 flex flex-col drop-shadow-xl w-fit max-md:w-full'>
          <span className='font-bold w-full text-center'> PERFEKT</span>
          <ul>
            <li className='verb-list'>Ich:<span className='verb-span'>{verben?.PERFEKT?.S1[0]} {verben?.PERFEKT?.S1[1]}</span>  </li>
            <li className='verb-list'>Du:<span className='verb-span'>{verben?.PERFEKT?.S2[0]} {verben?.PERFEKT?.S2[1]}</span></li>
            <li className='verb-list'>Er/Sie/Es:<span className='verb-span'>{verben?.PERFEKT?.S3[0]} {verben?.PERFEKT?.S3[1]}</span></li>
            <li className='verb-list'>Wir:<span className='verb-span'>{verben?.PERFEKT?.P1[0]} {verben?.PERFEKT?.P1[1]}</span></li>
            <li className='verb-list'>Ihr:<span className='verb-span'>{verben?.PERFEKT?.P2[0]} {verben?.PERFEKT?.P2[1]}</span></li>
            <li className='verb-list'>Sie/sie:<span className='verb-span'>{verben?.PERFEKT?.P3[0]} {verben?.PERFEKT?.P3[1]}</span></li>
          </ul>
        </div>

        <div className='font-serif pl-2 border-2 rounded border-zinc-400 flex flex-col drop-shadow-xl w-fit max-md:w-full'>
          <span className='font-bold w-full text-center'> FUTUR1</span>
          <ul>
            <li className='verb-list'>Ich:<span className='verb-span'>{verben?.FUTUR1?.S1[0]} {verben?.FUTUR1?.S1[1]}</span>  </li>
            <li className='verb-list'>Du:<span className='verb-span'>{verben?.FUTUR1?.S2[0]} {verben?.FUTUR1?.S2[1]}</span></li>
            <li className='verb-list'>Er/Sie/Es:<span className='verb-span'>{verben?.FUTUR1?.S3[0]} {verben?.FUTUR1?.S3[1]}</span></li>
            <li className='verb-list'>Wir:<span className='verb-span'>{verben?.FUTUR1?.P1[0]} {verben?.FUTUR1?.P1[1]}</span></li>
            <li className='verb-list'>Ihr:<span className='verb-span'>{verben?.FUTUR1?.P2[0]} {verben?.FUTUR1?.P2[1]}</span></li>
            <li className='verb-list'>Sie/sie:<span className='verb-span'>{verben?.FUTUR1?.P3[0]} {verben?.FUTUR1?.P3[1]}</span></li>
          </ul>
        </div>

        <div className='font-serif pl-2 border-2 rounded border-zinc-400 flex flex-col drop-shadow-xl w-fit max-md:w-full'>
          <span className='font-bold w-full text-center'> FUTUR2</span>
          <ul>
            <li className='verb-list'>Ich:<span className='verb-span'>{verben?.FUTUR2?.S1[0]} {verben?.FUTUR2?.S1[1]}</span>  </li>
            <li className='verb-list'>Du:<span className='verb-span'>{verben?.FUTUR2?.S2[0]} {verben?.FUTUR2?.S2[1]}</span></li>
            <li className='verb-list'>Er/Sie/Es:<span className='verb-span'>{verben?.FUTUR2?.S3[0]} {verben?.FUTUR2?.S3[1]}</span></li>
            <li className='verb-list'>Wir:<span className='verb-span'>{verben?.FUTUR2?.P1[0]} {verben?.FUTUR2?.P1[1]}</span></li>
            <li className='verb-list'>Ihr:<span className='verb-span'>{verben?.FUTUR2?.P2[0]} {verben?.FUTUR2?.P2[1]}</span></li>
            <li className='verb-list'>Sie/sie:<span className='verb-span'>{verben?.FUTUR2?.P3[0]} {verben?.FUTUR2?.P3[1]}</span></li>
          </ul>
        </div>

        <div className='font-serif pl-2 border-2 rounded border-zinc-400 flex flex-col drop-shadow-xl w-fit max-md:w-full'>
          <span className='font-bold w-full text-center'> PLUSQUAMPERFEKT</span>
          <ul>
            <li className='verb-list'>Ich:<span className='verb-span'>{verben?.PLUSQUAMPERFEKT?.S1[0]} {verben?.PLUSQUAMPERFEKT?.S1[1]}</span>  </li>
            <li className='verb-list'>Du:<span className='verb-span'>{verben?.PLUSQUAMPERFEKT?.S2[0]} {verben?.PLUSQUAMPERFEKT?.S2[1]}</span></li>
            <li className='verb-list'>Er/Sie/Es:<span className='verb-span'>{verben?.PLUSQUAMPERFEKT?.S3[0]} {verben?.PLUSQUAMPERFEKT?.S3[1]}</span></li>
            <li className='verb-list'>Wir:<span className='verb-span'>{verben?.PLUSQUAMPERFEKT?.P1[0]} {verben?.PLUSQUAMPERFEKT?.P1[1]}</span></li>
            <li className='verb-list'>Ihr:<span className='verb-span'>{verben?.PLUSQUAMPERFEKT?.P2[0]} {verben?.PLUSQUAMPERFEKT?.P2[1]}</span></li>
            <li className='verb-list'>Sie/sie:<span className='verb-span'>{verben?.PLUSQUAMPERFEKT?.P3[0]} {verben?.PLUSQUAMPERFEKT?.P3[1]}</span></li>
          </ul>
        </div>



      </div>
    </div>
  )
}

export default Konjugation
