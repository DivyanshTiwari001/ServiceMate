import axios from "axios";
const baseUrl = "http://localhost:8000/api/v1/appointment"

const bookAppointment = async({appointmentDate,appointmentTime,issue,profId})=>{
    try{
        const currDate = new Date();
        const [year,month,day] = appointmentDate.split('-').map(item=>parseInt(item));
        const [hour,min] = appointmentTime.split(':').map(item=>parseInt(item));
        
        // date validation
        if(currDate.getFullYear()!==year)throw new Error("Booking can be done for this year only");
        if(currDate.getMonth()+1 !== month)throw new Error("Booking can be done for this month only");
        if(day < currDate.getDate())throw new Error("Not a valid date");

        // time validation
        if(hour<9 || hour>20)throw new Error('Booking accepted only for interval "9:00" - "20:59" ');
        if(min<0 || min>59) throw new Error("Not a valid time");

        // checking for issue description
        if(!issue  || issue.trim().length<5)throw new Error("Please describe your issue")

        // creating date object from date and time provided by user
        const date = new Date(Date.UTC(year,month-1, day, hour, min)).toISOString();
        const url = baseUrl
        const res = await axios.post(url,{date,issue,profId},{withCredentials:true})
        return res.data;
  
    }catch(err){
      alert(err.message);
    }
  }

  const cancelAppointment = async(appointmentId)=>{
      const url = baseUrl + `/${appointmentId}/cancel`;
      const res = await axios.patch(url,{},{withCredentials:true});
      return res.data;
  }

  export {
    bookAppointment,
    cancelAppointment
  }