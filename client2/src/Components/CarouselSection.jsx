import React, { useEffect, useState } from 'react';

const CarouselSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://mobisoftinfotech.com/resources/wp-content/uploads/2018/08/Banner.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPcaJ4nhclki5HeCm4sASfopzCwJQrza7HiIUZ-waSXK0xwkocJyC-zgaCD816r_khmFU&usqp=CAU",
    "https://www.biztechcs.com/wp-content/uploads/2023/09/A-Quick-Guide-To-Build-an-On-demand-Home-Service-App-jpg.webp",
    "https://www.peerbits.com/static/3905412186deff06a07271c47b3c60df/189bc/on-demand-home-services-main.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="my-10 px-4" data-aos="fade-up">
      <h2 className="text-4xl font-bold text-center mb-6 text-red-500">Our Work in Action</h2>

      <div className="relative w-full max-w-3xl mx-auto rounded-box shadow-xl overflow-hidden h-64">
        {slides.map((src, index) => (
          <img
            key={index}
            src={src}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            alt={`Slide ${index}`}
          />
        ))}

        <div className="absolute flex justify-between w-full transform -translate-y-1/2 top-1/2 px-4">
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
            }
            className="btn btn-circle"
          >
            ❮
          </button>
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % slides.length)
            }
            className="btn btn-circle"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselSection;
