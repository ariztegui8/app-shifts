'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, Button, User } from "@nextui-org/react";
import ModalAddMedico from '@/components/professional/ModalAddMedico';
import CardProfessional from '@/components/professional/CardProfessional';
import axios from 'axios';
import SearchProfessional from '@/components/professional/searchProfessional';
import PaginatorProfessional from '@/components/professional/PaginatorProfessional';

const DashboardAdmin = () => {

  const [professionals, setProfessionals] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [viewType , setViewType] = useState('card')

  const { data: session, status } = useSession()


  const consumirApi = async (page = 1) => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/professional?page=${page}&limit=12`)
      setProfessionals(data.professional || [])
      setTotalPages(data.totalPages)
      setPage(data.page)
    } catch (error) {
      console.error('Error obteniendo professionals', error)
      setProfessionals([])
    }
  }

  useEffect(() => {
    consumirApi();
  }, [])

  const scroll = useRef(null)

  const changeType = (type) => {
    setViewType(type)
}


  return (
    <div className='p-4'>
      <div ref={scroll} className='flex justify-between gap-2 items-center mb-4'>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>

        <ModalAddMedico
          consumirApi={consumirApi}
        />
      </div>

      <div className='mb-6'>
        <SearchProfessional
          setProfessionals={setProfessionals}
          changeType={changeType}
          viewType={viewType}
        />
      </div>

      <div className="">
        <div className={`grid gap-3 mb-6 duration-500 ${viewType === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4'}`}>
          {professionals.length > 0 ?
            professionals.map(prof => (
              <CardProfessional
                key={prof._id}
                prof={prof}
                viewType={viewType}
              />
            ))
            :
            <p className="col-span-full text-center">No hay artículos disponibles.</p>
          }
        </div>
        {professionals.length > 0 ?
          <PaginatorProfessional
            page={page}
            totalPages={totalPages}
            consumirApi={consumirApi}
            scroll={scroll}
          />
          : null
        }
      </div>

      <div>
        <pre>{JSON.stringify({ session }, null, 2)}</pre>
      </div>
    </div>
  )
}

export default DashboardAdmin