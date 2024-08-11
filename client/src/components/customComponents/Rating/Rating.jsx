import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

import React from 'react'

function Rating({rating,cssprop}) {
    const arr = [0,0,0,0,0]
    arr.fill(1,0,rating);
  return (
    <div className={"flex flex-row text-yellow-300 " + cssprop}>
        {arr.map((i,index)=>
            {
                return (
                    (i==1)? 
                    <FaStar key={index}/>
                    :
                    <CiStar key={index}/>
                ) 

            }
        )}
    </div>
  )
}

export default Rating