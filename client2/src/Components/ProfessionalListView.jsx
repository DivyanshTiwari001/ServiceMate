import { MapPin, Award, Wrench, Calendar, Star, StarHalf } from 'lucide-react';
import { FaProductHunt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const ProfessionalListItem = ({ professional }) => {
  const navigate = useNavigate()
    const handleBooking = (id)=>{
        navigate(`/book/${id}`)
    }
  return (<div className="bg-gradient-to-r from-gray-800 to-gray-750 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-700 hover:border-cyan-400/50 backdrop-blur-sm">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
      
      {/* Left Section - Profile Info */}
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <div className="relative flex-shrink-0">
          <img
            src={professional.profilePhoto}
            alt={professional.fullName}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-3 border-cyan-400 shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        
        {/* Professional Details */}
        <div className="flex-1 min-w-0">
          {/* Name and Username */}
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-3 mb-2">
            <h3 className="text-xl md:text-2xl font-bold text-white truncate">
              {professional.fullName}
            </h3>
            <span className="text-sm text-cyan-400 font-medium">@{professional.username}</span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(professional.rating)}
            </div>
            <span className="text-white font-semibold text-sm bg-gray-700 px-2 py-1 rounded-full">
              {professional.rating}
            </span>
            <span className="text-gray-400 text-sm hidden sm:inline">
              • {professional.reviewCount || '0'} reviews
            </span>
          </div>
          
          {/* Location and Experience */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-cyan-400 flex-shrink-0" />
              <span className="truncate">{professional.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award size={16} className="text-yellow-400 flex-shrink-0" />
              <span>{professional.experience} years experience</span>
            </div>
          </div>
          
          {/* Service Category */}
          <div className="mt-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Wrench size={14} className="mr-1" />
              {professional.field}
            </span>
          </div>
        </div>
      </div>
      
      {/* Right Section - Contact Info and Actions */}
      <div className="flex flex-col lg:items-end space-y-3 lg:min-w-0 lg:w-64">
        {/* Contact Information */}
        <div className="bg-gray-900/50 rounded-lg p-3 w-full">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Phone:</span>
              <a 
                href={`tel:${professional.phone}`}
                className="text-white hover:text-cyan-400 transition-colors text-sm font-medium"
              >
                {professional.phone}
              </a>
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="w-full">
          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
          onClick={()=>{handleBooking(professional._id)}}>
            <Calendar size={16} />
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

// Helper function for rendering stars (assuming you have this)
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
    );
  }
  
  if (hasHalfStar) {
    stars.push(
      <StarHalf key="half" size={16} className="fill-yellow-400 text-yellow-400" />
    );
  }
  
  const remainingStars = 5 - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} size={16} className="text-gray-600" />
    );
  }
  
  return stars;
};

export default ProfessionalListItem;

