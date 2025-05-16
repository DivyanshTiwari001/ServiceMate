import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const professionals = [
  {
    _id:1,
    name: 'master',
    phone: '4545454545',
    field: 'plumber',
    address: 'somewhere in Delhi',
    rating: 5,
    profilePhoto : 'https://i.imgur.com/1bX5QH6.png',
  },
  {
    _id:2,
    name: 'dummy1',
    phone: '7897897897',
    field: 'painter',
    address: '1-123 pivot street, Porbandar',
    rating: 5,
    profilePhoto: 'https://i.pravatar.cc/150?img=3',
  },
  {
    _id:3,
    name: 'dummy2',
    phone: '7897897897',
    field: 'painter',
    address: '1-123 pivot street, Porbandar',
    rating: 5,
    profilePhoto: 'https://i.pravatar.cc/150?img=4',
  },
  {
    _id:4,
    name: 'dummy3',
    phone: '9999999999',
    field: 'electrician',
    address: 'Gandhinagar, Gujarat',
    rating: 4,
    profilePhoto: 'https://i.pravatar.cc/150?img=5',
  },
];

const ServiceSection = () => {
  const navigate = useNavigate();
  const handleBooking = (id)=>{
    navigate(`/book/${id}`)
  }
  return (
    <section className="my-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10 text-red-400">
        Top Professionals At Your Service
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {professionals.map((pro, index) => (
          <div
            key={index}
            className="card bg-base-200 bg-opacity-60 backdrop-blur-sm border border-gray-700 shadow-lg 
                       text-white transition-all duration-300 transform hover:-translate-y-2 
                       hover:shadow-2xl hover:border-primary hover:scale-105"
          >
            <figure className="px-6 pt-6">
              <img
                src={pro.profilePhoto}
                alt={pro.name}
                className="rounded-full w-24 h-24 object-cover border-2 border-gray-500"
              />
            </figure>
            <div className="card-body items-center text-center transition-all duration-300">
              <h3 className="card-title text-lg text-gray-100">{pro.name}</h3>
              <p className="text-sm text-gray-300">📞 {pro.phone}</p>
              <p className="text-sm text-gray-300">🛠️ {pro.field}</p>
              <p className="text-sm text-gray-400">{pro.address}</p>
              <div className="text-yellow-400 text-lg">
                {'★'.repeat(pro.rating)}
                <span className="text-gray-600">
                  {'★'.repeat(5 - pro.rating)}
                </span>
              </div>
              <div className="card-actions mt-3">
                <button 
                className="btn btn-sm btn-accent hover:scale-105 transition"
                onClick={()=>{handleBooking(pro._id)}}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/services">
          <button className="btn btn-wide btn-error text-white text-lg shadow-lg hover:scale-105 transition duration-300">
            View More Services
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ServiceSection;
