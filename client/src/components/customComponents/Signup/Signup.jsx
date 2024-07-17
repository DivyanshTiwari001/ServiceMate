import {useContext,useState} from 'react'
import UserContext from "../../../context/userContext/UserContext"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod";
import { signupClient } from '../../../../utils/client.utils.js';
import { signupProf} from '../../../../utils/professional.utils.js';
import {useNavigate} from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

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


// Style constants
const itemStyle = "w-3/4"
const inputStyle = "h-10 text-xl"

const registrationFormSchema = z.object({
  username:z.string({
    required_error:"Username is mandatory"
  }).min(4,{message:"Username must be atleast 4 character long"}),
  fullName:z.string({
    required_error:"Name is required"
  }),
  email:z.string().email(),
  password:z.string({
    required_error:"Password is required"
  }).min(8,{message:"Password must be atleast 8 character long"}),
  phone:z.string({
    required_error:"Phone number is required"
  }).min(10).max(10),
  address:z.string(),
  profilePhoto: z.any().optional(),
  field:z.string().optional(),
  experience:z.number().int().gte(0).optional()
})

function Signup() {
  const [isprof,setIsProf] = useState(false);
  const {setUser}  = useContext(UserContext);
  const navigate  = useNavigate();
  const form = useForm({
    resolver:zodResolver(registrationFormSchema),
    defaultValues:{
      profilePhoto:null
    }
  });
  
  const submitHandler = async(data)=>{
    console.log(data);
    try{
      let response;
      if(!isprof)response = await signupClient(data);
      else response = await signupProf(data);
      if(response.statusCode==200){
        setUser(response.data);
        navigate('/');
      }
      else throw new Error();
    }catch(error){
      alert("Something went wrong");
    }
  }

  return (
    <div>
      <Form {...form}>
      <div className='w-full  font-serif h-screen flex flex-col justify-center items-center'>
        <form className='border-2 shadow-md h-fit w-1/2 lg:w-1/3 space-y-3 flex flex-col justify-center items-center p-4' onSubmit={form.handleSubmit(submitHandler)}>
          <div className='text-4xl mb-1 mt-1'>SignUp</div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className={itemStyle}>
                    <FormControl>
                      <Input placeholder="Username" {...field} className={inputStyle}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className={itemStyle}>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} className={inputStyle}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className={itemStyle}>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} className={inputStyle}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className={itemStyle}>
                    <FormControl>
                      <Input placeholder="Password" type="password" {...field} className={inputStyle}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className={itemStyle}>
                    <FormControl>
                      <Input placeholder="Phone" type="phone" {...field} className={inputStyle}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className={itemStyle}>
                    <FormControl>
                      <Input placeholder="Address" {...field} className={inputStyle}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField
                  control={form.control}
                  name="profilePhoto"
                  render={({ field }) => (
                    <FormItem className={itemStyle}>
                    <FormLabel>Profile Photo:</FormLabel>
                    <FormControl>
                      <Input placeholder="Profile Photo" type="file" {...field}
                       className={inputStyle}
                       />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                {(isprof)?
                  <>
                <FormField
                  control={form.control}
                  name="field"
                  render={({ field }) => (
                    <FormItem className={itemStyle}>
                    <FormControl>
                      <Input placeholder="Field" {...field} className={inputStyle}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem className={itemStyle}>
                    <FormControl>
                      <Input placeholder="experience" {...field} className={inputStyle}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                </>
                :""
              }
              <div className='flex justify-between  w-3/4 text-xl'>
              <label htmlFor="">Signup as Professional</label>
                  <Switch 
                  checked={isprof}
                  onCheckedChange={()=>{
                    setIsProf(!isprof)
                  }}
                />
              </div>
        <Button type="submit" className="w-28 h-11 text-xl">Submit</Button>
        </form>
      </div>
      </Form>
    </div>
  )
}

export default Signup