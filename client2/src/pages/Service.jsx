import React from 'react';
import { useNavigate } from 'react-router-dom';

const services = {
  Plumbing: [
    {
      _id:5,
      name: 'Ramesh Plumber',
      phone: '9876543210',
      field: 'Plumber',
      address: 'Sector 10, Noida',
      rating: 5,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=10',
    },
    {
      _id:6,
      name: 'Anil Pipes',
      phone: '9871234560',
      field: 'Plumber',
      address: 'Gurgaon, Haryana',
      rating: 4,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=11',
    },
    {
      _id:7,
      name: 'Anil Pipes',
      phone: '9871234560',
      field: 'Plumber',
      address: 'Gurgaon, Haryana',
      rating: 4,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=11',
    },
    {
      _id:8,
      name: 'Anil Pipes',
      phone: '9871234560',
      field: 'Plumber',
      address: 'Gurgaon, Haryana',
      rating: 4,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=11',
    },
  ],
  Electrician: [
    {
      _id:9,
      name: 'Vikas Electrician',
      phone: '9898989898',
      field: 'Electrician',
      address: 'Saket, Delhi',
      rating: 5,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=6',
    },
    {
      _id:10,
      name: 'Manoj Volt',
      phone: '9123456780',
      field: 'Electrician',
      address: 'Dwarka, Delhi',
      rating: 4,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=7',
    },
    {
      _id:11,
      name: 'Manoj Volt',
      phone: '9123456780',
      field: 'Electrician',
      address: 'Dwarka, Delhi',
      rating: 4,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=7',
    },
    {
      _id:12,
      name: 'Manoj Volt',
      phone: '9123456780',
      field: 'Electrician',
      address: 'Dwarka, Delhi',
      rating: 4,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=7',
    },
  ],
  Cleaning: [
    {
      _id:13,
      name: 'Deep Clean Pro',
      phone: '9009009001',
      field: 'Cleaner',
      address: 'Vashi, Navi Mumbai',
      rating: 4,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=8',
    },
    {
      _id:14,
      name: 'Sparkle Crew',
      phone: '9888777666',
      field: 'Cleaner',
      address: 'Rajkot, Gujarat',
      rating: 5,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=9',
    },
    {
      _id:15,
      name: 'Sparkle Crew',
      phone: '9888777666',
      field: 'Cleaner',
      address: 'Rajkot, Gujarat',
      rating: 5,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=9',
    },
    {
      _id:16,
      name: 'Sparkle Crew',
      phone: '9888777666',
      field: 'Cleaner',
      address: 'Rajkot, Gujarat',
      rating: 5,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=9',
    },
  ],
  'Body Massage': [
    {
      _id:17,
      name: 'Relax Spa',
      phone: '9870007890',
      field: 'Massage Therapist',
      address: 'Kolkata, West Bengal',
      rating: 5,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=12',
    },
    {
      _id:18,
      name: 'Heal & Relax',
      phone: '9100009990',
      field: 'Massage Therapist',
      address: 'Bandra, Mumbai',
      rating: 4,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=13',
    },
    {
      _id:19,
      name: 'Heal & Relax',
      phone: '9100009990',
      field: 'Massage Therapist',
      address: 'Bandra, Mumbai',
      rating: 4,
      profilePhoto: 'https://i.pravatar.cc/150?profilePhoto=13',
    },
    {
      _id:20,
      name: 'Heal & Relax',
      phone: '9100009990',
      field: 'Massage Therapist',
      address: 'Bandra, Mumbai',
      rating: 4,
      profilePhoto: 'https://i.pravatar.cc/150?img=13',
    },
  ],
};

const Service = () => {

  const navigate = useNavigate();
    const handleBooking = (id)=>{
      navigate(`/book/${id}`)
    }

  return (
    <section className="my-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-10">
        Explore Our Home Services
      </h1>

      {Object.entries(services).map(([category, providers], sectionIndex) => (
        <div key={sectionIndex} className="mb-16">
          <h2 className="text-2xl font-semibold text-pink-400 mb-6">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {providers.map((pro, index) => (
              <div
                key={index}
                className="card bg-base-200 bg-opacity-60 backdrop-blur-sm border border-gray-600 shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 text-white"
              >
                <figure className="px-6 pt-6">
                  <img
                    src={pro.profilePhoto}
                    alt={pro.name}
                    className="rounded-full w-24 h-24 object-cover border border-gray-500"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h3 className="card-title text-lg text-gray-300">{pro.name}</h3>
                  <p className="text-sm text-gray-300">📞 {pro.phone}</p>
                  <p className="text-sm text-gray-300">🛠️ {pro.field}</p>
                  <p className="text-sm text-gray-400">{pro.address}</p>
                  <div className="text-yellow-400 text-lg">
                    {'★'.repeat(pro.rating)}
                    <span className="text-gray-600">
                      {'★'.repeat(5 - pro.rating)}
                    </span>
                  </div>
                  <div className="card-actions mt-2">
                    <button className="btn btn-sm btn-accent" 
                    onClick={()=>{handleBooking(pro._id)}}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Service;
