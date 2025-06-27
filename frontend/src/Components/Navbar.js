<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom";
import VisitorTracker from "../Utils/VisitorTracker";

const Navbar = () => {
  let Links = [
    { name: "De-Turk", link: "/" },
    { name: "Turk-DE", link: "/turk" },
    { name: "Phrases", link: "/phrases" },
    { name: "Newest Words", link: "/newlyadd" },
    { name: "Add New Word", link: "/new" },
    { name: "Konjugation", link: "/konj" },
    { name: "Stats", link: "/stats" },
  ];
  let [open, setOpen] = useState(false);


  return (
    <div className="shadow-md w-full top-0 left-0 mb-2 relative">
      <div className="md:flex items-center justify-between bg-indigo-950 py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-serif text-slate-50">
          <span className="text-3xl text-red-600 mr-1 pt-2">
            <ion-icon name="globe-outline"></ion-icon>
          </span>
          WorterMeister 
        </div>
            <span><VisitorTracker/></span>
        <div onClick={() => setOpen(!open)}
         className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon
            className="bg-slate-200" 
            name={open ? "close" : "menu"}
          ></ion-icon>
        </div>

        <ul className={`font-serif mt-4 mb-0 ~text-lg/3xl max-md:bg-blue-600  max-md:mt-1 max-md:font-medium max-md:from-neutral-100  md:flex md:items-start md:pb-0 absolute md:static md:z-auto z-10 left-0 w-full md:w-auto md:pl-0 pl-4 transition-all duration-500 ease-in ${open ? "top-15 " : "top-[-490px]"}`} onClick={() => setOpen(!open)}>
          {Links.map((link) => (
            <li className="md:ml-1 text-xl md:my-0 my-2 mx-2  max-md:border-none pr-2 last:border-r-0 md:text-lg"
            key={link.name}
            >
              <Link to={link.link} className="text-slate-50 hover:text-red-400 hover:underline duration-500">
               {link.name} 
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
=======
import React, { useState } from "react";
import { Link } from "react-router-dom";
import VisitorTracker from "../Utils/VisitorTracker";

const Navbar = () => {
  let Links = [
    { name: "De-Turk", link: "/" },
    { name: "Turk-DE", link: "/turk" },
    { name: "Phrases", link: "/phrases" },
    { name: "Newest Words", link: "/newlyadd" },
    { name: "Add New Word", link: "/new" },
    { name: "Konjugation", link: "/konj" },
    { name: "Stats", link: "/stats" },
  ];
  let [open, setOpen] = useState(false);


  return (
    <div className="shadow-md w-full top-0 left-0 mb-2 relative">
      <div className="md:flex items-center justify-between bg-indigo-950 py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-serif text-slate-50">
          <span className="text-3xl text-red-600 mr-1 pt-2">
            <ion-icon name="globe-outline"></ion-icon>
          </span>
          WorterMeister 
        </div>
            <span><VisitorTracker/></span>
        <div onClick={() => setOpen(!open)}
         className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon
            className="bg-slate-200" 
            name={open ? "close" : "menu"}
          ></ion-icon>
        </div>

        <ul className={`font-serif mt-4 mb-0 ~text-lg/3xl max-md:bg-blue-600  max-md:mt-1 max-md:font-medium max-md:from-neutral-100  md:flex md:items-start md:pb-0 absolute md:static md:z-auto z-10 left-0 w-full md:w-auto md:pl-0 pl-4 transition-all duration-500 ease-in ${open ? "top-15 " : "top-[-490px]"}`} onClick={() => setOpen(!open)}>
          {Links.map((link) => (
            <li className="md:ml-1 text-xl md:my-0 my-2 mx-2  max-md:border-none pr-2 last:border-r-0 md:text-lg"
            key={link.name}
            >
              <Link to={link.link} className="text-slate-50 hover:text-red-400 hover:underline duration-500">
               {link.name} 
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
>>>>>>> ac66cd870623c2d837c44416ddf40ffab89ddab2
