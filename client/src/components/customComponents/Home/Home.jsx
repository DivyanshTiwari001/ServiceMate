import UserContext from '@/context/userContext/UserContext';
import React, { useContext, useEffect,useCallback, useState } from 'react'
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Rating from '../Rating/Rating';
import { useNavigate } from 'react-router-dom';
import ClientHome from './ClientHome';
import ProfessionalHome from './ProfessionalHome';


function Home() {
  const {user} = useContext(UserContext)

  return (
    <div className="w-screen mt-4 box-border flex flex-col">
        {
          (!user || !user.isprof) && <ClientHome/>
        }
        {
          (user  && user.isprof) && <ProfessionalHome/>
        }
    </div>
  )
}

export default Home