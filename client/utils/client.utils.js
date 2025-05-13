import axios from "axios";
const baseUrl = "http://localhost:8000/api/v1/client"

const signupClient = async ({ username, fullName, email, password, phone, address }, profilePhoto) => {
  const form = new FormData();
  form.append('profilePhoto', profilePhoto);
  form.append('username', username);
  form.append('fullName', fullName);
  form.append('email', email);
  form.append('password', password);
  form.append('phone', phone);
  form.append('address', address);


  const url = baseUrl

  const res = await axios.post(url, form, { withCredentials: true })

  return res.data;
}

const loginClient = async (password, username = "", email = "",) => {
  if (!(username || email)) {
    throw new Error("username or email is required")
  }

  if (!password) {
    throw new Error("password is required")
  }

  const url = baseUrl + '/login'

  const data = username ? { username, password } : { email, password }

  const res = await axios.post(url, data, { withCredentials: true })
  return res.data;
}

const getClientInfo = async () => {
  const url = baseUrl + '/self'
  const res = await axios.get(url, { withCredentials: true })
  return res.data;
}

const updateClientDetails = async () => {

}

const changePassword = async (oldPassword, newPassword) => {

}

const getClientAppointments = async (page, limit, status) => {
  const url = 'http://localhost:8000/api/v1/appointment'
  const res = await axios.get(url, {
    params: {
      page, 
      limit, 
      status
    }, withCredentials: true
  })
  return res.data;
}


const logoutClient = async () => {
  const url = baseUrl + '/logout'
  const res = await axios.post(url,{},{withCredentials:true})
}

const deleteAppointment = async()=>{

}

export {
  signupClient,
  loginClient,
  getClientInfo,
  getClientAppointments,
  updateClientDetails,
  deleteAppointment,
  changePassword,
  logoutClient,
}