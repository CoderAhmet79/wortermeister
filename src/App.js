import Navbar from './Components/Navbar';
import TurktoDE from './Components/TurktoDE'
import Newest from './Components/Newest'
import Phrases from './Components/Phrases'
import DEtoTurk from './Components/DEtoTurk';
import ArtikelTest from './Components/ArtikelTest'
import Footer from './Components/Footer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AddNew from './Components/AddNew';
import Stats from './Components/Stats'
import Konjugation from './Components/Konjugation';
import UsePageTimer from "./Hooks/UsePageTimer";
import NotFound from './Components/NotFound';




function App() {

  

  return (

    <div className='flex flex-col justify-items-center drop-shadow-l h-svh m-0 p-0 min-w-fit relative'>
   
      <BrowserRouter>
      <UsePageTimer />
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<DEtoTurk/>} />
            <Route exact path="/turk" element={<TurktoDE/>} />
            <Route exact path="/newlyadd" element={<Newest/>}/>
            <Route exact path="/phrases" element={<Phrases/>} />
            <Route exact path="/artikeltest" element={<ArtikelTest/>} />  
            <Route exact path="/new" element={<AddNew/>} />
            <Route exact path="/konj" element={<Konjugation/>} />
            <Route exact path="/stats" element={<Stats/>} />
            <Route exact path="*" element={<NotFound />} />    
          </Routes>     
      </BrowserRouter>
      <Footer /> 

    </div>
  
  );
}

export default App;
