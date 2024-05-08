'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, Button, User } from "@nextui-org/react";
import ModalAddMedico from '@/components/professional/ModalAddMedico';
import CardProfessional from '@/components/professional/CardProfessional';
import axios from 'axios';
import SearchProfessional from '@/components/professional/searchProfessional';
import PaginatorProfessional from '@/components/professional/PaginatorProfessional';
import ModalAddObraSocial from '@/components/obraSocial/ModalAddObraSocial';
import ListObrasSociales from '@/components/obraSocial/ListObrasSociales';
import ModalAddEspecialidad from '@/components/especialidad/ModalAddEspecialidad';
import ListEspecialidad from '@/components/especialidad/ListEspecialidad';

const DashboardAdmin = () => {

  const [professionals, setProfessionals] = useState([]);
  const [obrasSociales, setObrasSociales] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [viewType, setViewType] = useState('card')

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

  const consumirApiObraSocial = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/obraSocial`)
      setObrasSociales(data || [])
    } catch (error) {
      console.error('Error obteniendo obraSocial', error)
      setObrasSociales([])
    }
  }

  const consumirApiEspecialidad = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/especialidad`)
      setEspecialidades(data || [])
    } catch (error) {
      console.error('Error obteniendo especialidad', error)
      setEspecialidades([])
    }
  }

  useEffect(() => {
    consumirApi();
    consumirApiObraSocial();
    consumirApiEspecialidad();  
  }, [])

  const scroll = useRef(null)

  const changeType = (type) => {
    setViewType(type)
  }


  return (
    <div className='p-4'>
      <div ref={scroll} className=' mb-4'>
        <h1 className='text-2xl font-semibold'>Dashboard Admin</h1>
      </div>

      <div className='mb-6'>
        <SearchProfessional
          setProfessionals={setProfessionals}
          changeType={changeType}
          viewType={viewType}
        />
      </div>

      <div className="">
        <div className='mb-6 flex items-center gap-6'>
          <p className='text-xl font-semibold '>Professionals</p>
          <ModalAddMedico
            consumirApi={consumirApi}
            obrasSociales={obrasSociales}
            especialidades={especialidades}
          />
        </div>
        <div className={`grid gap-3 mb-6 duration-500 ${viewType === 'list' ? 'grid-cols-1' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
          {professionals.length > 0 ?
            professionals.map(prof => (
              <CardProfessional
                key={prof._id}
                prof={prof}
                viewType={viewType}
                setProfessionals={setProfessionals}
              />
            ))
            :
            <p className="col-span-full text-center">No hay artículos disponibles.</p>
          }
        </div>

        <div className='mb-6'>
          <div className=' mb-6 flex items-center gap-6'>
            <p className='text-xl font-semibold'>Obra sociales</p>
            <ModalAddObraSocial 
              consumirApiObraSocial={consumirApiObraSocial}
            />
          </div>

          <ListObrasSociales
            obrasSociales={obrasSociales}
          />
        </div>

        <div className='mb-6'>
          <div className=' mb-6 flex items-center gap-6'>
            <p className='text-xl font-semibold'>Especialidades</p>
            <ModalAddEspecialidad
              consumirApiEspecialidad={consumirApiEspecialidad}
            />
          </div>

          <ListEspecialidad
            especialidades={especialidades}
          />
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