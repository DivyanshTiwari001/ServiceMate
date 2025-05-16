import React, { useState } from 'react';
import { Calendar, Clock, FileText, Phone, Wrench } from 'lucide-react';
import { useEffect } from 'react';

const BookingForm = ({ professional }) => {
  
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    problem: '',
    serviceType: professional?.field || ''
  });

  const [prof,setProf] = useState(null)
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process booking submission here
    console.log("Booking submitted:", {
      ...bookingData,
      professionalId: professional?._id
    });
    
    // Show success message or redirect
    alert("Booking request sent successfully!");
  };

  useEffect(()=>{
    if(professional){
      setProf(professional)
      setBookingData(prev=>({...prev,serviceType:professional.field}))
    }
  },[professional])

  return (
    prof && <div className="flex justify-center items-center min-h-screen bg-[#273446] py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full mx-auto">
        {/* Professional Details */}
        <div className="w-full md:w-1/2 order-1 bg-[#111827] rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Professional Details</h2>
          
          <div className="flex flex-col items-center p-6 border border-[#1f2937] rounded-lg bg-[#1f2937]">
            <img 
              src={prof.profilePhoto} 
              alt={prof.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-600 mb-4"
            />
            
            <h3 className="text-2xl font-bold text-white">{prof.name}</h3>
            <div className="mt-1 px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
              {prof.field}
            </div>
            
            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#111827] rounded border border-blue-600">
                <span className="font-medium text-white">Expertise</span>
                <span className="text-white">{prof.field}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#111827] rounded border border-blue-600">
                <span className="font-medium text-white">Rating</span>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < Math.floor(prof.rating) ? 'text-yellow-400' : 'text-white'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-white">{prof.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#111827] rounded border border-blue-600">
                <span className="font-medium text-white">Contact Number</span>
                <div className="flex items-center">
                  <Phone size={16} className="mr-2 text-blue-600" />
                  <span className="text-white">{prof.phone}</span>
                </div>
              </div>
              
              <div className="p-3 mt-6 border border-blue-600 rounded bg-[#111827]">
                <h4 className="font-medium text-white mb-2">Available Hours</h4>
                <div className="text-sm text-white">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Booking Form */}
        <div className="w-full md:w-1/2 order-2 bg-[#1f2937] rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex justify-center items-center">
            <span className="ml-3">Book a Service</span>
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white mb-2 font-medium">Service Type</label>
              <div className="relative">
                <input
                  type="text"
                  name="serviceType"
                  value={bookingData.serviceType}
                  className="w-full p-3 pl-10 border border-[#04b8a8] rounded-md bg-[#111827] cursor-not-allowed"
                  disabled
                />
                <Wrench className="absolute left-3 top-3 text-white" size={20} />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-white mb-2 font-medium">Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  className="w-full p-3 pl-10 border border-[#04b8a8]  bg-[#111827] rounded-md focus:outline-none focus:ring-2 focus:ring-[#04b8a8] focus:border-0"
                  required
                />
                <Calendar className="absolute left-3 top-3 text-white" size={20} />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-white mb-2 font-medium">Time</label>
              <div className="relative">
                <input
                  type="time"
                  name="time"
                  value={bookingData.time}
                  onChange={handleInputChange}
                  className="w-full p-3 pl-10 border border-[#04b8a8] bg-[#111827] rounded-md focus:outline-none focus:ring-2 focus:ring-[#04b8a8] focus:border-0"
                  required
                />
                <Clock className="absolute left-3 top-3 text-white" size={20} />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-white mb-2 font-medium">Describe Your Problem</label>
              <div className="relative">
                <textarea
                  name="problem"
                  value={bookingData.problem}
                  onChange={handleInputChange}
                  className="w-full p-3 pl-10 border border-[#04b8a8] bg-[#111827] rounded-md focus:outline-none focus:ring-2 focus:ring-[#04b8a8] focus:border-0 h-32"
                  placeholder="Please describe the issue you're experiencing..."
                  required
                ></textarea>
                <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 font-bold rounded-md bg-red-500 hover:bg-red-600 text-white"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;