const baseUrl = "http://localhost:8000/api/v1/clients"

const signupClient = async({username,fullName,email,password,phone,address,profilePhoto})=>{
  const form = new FormData();
  form.append('profilePhoto',profilePhoto);
  form.append('username',username);
  form.append('fullName',fullName);
  form.append('email',email);
  form.append('password',password);
  form.append('phone',phone);
  form.append('address',address);

  for (let [key, value] of form.entries()) {
    console.log(key, value);
  }

  const url = baseUrl + '/register'

  const res = await fetch(url,{
    method:'POST',
    body:form
  })

  return await res.json();
}

const loginClient = async(password,username="",email="",)=>{
  if(!(username || email)){
    throw new Error("username or email is required")
  }

  if(!password){
    throw new Error("password is required")
  }

  const url = baseUrl + '/login'
  
  const data = username ? {username,password} : {email,password}

  const res = await fetch(url,
    {
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data)
    }
  )
  return await res.json()
}

const getClientInfo = async()=>{
  const url = baseUrl + '/get-client'
  const res = await fetch(url,
    {
      method:'GET',
      withCredentials:true
    }
  )
  return await res.json();
}

const updateClientDetails = async()=>{

}

const changePassword = async(oldPassword,newPassword)=>{

}

const getClientAppointments = async()=>{

}

const logoutClient = async()=>{

}

export {
  signupClient,
  loginClient,
  getClientInfo,
  getClientAppointments,
  updateClientDetails,
  changePassword,
  logoutClient
}