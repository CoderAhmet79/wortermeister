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
        await axios.post(process.env.REACT_APP_URI + "newword", formData);
        
      } catch (error) {
        console.error("Error saving data:", error);
      }
      setFormData(initialFormData)
      setErrors(initialErrors)
  }
 
  

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
            /> 
            <p className='text-red-700 h-3'>{errors.kelime}</p>
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
