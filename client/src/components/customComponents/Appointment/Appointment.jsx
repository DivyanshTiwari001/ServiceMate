import React, { useContext, useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { deleteAppointment, getClientAppointments } from '../../../../utils/client.utils'
import { Button } from '@/components/ui/button'


import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cancelAppointment } from '../../../../utils/appointment.utils'
import UserContext from '../../../context/userContext/UserContext'
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom'



function Appointment() {

  const [acceptedAppointment, setAcceptedAppointment] = useState(null)
  const [pendingAppointment, setPendingAppointment] = useState(null)
  const [completedAppointments, setCompletedAppointments] = useState(null)
  const {user} = useContext(UserContext)

  const handleAppointmentCancellation = async(appointment)=>{
        const res = await cancelAppointment(appointment._id);
        let temp = [];
        switch(appointment.status){
          case 'accepted':
            temp = acceptedAppointment.filter(item=>item._id!=appointment._id);
            if(temp.length == 0)setAcceptedAppointment(prev=>null);
            else setAcceptedAppointment(prev=>temp)
            break;
          case 'pending':
            temp = pendingAppointment.filter(item=>item._id!=appointment._id);
            if(temp.length == 0)setPendingAppointment(prev=>null);
            else setPendingAppointment(prev=>temp)
            break;
        }
  }
  const handleRemoveAppointment = async(appointment)=>{
    let res = null
    let temp = []
    if(!user.isProf)res = await deleteAppointment(appointment._id);
    temp = completedAppointments.filter(item=>item._id!=appointment._id);
    if(temp.length == 0)setCompletedAppointments(prev=>null);
    else setCompletedAppointments(prev=>temp)
  }
  const getDateFromString = (str) => {
    const [date, time, ...args] = str.split("T")
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`;
  }
  const getTimeFromString = (str) => {
    const [date, time, ...args] = str.split("T")
    const [hour, min] = time.split(":")
    return `${hour}:${min}`;
  }

  const fetchAppointments = async () => {
    const pending = await getClientAppointments(1, 10, 'pending');
    const accepted = await getClientAppointments(1, 10, 'accepted');
    const completed = await getClientAppointments(1, 10, 'completed');
    if(pending.data.length>0)setPendingAppointment(prev => pending.data);
    if(accepted.data.length>0)setAcceptedAppointment(prev => accepted.data)
    if(completed.data.length>0)setCompletedAppointments(prev => completed.data);
  }
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, [])

  return (
    <div className='w-screen h-fit flex flex-col items-center mt-2'>
      {
        pendingAppointment &&
        <div className='w-3/4 h-[60%] flex flex-col'>
          <div className='h-[10%] font-bold text-rose-600 text-3xl mb-2'>
            <h3 className='border-b-2 shadow-md'>Pending Appointments:</h3>
          </div>
          {/* appointments */}
          <div className='w-full h-[90%] mt-2'>
            <Carousel className='w-full h-full'>
              <CarouselContent className='w-full h-84'>
                {
                  pendingAppointment.map((item,index) => {
                    return <CarouselItem className='w-full h-full lg:basis-1/3 md:basis-1/2' key={'penapp-' + (item._id + index)}>
                      <Card className='w-full h-full'>
                        <CardContent className='w-full h-full'>
                          <div className='w-full h-full border-2 border-gray-500 rounded-md shadow-rose-dark shadow-md flex flex-col'>
                            <div className='w-full flex flex-row justify-center mt-1 border-b-2 shadow-md shadow-rose-dark'>
                              {/* professional_details */}
                              <div className='w-1/3'>
                                <img src={item.professional_details.profilePhoto} alt="" className='w-20 h-20 rounded-full border-2 border-gray-600 shadow-md shadow-rose-dark' />
                              </div>
                              <div className='w-1/3'>
                                <table>
                                  <tbody>
                                    <tr className='font-bold font-serif text-xl'><td>{item.professional_details.username}</td></tr>
                                    <tr className='font-bold font-serif'><td>{item.professional_details.fullName}</td></tr>
                                    <tr className='font-bold font-serif'><td>{item.professional_details.phone}</td></tr>
                                    <tr className='font-bold font-serif'><td>{item.professional_details.field}</td></tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className='w-full flex flex-col items-center mt-1'>
                              <div className='w-full mb-4'>
                                  <div className='w-full'>
                                    <div className='w-full flex flex-row justify-center'>
                                      <div className='w-1/2 font-bold'>Status</div>
                                      <div className='w-1/3'>{' : ' + item.status}</div>
                                    </div>
                                  </div>

                                  <div className='w-full'>
                                    <div className='w-full flex flex-row justify-center'>
                                      <div className='w-1/2 font-bold'>Appointment Date</div>
                                      <div className='w-1/3'>{' : ' + getDateFromString(item.date)}</div>
                                    </div>
                                  </div>
                                  <div className='w-full'>
                                    <div className='w-full flex flex-row justify-center'>
                                      <div className='w-1/2 font-bold'>Appointment Time</div>
                                      <div className='w-1/3'>{' : ' + getTimeFromString(item.date)}</div>
                                    </div>
                                  </div>
                                  <div className='w-full'>
                                    <div className='w-full flex flex-row justify-center'>
                                      <HoverCard>
                                        <HoverCardTrigger className='w-full flex flex-row justify-center'>
                                          <div className='w-1/2 font-bold'>Issue</div>
                                          <div className='w-1/3'>{' : ' + ((item?.issue || 'No issue described by you.').length>15 ? (item?.issue || 'No issue described by you.').slice(0,8) + '...' : item?.issue || 'No issue described by you.')}</div>
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                          <div className='w-full'>{(item?.issue || 'No issue described by you.')}</div>
                                        </HoverCardContent>
                                      </HoverCard>
                                      
                                    </div>
                                  </div>
                              </div>
                              <Button className='font-bold font-serif' onClick={()=>{handleAppointmentCancellation(item)}}>Cancel Appointment</Button>
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
      }
      {
        acceptedAppointment &&
        <div className='w-3/4 h-[60%] flex flex-col'>
          <div className='h-[10%] font-bold text-rose-600 text-3xl mb-2'>
            <h3 className='border-b-2 shadow-md'>Accepted Appointments:</h3>
          </div>
          {/* appointments */}
          <div className='w-full h-[90%] mt-2'>
            <Carousel className='w-full h-full'>
              <CarouselContent className='w-full h-84'>
                {
                  acceptedAppointment.map((item,index) => {
                    return <CarouselItem className='w-full h-full lg:basis-1/3 md:basis-1/2' key={'accapp-' + (item._id + index)}>
                      <Card className='w-full h-full'>
                        <CardContent className='w-full h-full'>
                          <div className='w-full h-full border-2 border-gray-500 rounded-md shadow-rose-dark shadow-md flex flex-col'>
                            <div className='w-full flex flex-row justify-center mt-1 border-b-2 shadow-md shadow-rose-dark'>
                              {/* professional_details */}
                              <div className='w-1/3'>
                                <img src={item.professional_details.profilePhoto} alt="" className='w-20 h-20 rounded-full border-2 border-gray-600 shadow-md shadow-rose-dark' />
                              </div>
                              <div className='w-1/3'>
                              <table>
                                  <tbody>
                                    <tr className='font-bold font-serif text-xl'><td>{item.professional_details.username}</td></tr>
                                    <tr className='font-bold font-serif'><td>{item.professional_details.fullName}</td></tr>
                                    <tr className='font-bold font-serif'><td>{item.professional_details.phone}</td></tr>
                                    <tr className='font-bold font-serif'><td>{item.professional_details.field}</td></tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className='w-full flex flex-col items-center mt-1'>
                              <div className='w-full mb-4'>
                                  <div className='w-full'>
                                    <div className='w-full flex flex-row justify-center'>
                                      <div className='w-1/2 font-bold'>Status</div>
                                      <div className='w-1/3'>{' : ' + item.status}</div>
                                    </div>
                                  </div>

                                  <div className='w-full'>
                                    <div className='w-full flex flex-row justify-center'>
                                      <div className='w-1/2 font-bold'>Appointment Date</div>
                                      <div className='w-1/3'>{' : ' + getDateFromString(item.date)}</div>
                                    </div>
                                  </div>
                                  <div className='w-full'>
                                    <div className='w-full flex flex-row justify-center'>
                                      <div className='w-1/2 font-bold'>Appointment Time</div>
                                      <div className='w-1/3'>{' : ' + getTimeFromString(item.date)}</div>
                                    </div>
                                  </div>
                                  <div className='w-full'>
                                    <div className='w-full flex flex-row justify-center'>
                                      <HoverCard>
                                        <HoverCardTrigger className='w-full flex flex-row justify-center'>
                                          <div className='w-1/2 font-bold'>Issue</div>
                                          <div className='w-1/3'>{' : ' + ((item?.issue || 'No issue described by you.').length>15 ? (item?.issue || 'No issue described by you.').slice(0,8) + '...' : item?.issue || 'No issue described by you.')}</div>
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                          <div className='w-full'>{(item?.issue || 'No issue described by you.')}</div>
                                        </HoverCardContent>
                                      </HoverCard>
                                      
                                    </div>
                                  </div>
                              </div>
                              <Button className='font-bold font-serif' onClick={()=>{handleAppointmentCancellation(item)}}>Cancel Appointment</Button>
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
      }
      {
        completedAppointments &&
        <div className='w-3/4 h-[60%] flex flex-col'>
          <div className='h-[10%] font-bold text-rose-600 text-3xl mb-2'>
            <h3 className='border-b-2 shadow-md'>Past Appointments:</h3>
          </div>
          {/* appointments */}
          <div className='w-full h-[90%] mt-2'>
            <Carousel className='w-full h-full'>
              <CarouselContent className='w-full h-84'>
                {
                  completedAppointments.map((item,index) => {
                    return <CarouselItem className='w-full h-full lg:basis-1/3 md:basis-1/2' key={'comapp-'+(item._id + index)}>
                      <Card className='w-full h-full'>
                        <CardContent className='w-full h-full'>
                          <div className='w-full h-full border-2 border-gray-500 rounded-md shadow-rose-dark shadow-md flex flex-col'>
                            <div className='w-full flex flex-row justify-center mt-1 border-b-2 shadow-md shadow-rose-dark'>
                              {/* professional_details */}
                              <div className='w-1/3'>
                                <img src={item.professional_details.profilePhoto} alt="" className='w-20 h-20 rounded-full border-2 border-gray-600 shadow-md shadow-rose-dark' />
                              </div>
                              <div className='w-1/3'>
                              <table>
                                  <tbody>
                                    <tr className='font-bold font-serif text-xl'><td>{item.professional_details.username}</td></tr>
                                    <tr className='font-bold font-serif'><td>{item.professional_details.fullName}</td></tr>
                                    <tr className='font-bold font-serif'><td>{item.professional_details.phone}</td></tr>
                                    <tr className='font-bold font-serif'><td>{item.professional_details.field}</td></tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className='w-full flex flex-col items-center mt-1'>
                              <div className='w-full mb-4'>
                                  <div className='w-full'>
                                    <div className='w-full flex flex-row justify-center'>
                                      <div className='w-1/2 font-bold'>Status</div>
                                      <div className='w-1/3'>{' : ' + item.status}</div>
                                    </div>
                                  </div>

                                  <div className='w-full'>
                                    <div className='w-full flex flex-row justify-center'>
                                      <div className='w-1/2 font-bold'>Appointment Date</div>
                                      <div className='w-1/3'>{' : ' + getDateFromString(item.date)}</div>
                                    </div>
                                  </div>
                                  <div className='w-full'>
                                    <div className='w-full flex flex-row justify-center'>
                                      <div className='w-1/2 font-bold'>Appointment Time</div>
                                      <div className='w-1/3'>{' : ' + getTimeFromString(item.date)}</div>
                                    </div>
                                  </div>
                                  <div className='w-full'>
                                    <div className='w-full flex flex-row justify-center'>
                                      <HoverCard>
                                        <HoverCardTrigger className='w-full flex flex-row justify-center'>
                                          <div className='w-1/2 font-bold'>Issue</div>
                                          <div className='w-1/3'>{' : ' + ((item?.issue || 'No issue described by you.').length>15 ? (item?.issue || 'No issue described by you.').slice(0,8) + '...' : item?.issue || 'No issue described by you.')}</div>
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                          <div className='w-full'>{(item?.issue || 'No issue described by you.')}</div>
                                        </HoverCardContent>
                                      </HoverCard>
                                      
                                    </div>
                                  </div>
                              </div>
                              <Button className='font-bold font-serif' onClick={()=>{handleRemoveAppointment(item)}}>Remove Appointment</Button>
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
      }
      {
        !pendingAppointment && ! acceptedAppointment && !completedAppointments && 
        <div className='w-screen h-screen text-4xl font-extrabold font-serif text-black flex flex-col items-center mt-2'>
          <h3>Nothing in the Appointments Section For You</h3>
          <HiArchiveBoxXMark className='lg:text-[400px] mt-8 text-rose-dark' />
        </div>
      }
    </div>
  )
}

export default Appointment