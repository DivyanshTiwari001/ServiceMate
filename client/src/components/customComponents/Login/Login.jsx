import {useContext,useState} from 'react'
import UserContext from "../../../context/userContext/UserContext"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod";
import { loginClient } from '../../../../utils/client.utils.js';
import { loginProf } from '../../../../utils/professional.utils.js';
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

const formSchema = z.object(
 { 
  username: z.string({
    required_error:"username is required"
  }).min(4),
  password: z.string({
    required_error:"password is required"
  }).min(8,{message:"Password must be 8 or more characters long"})
 }
)

function Login() {
  const {setUser} = useContext(UserContext);
  const [isprof,setIsProf] = useState(false);
  const navigate = useNavigate();
  

  const submitHandler = async(data)=>{
    try{
      let response;
      if(isprof){
        response = await loginProf(data.password,data.username); 
      }
      else response = await loginClient(data.password,data.username);
      console.log(response)
      if(response?.statusCode==200){
        setUser(response.data);
        navigate('/');
      }
      else throw new Error();
      
    }catch(error){
      alert("Please login again")
    }
    
  }
  const form = useForm({
    resolver:zodResolver(formSchema)
  })

  return (
    <div className='w-full h-screen flex flex-row justify-center items-center'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="w-1/2 h-1/2 lg:w-1/3 xl:1/3 border-2 space-y-10 flex flex-col justify-center items-center shadow-md">
        <div className='w-fit font-serif text-4xl'>Login</div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
              <FormItem className='w-full flex justify-center mt-10'>
              <div className='border-2 w-3/4 h-10'>
              <FormControl>
                <Input placeholder="Username" {...field} className='w-full h-full text-2xl'/>
              </FormControl>
              <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
              <FormItem className='w-full flex justify-center'>
              <div className='border-2 w-3/4 h-10'>
              <FormControl>
                <Input placeholder="Password" {...field} className="w-full h-full text-2xl"/>
              </FormControl>
              <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className='w-3/4 flex justify-between font-serif text-xl'>
          <label htmlFor="">Login as Professional</label>
          <Switch 
            checked={isprof}
            onCheckedChange={()=>{
              setIsProf(!isprof)
            }}
          />
        </div>
        <Button type="submit" className="w-28 h-11 text-2xl">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default Login

