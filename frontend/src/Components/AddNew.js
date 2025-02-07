import axios from 'axios';
import React, { useState, useRef } from 'react'

const AddNew = () => {

  const [errors, setErrors] = useState({
    kelime: '',
    artikel: '',
    plural: '',
    turkce: '',
    cumle: '',
    fotoLink: ''
  })

  const [initialErrors, setInitialErrors] = useState({
    kelime: '',
    artikel: '',
    plural: '',
    turkce: '',
    cumle: '',
    fotoLink: ''
  })
  const [focusedField, setFocusedField] = useState('');
  const [initialFormData, setInitialFormData] = useState({
    kelime: '',
    artikel: '',
    plural: '',
    turkce: '',
    cumle: '',
    fotoLink: ''
  })
  const kelimeInputRef = useRef(null)
  const turkceInputRef = useRef(null)
  const fotoLinkInputRef = useRef(null)
  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(false);


  const handleSubmit = async(e) => {
    e.preventDefault()
 
    let newErrors = { ...errors }; // Create a copy of the current errors
    if (!formData.kelime || !formData.turkce || (formData.fotoLink).length < 7) {    
        if (!formData.kelime) {
          newErrors.kelime = "Kelime girmediniz*"
          setErrors(newErrors);
          kelimeInputRef.current.focus()
          return
        }

        if(!formData.turkce) {
          newErrors.turkce = "Türkçe anlamı girmediniz*"
          turkceInputRef.current.focus()
          setErrors(newErrors);
          return
        }
        if((formData.fotoLink).length < 5) {
          newErrors.fotoLink = "Web linki girmediniz*"
          fotoLinkInputRef.current.focus()
          setErrors(newErrors);
          return
        }
      }

    if(formData.artikel === '') {
        newErrors.artikel = "Artikel girmediniz ama bu gerekli olmayabilir"
        setErrors(newErrors);
          
      }
       
    if(formData.plural === '') {
        newErrors.plural = "Çoğul girmediniz ama bu gerekli olmayabilir"
        setErrors(newErrors);
        
      } 
         
    if(!formData.cumle) {
        newErrors.cumle = "Cümle kullanımı girmediniz ama bu gerekli olmayabilir"
        setErrors(newErrors);
       
      }
    
  

    try {
        const response= await axios.post(process.env.REACT_APP_URI + "newword", formData);
        alert(response?.data?.message)
      } 
      catch (error) 
      {
        console.error("Error saving dataxx:", error);
        alert("An error occured. Please try again later")
        return
      }
      
      setFormData(initialFormData)
      setErrors(initialErrors)
  }
 
 const isWordExists=async () => {
  if(formData.kelime.length > 1) {
    try {
      setLoading(true)
      kelimeInputRef.current.focus();
      const response = await fetch(process.env.REACT_APP_URI+'wordexists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: formData.kelime }),
  });

  const result = await response.json();

  setLoading(false)

    if(result?.exists === true)
      {
      setErrors((prevErrors) => ({
        ...prevErrors,
        kelime: (
          <>
            <strong> {formData.kelime} </strong>kelimesi zaten kayıtlı. Bu kelimeyi değiştirmelisiniz.
          </>
      ),
  
      }));
      kelimeInputRef.current.focus();
      }
}
catch (error) {
  console.error("Error querying data:", error);
}
  }}

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if(name !== "artikel" && name !== 'fotoLink') {
    const tempValue=value.trim()
    const capitalizedValue = tempValue.charAt(0).toUpperCase() + tempValue.slice(1);
    setFormData({
      ...formData, [name]: capitalizedValue
    })
  }
  else {setFormData({
    ...formData, [name]: value
  })}
    
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: '', // Reset error for the specific field
  }));
  }
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName); // Update the state with the name of the focused field
  };
 
  const addSpecialChars = (specialChar) => {
    if (focusedField) {
      setFormData((prevValues) => ({
        ...prevValues,
        [focusedField]: prevValues[focusedField] + specialChar, // Append the special character to the focused field
      }));
      turkceInputRef.current.focus();
    }

  }

  return (
    <div className='w-3/4 flex justify-center place-self-center min-h-96 flex-row max-md:flex-col max-sm:w-100 max-sm:border-none'>
      <div className='w-2/4 flex flex-col items-center p-6 border-2 rounded-lg border-red-200 mr-2 min-w-96'>
        <div className='font-serif'><b>Özel karakterler: </b></div>
        <div className='font-serif'>      
          
          <button className="border-2 mr-1 min-w-10 min-h-10 bg-slate-700 text-slate-50 rounded text-xl" onClick={() => addSpecialChars('ğ')}>ğ</button>
          <button className="border-2 mr-1 min-w-10 min-h-10 bg-slate-700 text-slate-50 rounded text-xl" onClick={() => addSpecialChars('Ç')}>Ç</button>
          <button className="border-2 mr-1 min-w-10 min-h-10 bg-slate-700 text-slate-50 rounded text-xl" onClick={() => addSpecialChars('ç')}>ç</button>
          <button className="border-2 mr-1 min-w-10 min-h-10 bg-slate-700 text-slate-50 rounded text-xl" onClick={() => addSpecialChars('İ')}>İ</button>
          <button className="border-2 mr-1 min-w-10 min-h-10 bg-slate-700 text-slate-50 rounded text-xl" onClick={() => addSpecialChars('ı')}>ı</button>
          <button className="border-2 mr-1 min-w-10 min-h-10 bg-slate-700 text-slate-50 rounded text-xl" onClick={() => addSpecialChars('Ş')}>Ş</button>
          <button className="border-2 mr-1 min-w-10 min-h-10 bg-slate-700 text-slate-50 rounded text-xl" onClick={() => addSpecialChars('ş')}>ş</button>
          <button className="border-2 mr-1 min-w-10 min-h-10 bg-slate-700 text-slate-50 rounded text-xl" onClick={() => addSpecialChars('Ä')}>Ä</button>
          <button className="border-2 mr-1 min-w-10 min-h-10 bg-slate-700 text-slate-50 rounded text-xl" onClick={() => addSpecialChars('ä')}>ä</button>
          <button className="border-2 mr-1 min-w-10 min-h-10 bg-slate-700 text-slate-50 rounded text-xl" onClick={() => addSpecialChars('ß')}>ß</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='p-2 mt-2 w-fit'>
            <input type="text" name="kelime"
              id="kelime"
              placeholder='Kelimeyi girin....'
              onChange={handleChange}
              ref={kelimeInputRef}
              className='h-8 p-2 border-2 rounded-md focus:bg-slate-200 font-serif'
              value={formData.kelime}
              onBlur={isWordExists}
            /> 
            <p className='text-red-700 h-3'>
            <div role="status" className= {`w-8 mr-4 ml-4 ${loading ? 'block' : 'hidden'}`}>
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
              {errors.kelime}
              
              </p>
          </div>
          <div className='p-2'>
            <select name="artikel" id="artikel"
              value={formData.artikel}
              onChange={handleChange}
              className='w-20 h-8 pl-2 bg-white rounded grid place-content-center border-2 font-serif'>
              <option value="der">der</option>
              <option value="die">die</option>
              <option value="das">das</option>
              <option value=""></option>
            </select> 
            <p className='text-red-700 h-3'>{errors.artikel}</p>
          </div>
          <div className='p-2'>
            <input type="text" name="plural" id="plural"
              placeholder='Çoğul girin....'
              className='h-8 rounded-md focus:bg-slate-200 font-serif border-2'
              onChange={handleChange}
              value={formData.plural}
            /> 
            <p className='text-red-700 h-3'>{errors.plural}</p>
          </div>
          <div className='p-2'>
            <input type="text" name="turkce"
              id="turkce"
              placeholder='Türkçe anlamını girin....'
              className='h-8 w-96 p-2 rounded-md focus:bg-slate-200 font-serif border-2'
              onChange={handleChange}
              value={formData.turkce}
              ref={turkceInputRef}
              onFocus={() => handleFocus('turkce')}
            /> 
            <p className='text-red-700 h-3'>{errors.turkce}</p>
          </div>
          <div className='p-2'>
            <input type="text" name="cumle"
              id="cumle"
              placeholder='Cümle içinde kullanımını girin....'
              className='h-8 rounded-md focus:bg-slate-200 font-serif w-96 border-2'
              onChange={handleChange}
              value={formData.cumle}
              onFocus={() => handleFocus('cumle')}
            /> 
            <p className='text-red-700 h-3'>{errors.cumle}</p>
          </div>
          <div className='p-2'>
            <input type="text" name="fotoLink"
              id="fotoLink"
              placeholder='Fotoğraf Linki....'
              className='h-8 w-96 rounded-md focus:bg-slate-200 font-serif border-2 box-border'
              onChange={handleChange}
              ref={fotoLinkInputRef}
              value={formData.fotoLink}
            />
            <p className='text-red-700 h-3'>{errors.fotoLink}</p>
          </div>
          <div className='p-2'>
            <input type='submit' className="border-2 mr-1 w-28 min-h-12 bg-slate-700 text-slate-50 rounded text-xl" value="Kaydet" />
            <input type="reset" value="Reset" className="border-2 ml-10 w-28 min-h-12 bg-slate-700 text-slate-50 rounded text-xl" onClick={()=> setFormData(initialFormData)}/>
          </div>
        </form>
      </div>
      <div className='w-2/4 grid border-2 rounded-lg border-red-200 text-center place-items-center'>
        <figure>
          <img src={formData.fotoLink} alt="Picture for german word" className='w-80 h-auto'/>
          <figcaption>Sample figure for <b>{formData.kelime}</b> </figcaption>
        </figure>
      </div>
    </div>
  )
}

export default AddNew
