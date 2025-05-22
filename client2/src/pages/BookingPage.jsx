// Example usage
import { useEffect,useState } from 'react';
import { useParams,useNavigate } from "react-router-dom";
import BookingForm from '../Components/BookingForm';

import { professionals } from '../Components/ProfessionalData';


export function BookingPage() {
  const { id } = useParams();
  const [prof, setProf] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const profHandler = async()=>{
        // const res = await getProf(id);
        const res = professionals[id-1];
        if(res){
            setProf(res)
        }
        else{
            console.log("something went wrong")
            navigate(-1)
        }
    } 
    profHandler()
  },[id])

  return <BookingForm professional={prof} />;
}