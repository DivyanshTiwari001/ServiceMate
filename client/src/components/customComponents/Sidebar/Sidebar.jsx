import React, { useEffect } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

  
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logoutClient } from "../../../../utils/client.utils";
import { useNavigate } from "react-router-dom";

function Sidebar({ user ,setUser}) {
    const navigate = useNavigate()
    const handleLogout = async()=>{
        if(!user.isProf)await logoutClient()
        setUser(prev=>null)
        navigate("/")
    }
    return (
        <div className="w-full h-full flex flex-row">
        <Sheet>
            <SheetTrigger className="w-full flex flex-row">
                <div className='w-full h-full flex flex-row items-center gap-x-2 justify-center'>
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={user?.profilePhoto || "https://github.com/shadcn.png" } className="" />
                        <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p className="font-bold text-lg font-serif">Hello, {user?.username || "master!"}</p>
                </div>
            </SheetTrigger>
            <SheetContent className="p-0">
                {/* userinfo */}
                <div className="flex flex-row w-full h-fit border-y-2 shadow-sm cursor-pointer">
                    <div className="w-1/3 p-1 flex flex-row justify-center">
                        <img src={user?.profilePhoto || "https://github.com/shadcn.png"} alt="profile photo" className="w-24 h-24 rounded-full" />
                    </div>
                    <div className="w-2/3 font-serif flex flex-col justify-center pl-3" >
                        <ul>
                            <li className="text-3xl font-bold">
                                {user?.username || "master"}
                            </li>
                            <li>
                                {user?.email || "master@gmail.com"}
                            </li>
                            <li>
                                {user?.phone || "9999999999"}
                            </li>
                            <HoverCard>
                            <HoverCardTrigger>
                            <li>
                                {(user?.address || "4 Privet Drive, Little Whinging, Surrey, England").slice(0,30) + (((user?.address || "4 Privet Drive, Little Whinging, Surrey, England")?.length > 30)?" ..." : "")}
                            </li>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <li>{user?.address || "4 Privet Drive, Little Whinging, Surrey, England"}</li>
                            </HoverCardContent>
                            </HoverCard>
                        </ul>
                    </div>
                </div>
                {/* User Links */}
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full font-serif text-xl pl-3 hover:bg-rose-400 hover:text-white cursor-pointer" onClick={handleLogout}>Logout</div>
                </div>
            </SheetContent>
        </Sheet>
        </div>

    )
}

export default Sidebar
