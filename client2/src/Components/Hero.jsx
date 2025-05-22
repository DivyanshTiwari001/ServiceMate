import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div
      className="hero min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1664476566495-30aee98a466f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Overlay */}
      <div className="hero-overlay bg-black bg-opacity-60 absolute inset-0 z-0"></div>

      {/* Content */}
      <div className="hero-content flex-col lg:flex-row-reverse text-white relative z-10 px-4 md:px-10">
        {/* Right: Image */}
        <img 
  src="https://img.freepik.com/free-vector/character-illustration-home-improvement-concept_53876-66089.jpg?ga=GA1.1.299792474.1745649703&semt=ais_hybrid&w=740"
  alt="Service Mate"
  className="w-[500px] opacity-70 rounded-2xl shadow-2xl lg:block hidden transition-transform duration-700 ease-in-out hover:scale-105"
  data-aos="fade-left"
  data-aos-duration="1000"
/>


        {/* Left: Text Content */}
        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Trusted Partner for Home Services
          </h1>
          <p className="mb-6 text-md md:text-lg">
            Need an electrician, plumber, or repair expert? <br />
            <span className="text-red-400 font-semibold">
              Service Mate
            </span>{" "}
            connects you with verified and skilled professionals near you —
            fast, reliable, and hassle-free!
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="btn bg-red-600 text-white hover:bg-red-700 transition-all"
            onClick={()=>{
              navigate("/search/plumber")
            }}>
              Book a Service
            </button>
            <button className="btn btn-outline text-white border-white hover:bg-white hover:text-red-600 transition-all"
            onClick={()=>{
              navigate("/about")
            }}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
