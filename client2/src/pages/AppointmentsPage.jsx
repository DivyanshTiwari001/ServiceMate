import React, { useEffect, useState } from "react";
import { AppointmentCard } from "../Components/AppointmentCard";
import { Appointments } from "../Components/AppointmentData";
import Pagination from "../Components/Pagination";

const AppointmentsPage = () => {
  const appointments = Appointments;
  const [currentPage, setCurrentPage] = useState(1);
  const [ratings, setRatings] = useState({});
  const [filter, setFilter] = useState("");
  const [itemsPerPage,setItemsPerPage] = useState(6)

  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  let filtered = filter
    ? appointments.filter((a) => a.status.toLowerCase() === filter.toLowerCase())
    : appointments;

  let paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

    // Reset to first page when filters change
    useEffect(()=>{
      paginated = filtered.slice(
       (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
      )
    },[currentPage,itemsPerPage])

  const rateProfessional = (id, rating) => {
    setRatings((prev) => ({ ...prev, [id]: rating }));
    // TODO: send rating to backend
  };

  return (
    <div className="p-6 bg-[#0F172A] min-h-screen">
      <h2 className="text-3xl font-bold text-red-500 mb-4">Your Appointments</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        {["pending", "accepted", "rejected", "cancelled","all"].map((status) => (
          <button
            key={status}
            onClick={() => {
              if(status!=='all')setFilter(status);
              else setFilter(null)
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-md text-white border font-medium transition-colors duration-200 ${
              filter === status
                ? "bg-red-500 border-red-500"
                : "bg-[#1E293B] border-[#334155] hover:bg-[#334155]"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
        <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none text-sm flex-1 sm:flex-none"
                  >
                    <option value={4}>6 per page</option>
                    <option value={8}>9 per page</option>
                    <option value={12}>12 per page</option>
                    <option value={16}>18 per page</option>
                  </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.length > 0 ? (
          paginated.map((appt) => (
            <AppointmentCard
              key={appt._id}
              appt={appt}
              rating={ratings[appt._id] || 0}
              onRate={rateProfessional}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-gray-400 py-20">
            <Star className="w-12 h-12 mb-4 text-gray-500" />
            <p className="text-lg font-semibold">No appointments to show</p>
          </div>
        )}
      </div>

      {/* pagination */}
      <Pagination arr={appointments} page={{currentPage,setCurrentPage}} totalPages={totalPages} />
    </div>
  );
};

export default AppointmentsPage;
