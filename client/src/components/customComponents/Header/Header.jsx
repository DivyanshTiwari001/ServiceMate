import React,{useContext,useState} from 'react'
import UserContext from "../../../context/userContext/UserContext"
import Sidebar from '../Sidebar/Sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {FaSearch} from "react-icons/fa";
import { Link } from 'react-router-dom'

function Header() {
  const [searchText,setSearchText] = useState('')
  const {user} = useContext(UserContext)

  const handleChangeSearchText = (e)=>{
    setSearchText(e.target.value)
  }

  return (
    <div className='w-screen h-20 flex flex-row mt-0 border-b-2 shadow-md'>
      <div className="w-1/6 flex flex-row justify-end">
       {/* logo */}
       <Link to='/' className='flex flex-col justify-center'>
        <img src='./resources/logo.png' alt="" className='h-16'/>
       </Link>
      </div>
      
      <div className="w-5/6 h-full flex flex-row">
        {/* rest of header */}
        <div className="w-3/4 h-full flex flex-row  items-center justify-center gap-x-2">
            {/* search bar */}
            <Input 
              type="text" 
              placeholder="Search" 
              className="w-1/2 font-serif text-md"
              value={searchText}
              onChange={handleChangeSearchText}
            />
            <Button
              className="font-serif font-bold text-md"
              onClick = {()=>{}}
            >
              <FaSearch/>
            </Button>
        </div>

        
        <div className="w-1/4 h-full flex flex-row">
          {/* avatar or login button */}
            {(user)?
              <Sidebar user={user}/>
            :
            <div className='w-full h-full flex flex-row items-center justify-center gap-x-2 p-2 '>
              <Link to="/login">
              <Button className="hover:ring-2 hover:ring-gray-200 bg-slate-200 text-md font-bold" variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
              <Button className="hover:ring-2 hover:ring-orange-300 text-md font-bold">Getting Started</Button>
              </Link>
            </div>
            }
        </div>
      </div>
    </div>
  )
}

export default Header