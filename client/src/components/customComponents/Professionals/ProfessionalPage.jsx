import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getProfessionals } from '../../../../utils/professional.utils'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { MdOutlinePersonOff } from "react-icons/md";


function ProfessionalPage() {
    const location = useLocation();
    const field = location.state || -1;
    const [professionals, setProfessionals] = useState(null);
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchProfessional = async () => {
        const res = await getProfessionals(page, limit, field);
        if(res.data.length === 0)setProfessionals(prev=>null)
        else setProfessionals(prev => res.data);
    }

    useEffect(() => {
        console.log(page)
        fetchProfessional()
    }, [page])

    return (
        <div className='w-screen h-fit'>
        <div>
            {/* professionals list */}

            {
                !professionals && <div className='w-full h-84 flex flex-col items-center mt-2'>
                    <h3 className='text-4xl font-serif font-bold'>Sorry! No more professionals are available</h3>
                    <MdOutlinePersonOff className='text-[250px] text-rose-dark'/>
                </div>
            }
        </div>
        <div className='w-full'>
            {/* pagination */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious  onClick={()=>{setPage(prev=>{
                            if(prev===1)return 1;
                            else return prev-1;
                        })}} className='text-xl font-serif font-bold text-rose-dark hover:bg-rose-dark hover:text-white' icon="w-8 h-8"/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis  icon='h-8 w-8' className='font-serif text-rose-dark'/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={()=>{
                        if(!professionals)return;
                        setPage(prev=>{
                            return prev+1;
                        })}} className='text-xl font-serif font-bold text-rose-dark hover:bg-rose-dark hover:text-white' icon="w-8 h-8"/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            </div>

        </div>
    )
}

export default ProfessionalPage