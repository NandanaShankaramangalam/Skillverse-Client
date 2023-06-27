import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const stud = localStorage.getItem('student');
  if(stud){
    console.log('hello');
    
  }
  return (
    <div>
      <div className="grid grid-cols-4 gap-1 md:gap-3  mt-1 mb-8 md:mb-6 bg-custom-blue">
        <div className="col-span-1 row-span-2  bg-gray-200">
          <img src="./images/art.jpg" alt="..." className="img-style" />
        </div>
        {/* <div className="col-span-1 row-span-2 h-4/5 bg-gray-200">
    <img src="./images/art.jpg" alt="Image 1" className="w-96 h-auto object-cover" />
  </div> */}
        <div className="col-span-1 bg-gray-200">
          <img src="./images/knitting.jpg" alt="..." className="img-style" />
        </div>
        <div className="col-span-1 bg-gray-200">
          <img src="./images/sweing.jpg" alt="..." className="img-style" />
        </div>
        <div className="col-span-1 row-span-2 bg-gray-200">
          <img src="./images/music.jpg" alt="..." className="img-style" />
        </div>
        <div className="col-span-2 bg-gray-200 h-36 flex items-center justify-center bg-gradient-to-b from-white to-gray-200">
          <h1 className="text-center align-middle font-bold text-xl md:text-3xl">
            Explore your creativity with thousands of hands on classes
          </h1>
        </div>
        <div className="col-span-1 bg-gray-200">
          <img src="./images/cooking.jpg" alt="..." className="img-style" />
        </div>
        <div className="col-span-1 bg-gray-200">
          <img src="./images/drawing.jpg" alt="..." className="img-style" />
        </div>
        <div className="col-span-1 bg-gray-200">
          <img src="./images/graphic.jpg" alt="..." className="img-style" />
        </div>
        <div className="col-span-1 bg-gray-200">
          <img src="./images/photo.jpg" alt="..." className="img-style" />
        </div>
      </div>

      <div className="h-80 grid grid-cols-3 gap-0">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-style ">Get Creative</h1>
          <h1 className="text-style ">with</h1>
          <h1 className="text-style ">Skillverse</h1>
        </div>

        <div className="col-span-2 flex flex-col justify-center ml-5">
          <h1 className="quote-style">
            <span className="icon-style">
              <i className="fa-solid fa-check icon"></i>
            </span>
            Learn creative skills to achieve your personal and professional
            goals.
          </h1>
          <h1 className="quote-style">
            <span className="icon-style">
              <i className="fa-solid fa-check icon"></i>
            </span>
            Tune in and level up at your own pace.
          </h1>
          <h1 className="quote-style">
            <span className="icon-style">
              <i className="fa-solid fa-check icon"></i>
            </span>
            Go from dabbler to master in a matter of hours.
          </h1>
          <h1 className="quote-style">
            <span className="icon-style">
              <i className="fa-solid fa-check icon"></i>
            </span>
            Connect with a global community of curious creatives.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
