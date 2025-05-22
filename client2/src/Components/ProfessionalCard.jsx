import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProfessionalCard({index,pro}) {
  const navigate = useNavigate()
  const handleBooking = (id)=>{
      navigate(`/book/${id}`)
    }
  return (
    <div
    key={index}
    className="card bg-base-200 bg-opacity-60 backdrop-blur-sm border border-gray-600 shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 text-white"
    >
                <figure className="px-6 pt-6">
                  <img
                    src={pro.profilePhoto}
                    alt={pro.fullName}
                    className="rounded-full w-24 h-24 object-cover border border-gray-500"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h3 className="card-title text-lg text-gray-300">{pro.fullName}</h3>
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
  )
}

export default ProfessionalCard