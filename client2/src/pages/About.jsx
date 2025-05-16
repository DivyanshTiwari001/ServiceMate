import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mb-16">
          <div className="lg:w-1/2" data-aos="fade-right">
            <h1 className="text-4xl font-bold mb-4 text-green-400">
              Welcome to ServiceMate
            </h1>
            <p className="text-lg mb-4">
              At ServiceMate, we provide top-notch home services right at your
              doorstep. Whether it's plumbing, electrical fixes, or general
              household repairs – our professionals are here to help.
            </p>
            <p>
              Trusted by hundreds of households, we are committed to quality,
              punctuality, and customer satisfaction.
            </p>
          </div>
          <div className="lg:w-1/2" data-aos="fade-left">
            <img
              src="https://img.freepik.com/free-vector/character-illustration-home-improvement-concept_53876-66089.jpg?ga=GA1.1.299792474.1745649703&semt=ais_hybrid&w=740"
              alt="ServiceMate"
              className="rounded-xl shadow-2xl w-full opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Services Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up">
          {/* Card 1 */}
          <div className="card bg-gray-800 shadow-lg border border-gray-700">
            <figure className="px-4 pt-4">
              <img
                src="https://img.freepik.com/free-vector/plumber-service-concept-illustration_114360-7721.jpg"
                alt="Plumbing"
                className="rounded-xl h-40 object-contain"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title justify-center text-green-400">Plumbing</h2>
              <p>Professional pipe fitting, leakage repair, and bathroom installations.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-gray-800 shadow-lg border border-gray-700">
            <figure className="px-4 pt-4">
              <img
                src="https://img.freepik.com/free-vector/electrician-service-concept-illustration_114360-8815.jpg"
                alt="Electrician"
                className="rounded-xl h-40 object-contain"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title justify-center text-green-400">Electrician</h2>
              <p>Skilled electricians for wiring, lighting, and power backup solutions.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-gray-800 shadow-lg border border-gray-700">
            <figure className="px-4 pt-4">
              <img
                src="https://img.freepik.com/free-vector/character-illustration-home-improvement-concept_53876-66089.jpg?ga=GA1.1.299792474.1745649703&semt=ais_hybrid&w=740"
                alt="Household Repairs"
                className="rounded-xl h-40 object-contain"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title justify-center text-green-400">Household Repairs</h2>
              <p>From furniture fixes to wall repairs – we handle it all, with care.</p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-green-400 mb-4">Our Mission</h2>
          <p className="text-lg max-w-3xl mx-auto">
            We aim to revolutionize the home services industry by connecting
            homeowners with trained professionals through technology – making
            services faster, affordable, and more reliable than ever before.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
