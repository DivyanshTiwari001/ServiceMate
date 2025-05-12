import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import {Home,Dashboard,Login,Signup,Appointment, AppointmentForm, ProfessionalPage} from "./components/customComponents"

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:"/appointment",
        element:<Appointment/>
      },
      {
        path:'/appointment-form',
        element:<AppointmentForm/>
      },
      {
        path:'/list-prof',
        element:<ProfessionalPage/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
