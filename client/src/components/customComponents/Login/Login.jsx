import {useContext,useEffect,useState} from 'react'
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
  }).min(1,{message:"*username is required"}),
  password: z.string({
    required_error:"password is required"
  }).min(1,{message:"*password is required"})
 }
)

function Login() {
  const {user,setUser} = useContext(UserContext);
  const [isprof,setIsProf] = useState(false);
  const [err,setErr] = useState(null)
  
  const navigate = useNavigate()
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[])

  const submitHandler = async(data)=>{
    try{
      let response;
      if(isprof){
        response = await loginProf(data.password,data.username); 
      }
      else response = await loginClient(data.password,data.username);
      console.log(response)
      if(response?.statusCode==200){
        const data = {...response.data,isprof}
        setUser(data)
        navigate('/');
      }
      else throw new Error();
      
    }catch(error){
      setErr("*Invalid credentials")
    }
    
  }
  const form = useForm({
    defaultValues:{
      username:"",
      password:""
    },
    resolver:zodResolver(formSchema)
  })

  return (
    <div className='w-full h-screen flex flex-row justify-center items-center'>
      <div className='w-2/3 h-1/2 lg:w-1/3 xl:w-1/3 flex flex-col items-center border-2 shadow-md'>
        <div className='w-fit font-serif text-4xl mt-2'>
          Login
        </div>
        {err && <div className='w-full text-red-700 text-center mt-2'>{err}</div>}
      <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="w-3/4 space-y-5 flex flex-col justify-center items-center ">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
              <FormItem className='w-full flex justify-center mt-10'>
              <div className='w-3/4 h-10'>
              <FormControl>
                <Input placeholder="Username" {...field} className='w-full h-full text-2xl border-2 border-gray-500'/>
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
              <div className='w-3/4 h-10'>
              <FormControl>
                <Input placeholder="Password" {...field} className="w-full h-full text-2xl border-2 border-gray-500"/>
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
    </div>
  )
}

export default Login





