import React from 'react';

const testimonials = [
  {
    name: 'Aman Shah',
    role: 'Delhi, India',
    image: 'https://i.pravatar.cc/150?img=15',
    feedback:
      "ServiceMate sent a plumber within 30 minutes and fixed my kitchen leak instantly. Great response time!",
  },
  {
    name: 'Ritika Verma',
    role: 'Mumbai, India',
    image: 'https://i.pravatar.cc/150?img=14',
    feedback:
      "I booked a body massage and the experience was super relaxing. Professional and hygienic!",
  },
  {
    name: 'Karan Mehta',
    role: 'Ahmedabad, Gujarat',
    image: 'https://i.pravatar.cc/150?img=13',
    feedback:
      "Their electrician resolved my power issue in one visit. Very knowledgeable and polite service.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-900 py-16 px-4 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-lg uppercase tracking-widest text-pink-500 mb-2">Testimonials</h3>
        <h2 className="text-4xl font-bold mb-12 text-white">What our clients say about us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out border border-gray-700"
            >
              <div className="text-yellow-400 text-3xl mb-4">“</div>
              <p className="text-gray-200 text-base mb-6 italic">"{testimonial.feedback}"</p>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border border-pink-400"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500 max-w-xl mx-auto">
          <strong className="text-white text-base">No two homes are alike!</strong>
          <p>
            Our professional network understands your unique needs and ensures the right expert reaches your door with the perfect solution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
