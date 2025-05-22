import React, { useEffect,useState } from 'react';
import { Search, Grid, List } from 'lucide-react';
import { useParams } from 'react-router-dom';
import ProfessionalCard from '../Components/ProfessionalCard';
import ProfessionalListItem from '../Components/ProfessionalListView';

// to be replaced by the actual data
import { professionals } from '../Components/ProfessionalData';
import Pagination from '../Components/Pagination';

const ServiceSearch = () => {
  const {service} = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState(service);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const services = ['Plumber', 'Electrician', 'Carpenter', 'Painter', 'Cleaner', 'Gardener'];


  const filteredProfessionals = professionals.filter(professional =>
    professional.field.toLowerCase() === selectedService.toLowerCase() &&
    (professional.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     professional.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
     professional.username.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedProfessionals = [...filteredProfessionals].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'experience') return b.experience - a.experience;
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedProfessionals.length / itemsPerPage);
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let currentProfessionals = sortedProfessionals.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(()=>{
    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = startIndex + itemsPerPage;
    currentProfessionals = sortedProfessionals.slice(startIndex, endIndex)
  },[currentPage])

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedService, sortBy]);


  return (
    <div className="min-h-screen bg-[#273446] px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
            Find Professional <span className="text-cyan-400">{selectedService.charAt(0).toUpperCase() + selectedService.substring(1).toLowerCase() }</span> Services
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
            Connect with verified professionals in your area
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg">
          <div className="flex flex-col space-y-4">
            {/* Service Selection */}
            <div className="w-full">
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <button
                    key={service}
                    onClick={() => setSelectedService(service)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedService.toLowerCase() === service.toLowerCase()
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-4">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-400 focus:outline-none text-sm"
                />
              </div>

              {/* Controls Row */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                {/* Sort and Items per page */}
                <div className="flex space-x-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none text-sm flex-1 sm:flex-none"
                  >
                    <option value="rating">Sort by Rating</option>
                    <option value="experience">Sort by Experience</option>
                  </select>

                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none text-sm flex-1 sm:flex-none"
                  >
                    <option value={4}>4 per page</option>
                    <option value={8}>8 per page</option>
                    <option value={12}>12 per page</option>
                    <option value={16}>16 per page</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2 justify-center sm:justify-start">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            {sortedProfessionals.length} {selectedService} Professional{sortedProfessionals.length !== 1 ? 's' : ''} Found
          </h2>
          <div className="text-gray-300 text-sm">
            Showing {startIndex + 1}-{Math.min(endIndex, sortedProfessionals.length)} of {sortedProfessionals.length} results
          </div>
        </div>

        {/* Professional Cards */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {currentProfessionals.map((professional) => (
              <ProfessionalCard key={professional.id} index={professional.id} pro={professional} />
            ))}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {currentProfessionals.map((professional) => (
              <ProfessionalListItem key={professional.id} professional={professional} />
            ))}
          </div>
        )}

        {/* No Results */}
        {sortedProfessionals.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-400 text-base sm:text-lg">No professionals found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        <Pagination arr={sortedProfessionals} page={{currentPage,setCurrentPage}} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ServiceSearch;