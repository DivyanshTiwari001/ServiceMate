import UserContext from '@/context/userContext/UserContext';
import React, { useContext, useEffect,useCallback, useState } from 'react'
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Rating from '../Rating/Rating';
import { getClientInfo } from '../../../../utils/client.utils';
import { getAppointments, getProfessionals, getProfInfo } from '../../../../utils/professional.utils';
import { useNavigate } from 'react-router-dom';



function ClientHome(){
    const [professionals,setProfessionals] = useState(null)
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    
    
    const handleBookNow = async(prof)=>{
        if(!user) navigate('/login')
        navigate('/appointment-form',{state:prof})
    }

    const fetchProfessionals = async()=>{
        const res = await getProfessionals(1);
        setProfessionals(res.data)
    }

    useEffect(()=>{
        fetchProfessionals();
    },[])
      
      const services = {
        plumber: {
          url: './resources/plumber.jpeg',
          message: 'All plumbing problems one solution. Book a plumber right now!',
          card: 'bg-rose-lite',
          button: 'hover:ring-2 hover:ring-white font-bold font-serif bg-rose-700 hover:bg-rose-500 text-xl'
        },
        electrician: {
          url: "./resources/electrician.jpg",
          message: "Power up your home with our top-rated electricians – book now for an exclusive 20% discount and swift, reliable service!",
          card: 'bg-amber-3 text-black',
          button: 'bg-amber-500 font-bold text-black hover:ring-2 hover:ring-black hover:bg-amber-200 font-serif text-xl'
        },
        painter: {
          url: "./resources/painter.jpg",
          message: "Transform your space today with our expert wall painters – book now for an instant 20% discount and a stunning new look!",
          card: 'bg-green-700',
          button: 'bg-green-800  hover:bg-green-400 hover:ring-2 hover:ring-white hover:text-black font-serif text-xl font-bold'
        },
        carpenter: {
          url: "./resources/carpenter.jpg",
          message: "Craft the perfect home with our skilled carpenters – book now and enjoy a special 20% discount on all services!",
          card: 'bg-slate-700',
          button: 'bg-rose-700  hover:bg-rose-400 hover:ring-2 hover:ring-white hover:text-black font-serif text-xl font-bold'
        },
        houseHelp: {
          url: "./resources/househelp.jpg",
          message: "Experience a spotless home with our trusted househelp – book now and get 20% off your first service!",
          card: 'bg-fuchsia-700',
          button: 'bg-fuchsia-800  hover:bg-fuchsia-400 hover:ring-2 hover:ring-white hover:text-black font-serif text-xl font-bold'
        }
      }
      const reviews = [
        {
          profilePhoto:"https://github.com/shadcn.png",
          message:'too good services',
          rating:'4'
        }
      ] 
return (
<div className="w-screen mt-4 box-border flex flex-col">
    <div className='w-full h-96 flex flex-col items-center justify-center'>
        {/* services */}
        <div className='w-5/12 h-96 flex flex-col justify-center'>
          <Carousel className='h-96'>
            <CarouselContent>
              {
                Object.keys(services).map((key) => {

                  return (
                    <CarouselItem className='h-96 flex flex-col justify-center' key={"caraousel" + key}>
                      <Card>
                        <CardContent className='w-full p-0'>
                          <div className='w-full flex flex-row justify-center'>
                            <img src={services[key].url} alt="" className='w-2/3 h-96 rounded-l-md' />
                            <div className={`w-1/3 h-96 text-white font-bold flex flex-col items-center gap-y-5 justify-center rounded-r-md hover:opacity-95 ${services[key].card}`}>
                              <p className='text-center text-2xl font-serif'>{services[key].message}</p>
                              <Button className={services[key].button}>Book Now!</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  )
                })
              }
            </CarouselContent>
            <CarouselPrevious className='-left-20 h-14 w-14 bg-rose-dark hover:bg-rose-dark disabled:bg-rose-dark' arrow="h-8 w-8 bg-rose-dark text-white" />
            <CarouselNext className='-right-20 h-14 w-14 bg-rose-dark hover:bg-rose-dark disabled:bg-rose-dark' arrow="h-8 w-8 bg-rose-dark text-white" />
          </Carousel>
        </div>

      </div>
      <div className='w-screen h-fit mt-8'>

        {/* top professionals */}
        {
        <div className='w-full h-full'>
          <div className='w-full flex flex-row justify-center font-serif font-extrabold text-3xl p-2 text-rose-600'>
            <h3 className='border-b-2 mb-2 w-3/4'>Top Professionals At Your Service:</h3>
          </div>
          <div className='w-full h-84 flex flex-row justify-center items-center'>
            <Carousel className='w-3/4 h-84'>
              <CarouselContent>
                {
                 professionals && professionals.map((item) => {
                  return <CarouselItem className='lg:basis-1/3 md:basis-1/2' key={'prof-' + item._id}>
                    <Card className='h-84  flex flex-col justify-center rounded-2xl'>
                      <CardContent className='p-0'>
                        <div className="w-full h-84 border-2 flex flex-col justify-start items-center rounded-2xl">
                          <div className='w-full h-1/3 rounded-t-2xl flex flex-row justify-center border-b-2 shadow-sm'>
                            <img src={item.profilePhoto} className='rounded-full w-28 h-28' alt="" />
                          </div>
                          <div className='w-full h-2/3 flex flex-col items-center gap-y-1'>
                            <div className='w-full flex flex-col items-center'>
                              <p className='w-full text-3xl font-bold font-sans text-center'>
                                {item.username}
                              </p>
                              <table className='w-3/4 font-sans mt-0'>
                              <tbody>
                                <tr className='w-full flex flex-row'>
                                  <td className='w-1/4  text-start text-xl'>Name </td>
                                  <td className='w-1/2 text-start text-xl ml-1'>{' : ' + item.fullName}</td>
                                </tr>
                                <tr className='w-full flex flex-row'>
                                  <td className='w-1/4  text-start text-xl'>Field </td>
                                  <td className='w-1/2 text-start text-xl ml-1'>{' : ' + item.field}</td>
                                </tr>
                                <tr className='w-full flex flex-row'>
                                  <td className='w-1/4  text-start text-xl'>Address</td>
                                  <td className='w-9/12  text-start text-xl ml-1'>{ ' : ' + (item.address).slice(0,30) + (((item.address).length>30)?' ...':'')}</td>
                                </tr>
                                <tr className='w-full flex flex-row'>
                                  <td className='w-1/4  text-start text-xl'>Rating </td>
                                  <td className='w-1/2 text-start text-xl flex flex-row ml-1'>{' : '}<Rating rating={item.rating} cssprop='mt-1 ml-1'/></td>
                                </tr>
                                </tbody>
                              </table>
                              
                            </div>
                            <Button className='font-serif font-bold text-lg absolute bottom-1' onClick={()=>{handleBookNow(item)}}>Book Now!</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                })
                }
              </CarouselContent>
              <CarouselPrevious className='-left-20 bg-rose-dark disabled:bg-rose-dark h-12 w-12 hover:bg-rose-dark' arrow='h-8 w-8 bg-rose-dark text-white'/>
              <CarouselNext className='-right-20 bg-rose-dark disabled:bg-rose-dark h-12 w-12 hover:bg-rose-dark' arrow='h-8 w-8 bg-rose-dark text-white'/>
            </Carousel>
          </div>
          </div>
        }
      </div>
      <div className='w-screen h-fit mt-8'>

        {/* top reviews */}

        <div className='w-full flex flex-row justify-center font-serif font-extrabold text-3xl p-2 text-rose-600'>
          <h3 className='border-b-2 mb-2 w-3/4'>What Our Cutomers Say:</h3>
        </div>
        <div className='w-full h-80 flex flex-row justify-center items-center'>
        <Carousel className='w-3/4 h-80'>
            <CarouselContent>
              {reviews.map((item) => {
                return <CarouselItem className='lg:basis-1/3 md:basis-1/2' key={'prof-' + item._id}>
                  <Card className='h-80  flex flex-col justify-center rounded-2xl'>
                    <CardContent className='p-0'>
                      <div className='w-full h-80 rounded-md flex flex-col items-center justify-center'>
                          <div className='w-3/4 h-72 border-2 rounded-xl border-slate-500 shadow-md shadow-rose-lite'>
                                <img src={item.profilePhoto} className='w-20 absolute top-0 left-12 rounded-full shadow-md 
                                shadow-rose-lite' alt="" />
                                <div className='w-full h-72 rounded-xl flex flex-col items-center justify-center'>
                                  <div className='w-3/4 border-2 font-serif bg-slate-500 rounded-xl text-white shadow-md shadow-rose-lite'>
                                  <p className='w-full font-bold mr-2 pl-2 font-serif text-lg  min-h-10'>
                                    {item.message}
                                  </p>
                                  <div className='w-3/4 font-bold mr-2 font-serif text-lg h-32 flex flex-row'>
                                    <div className='ml-2'>
                                      rating:
                                    </div>
                                    <Rating rating={item.rating} cssprop={'w-full flex flex-row justify-center mt-1'}/>
                                  </div>
                                  </div>
                                </div>
                          </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              })
              }
            </CarouselContent>
            <CarouselPrevious className='-left-20 bg-rose-dark disabled:bg-rose-dark h-12 w-12 hover:bg-rose-dark' arrow='h-8 w-8 bg-rose-dark text-white' />
            <CarouselNext className='-right-20 bg-rose-dark disabled:bg-rose-dark h-12 w-12 hover:bg-rose-dark' arrow='h-8 w-8 bg-rose-dark text-white' />
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default ClientHome;