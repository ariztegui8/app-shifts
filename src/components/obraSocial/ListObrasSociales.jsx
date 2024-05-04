'use client'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

const ListObrasSociales = () => {

    const [obrasSociales, setObrasSociales] = useState([]);

    const consumirApi = async (page = 1) => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/obraSocial`)
            setObrasSociales(data || [])
            console.log('data', data);
        } catch (error) {
            console.error('Error obteniendo obraSocial', error)
            setObrasSociales([])
        }
    }

    useEffect(() => {
        consumirApi();
    }, [])

    return (
        <div>
            {obrasSociales.length > 0 ?
                obrasSociales.map(os => (
                   <div key={os._id}>
                    <p>{os.nombre}</p>
                   </div>
                ))
                :
                <p className="col-span-full text-center">No hay artículos disponibles.</p>
            }
        </div>
    )
}

export default ListObrasSociales