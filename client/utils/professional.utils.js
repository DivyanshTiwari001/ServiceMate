const baseUrl = "http://localhost:8000/api/v1/professionals"


const signupProf = async({username,fullName,email,password,phone,address,profilePhoto,field,experience})=>{
  const form = new FormData();
  console.log(profilePhoto);
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

  const res = await fetch(url,{
    method:'POST',
    body:form
  })

  return await res.json();
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

  export {
    loginProf,
    signupProf
  }