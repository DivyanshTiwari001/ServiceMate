import { Star } from "lucide-react";
import { getFormattedDateTime } from "../utils/util";

const statusColors = {
  pending: "text-yellow-400",
  accepted: "text-green-400",
  rejected: "text-red-400",
  cancelled: "text-gray-400",
};

export const AppointmentCard = ({ appt, rating, onRate }) => {
  const user = appt.user;
  const {date,time} = getFormattedDateTime(appt.date)
  return (
    <div className="bg-[#1E293B] text-white border border-[#334155] rounded-xl p-4">
      <div className="flex items-center gap-4">
        <img
          src={user.profilePhoto}
          alt={user.fullName || "User"}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{user.fullName || "Unnamed User"}</h3>
          {user.phone && <p className="text-sm text-pink-400">📞 {user.phone}</p>}
          {user.address && <p className="text-sm text-gray-300">📍 {user.address}</p>}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p><span className="text-white font-medium">Date:</span> {date || "N/A"}</p>
        <p><span className="text-white font-medium">Time:</span> {time || "N/A"}</p>
        <p><span className="text-white font-medium">Issue:</span> {appt.issue}</p>
      </div>

      <p className={`mt-3 font-medium ${statusColors[appt.status] || "text-white"}`}>
        Status: {appt.status}
      </p>

      <div className="mt-4 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 cursor-pointer ${
              rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
            }`}
            onClick={() => onRate(appt._id, star)}
          />
        ))}
      </div>
    </div>
  );
};
