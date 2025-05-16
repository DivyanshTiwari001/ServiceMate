// Example usage
import { useEffect,useState } from 'react';
import { useParams,useNavigate } from "react-router-dom";
import BookingForm from '../Components/BookingForm';


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
    }
];

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