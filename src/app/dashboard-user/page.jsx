'use client'
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import NewShifts from '@/components/user/newShifts'
import axios from 'axios'

const DashboardUser = () => {

  const [obrasSociales, setObrasSociales] = useState([]);

  const { data: session, status } = useSession()

  const consumirApiObraSocial = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/obraSocial`)
      setObrasSociales(data || [])
    } catch (error) {
      console.error('Error obteniendo obraSocial', error)
      setObrasSociales([])
    }
  }

  useEffect(() => {
    consumirApiObraSocial();
  }, [])

  return (
    <div>
      <div className='p-4'>
        <div className=' mb-4'>
          <h1 className='text-2xl font-semibold'>Dashboard User</h1>
        </div>

        <div>
          <NewShifts 
            obrasSociales={obrasSociales}
          />
        </div>
      </div>

      <div>
        <pre>{JSON.stringify({ session }, null, 2)}</pre>
      </div>
    </div>
  )
}

export default DashboardUser