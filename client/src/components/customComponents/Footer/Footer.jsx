import React from 'react'
import { Link } from "react-router-dom"
import { MdOutlineMail } from "react-icons/md";

function Footer() {
  return (
    <div className='w-screen mt-6 h-96 border-t-2 shadow-inner flex flex-col items-center'>
      <div className='w-3/4 h-64 border-b-2 mt-4 shadow-sm flex flex-row justify-between'>
        <div className='w-1/4 h-64 flex flex-row justify-center items-center'>
          <Link to='/'>
            <img src="./resources/logo.png" alt="" className='h-24' />
          </Link>
        </div>
        <div className='w-1/2 flex flex-row font-serif'>
          <ul className='w-1/2 flex flex-col gap-y-5'>
            <li className='w-full text-start font-bold text-2xl cursor-pointer'>
              Contact Us
            </li>
            <li className='w-full flex flex-row justify-start items-center 
                  font-bold text-xl gap-x-2 text-slate-600 cursor-pointer'>
              <img src='./resources/gmail.png' alt="" className='w-10 ' />
              <div className=''>
                Email
              </div>
            </li>
            <li className='w-full flex flex-row justify-start items-center 
                  font-bold text-xl gap-x-1 text-slate-600 cursor-pointer'>
              <img src='./resources/instagram.png' alt="" className='w-10 ' />
              <div className=''>
                Instagram
              </div>
            </li>
            <li className='w-full flex flex-row justify-start items-center 
                  font-bold text-xl gap-x-1 text-slate-600 cursor-pointer'>
              <img src='./resources/linkedin.png' alt="" className='w-10 ' />
              <div className=''>
                LinkedIn
              </div>
            </li>

          </ul>
          <ul className='w-1/2 flex flex-col gap-y-3'>
            <li className='w-full text-start font-bold text-2xl cursor-pointer'>
              Legal
            </li>
            <li className='w-full flex flex-row justify-start items-center 
                  font-bold text-xl gap-x-2 text-slate-600 cursor-pointer'>
              <div className=''>
                Privacy Polciy
              </div>
            </li>
            <li className='w-full flex flex-row justify-start items-center 
                  font-bold text-xl gap-x-1 text-slate-600 cursor-pointer'>
              <div className=''>
                Terms & Conditions
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-row justify-between w-3/4 mt-4 font-serif">
          <div className="text-md text-gray-500 sm:text-center">
            © 2024
            servicemate
            . All Rights Reserved.
          </div>
          <div className='flex flex-row justify-center gap-x-3'>
            <img src="./resources/github.png" alt="" className="w-8 cursor-pointer"/>
            <img src="./resources/facebook.png" alt="" className="w-8 cursor-pointer"/>
            <img src="./resources/twitter.png" alt="" className="w-8 cursor-pointer"/>
            <img src="./resources/discord.png" alt="" className="w-8 cursor-pointer"/>
          </div>
      </div>
    </div>
  )
}

export default Footer