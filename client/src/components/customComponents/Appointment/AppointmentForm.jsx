import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UserContext from '@/context/userContext/UserContext'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { bookAppointment } from '../../../../utils/appointment.utils';

const isValidTimeRange = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const minHours = 9; // 09:00
    const maxHours = 20; // 20:59
    const minMinutes = 0;
    const maxMinutes = 59;

    if (hours < minHours || hours > maxHours) return false;
    if (hours === minHours && minutes < minMinutes) return false;
    if (hours === maxHours && minutes > maxMinutes) return false;
    return true;
};

// Schema for time with custom validation
const timeSchema = z.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format") // Basic time format validation
    .refine(time => isValidTimeRange(time), {
        message: "Time must be between 09:00 and 20:59",
    });

const date = new Date();
const yyyy = date.getFullYear();
const mm = String(date.getMonth()+1).padStart(2,'0');
const dd = String(date.getDate()).padStart(2,'0');

const formSchema = z.object({
    appointmentDate: z.string({
        required_error:"date is required"
    }),
    appointmentTime: timeSchema,
    issue:z.string().optional()
})

function AppointmentForm() {
    const location = useLocation();
    const prof = location.state;
    const navigate = useNavigate()
    
    const { user } = useContext(UserContext);
    
    useEffect(()=>{
        if(!user)navigate("/login")
        if (!prof) {
            navigate("/")
        }
    },[])

    const submitHandler = async (data) => {
        const res = await bookAppointment({...data,profId:prof._id})
        navigate("/appointment");
    }
    
    const form = useForm({
        defaultValues:{
            appointmentDate:`${yyyy}-${mm}-${dd}`,
            appointmentTime:"09:00",
            issue:''
        },
        resolver: zodResolver(formSchema)
    })
    return (
       user && prof &&  <div className='w-full h-screen flex flex-row justify-center items-start'>
            <div className='w-[90%] md:w-[60%] xl:w-[50%] h-fit border-2  border-gray-600 rounded-sm shadow-gray-400 shadow-md pb-2 mt-3'>
                <div className='w-full h-40 flex flex-row justify center border-y-2 shadow-md mb-2'>
                    {/* profile photo of prof */}
                    <div className='w-1/2 h-40 flex flex-row justify-center'>
                        <img src={(prof && prof.profilePhoto)?prof.profilePhoto:'https://github.com/shadcn.png'} alt="professional" className='w-32 h-32 rounded-full mt-1' />
                    </div>
                    <div className='w-1/2'>
                        <table>
                            <tbody>
                            <tr className='font-extrabold font-sans text-3xl'>
                                <td>{prof.username}</td>
                            </tr>
                            <tr className='font-bold font-sans text-xl'>
                                <td>{prof.fullName}</td>
                            </tr>
                            <tr className='font-bold font-sans text-xl'>
                                <td>{prof.field}</td>
                            </tr>
                            <tr className='font-bold font-sans text-xl'>
                                <td>{prof.phone}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitHandler)} className=' w-full flex flex-col justify-center items-center space-y-6'>
                            <FormField
                                control={form.control}
                                name="appointmentDate"
                                render={({ field }) => (
                                    <FormItem className='flex flex-row justify-center items-center w-full'>
                                        <FormLabel className='w-1/3 font-bolder font-sans text-xl'>Date of Appointment : </FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} min={`${yyyy}-${mm}-${dd}`} className='w-1/3 border-2 border-gray-600 text-xl font-bold font-sans'/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="appointmentTime"
                                render={({ field }) => (
                                    <FormItem className='flex flex-row justify-center items-center w-full'>
                                        <FormLabel className='w-1/3 font-bolder font-sans text-xl'>Time of Appointment : </FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} min={"09:00"} max={"20:59"} className='w-1/3 border-2 text-xl font-bold font-sans border-gray-600'/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="issue"
                                render={({ field }) => (
                                    <FormItem className='flex flex-row justify-center items-center w-full'>
                                        <FormControl>
                                            <textarea className='w-2/3 h-48 border-2 border-gray-600 rounded-md font-bolder font-sans text-xl text-black' {...field} placeholder='Describe your problem here...'></textarea>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className='w-32 font-bolder text-xl font-serif'>Book Now!</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default AppointmentForm