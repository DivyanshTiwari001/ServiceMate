import axios from 'axios';

const baseUrl = "http://localhost:8000/api/v1/professionals"


const signupProf = async({username,fullName,email,password,phone,address,field,experience},profilePhoto)=>{
  const form = new FormData();
  console.log(profilePhoto)
  form.append('profilePhoto',profilePhoto);
  form.append('username',username);
  form.append('fullName',fullName);
  form.append('email',email);
  form.append('password',password);
  form.append('phone',phone);
  form.append('address',address);
  form.append('field',field);
  form.append('experience',experience);

  const url = baseUrl + '/register'

  const res = await axios.post(url,form,{withCredentials:true})

  return res.data;
}




const loginProf = async(password,username="",email="",)=>{
    if(!(username || email)){
      throw new Error("username or email is required")
    }
  
    if(!password){
      throw new Error("password is required")
    }
  
    const url = baseUrl + '/login'
    
    const data = username ? {username,password} : {email,password}
  
    const res = await axios.post(url,data,{withCredentials:true})
    return res.data;
  }

  const getProfessionals = async(page,limit=10,field=-1)=>{
    const url  = baseUrl + '/get-all-professionals'
    const res = await axios(url,{params:{page,limit,field},withCredentials:true})
    return res.data;
  }

  const getProfInfo = async()=>{
    const url = baseUrl + '/get-professional'
    const res = await axios.get(url,{withCredentials:true})
    return res.data;

  }

  const getAppointments = async(page=1,limit=10,status=0)=>{
      const url  = baseUrl + '/get-appointments'
      const res = await axios.get(url,{params:{page,limit,status},withCredentials:true})
      console.log(res)
      return res.data;
  }

  export {
    loginProf,
    signupProf,
    getProfessionals,
    getProfInfo,
    getAppointments
  }